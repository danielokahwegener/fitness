/**
 * RePrime API Worker
 * Proxies MailerLite calls server-side so the API key is never exposed.
 * Uses KV to store short-lived session tokens for the Platz-sichern flow.
 *
 * Endpoints:
 *   POST /api/bewerbung       — merged application + diagnostic form from bewerbung.html
 *   POST /api/subscribe       — email capture from results.html
 *   POST /api/platz-sichern   — "Ich bin startklar" from anmeldung.html
 *   POST /api/booking-stop    — Calendly redirect from bestaetigung.html
 *
 * Secrets required:
 *   MAILERLITE_API_KEY        — wrangler secret put MAILERLITE_API_KEY
 *   BEWERBUNG_GROUP_ID        — wrangler secret put BEWERBUNG_GROUP_ID
 *   PLATZ_GESICHERT_GROUP_ID  — wrangler secret put PLATZ_GESICHERT_GROUP_ID
 *   GEBUCHT_GROUP_ID          — wrangler secret put GEBUCHT_GROUP_ID
 *   SLACK_WEBHOOK_URL         — wrangler secret put SLACK_WEBHOOK_URL
 *                               (optional — Slack notification on new Bewerbung;
 *                                create at api.slack.com/apps → Incoming Webhooks)
 */

const ML_API = 'https://connect.mailerlite.com/api/subscribers';
const TOKEN_TTL_SECONDS = 3600; // token expires after 1 hour

const ML_GROUPS = {
  V: '186277911229105388',
  T: '186277929446016594',
  R: '186277945189336521',
  M: '186277961974940789',
  L: '186277978308609039'
};

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

function respond(data, status) {
  return new Response(JSON.stringify(data), {
    status: status || 200,
    headers: { ...CORS, 'Content-Type': 'application/json' }
  });
}

async function mlPost(apiKey, payload) {
  const res = await fetch(ML_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + apiKey
    },
    body: JSON.stringify(payload)
  });
  if (res.status !== 200 && res.status !== 201) {
    const text = await res.text();
    throw new Error('MailerLite ' + res.status + ': ' + text);
  }
  return res.json();
}

/* ---- Slack notification (best-effort, never blocks the response) ----- */
async function notifySlackBewerbung(env, b) {
  if (!env.SLACK_WEBHOOK_URL) return;

  const text =
    `*Neue Bewerbung: ${b.name}*\n` +
    `${b.email} · ${b.telefon || '–'} · ${b.alter || '–'} Jahre · ${b.beruf || '–'}\n` +
    `*Sport:* ${b.sport || '–'} (Niveau: ${b.niveau || '–'}, aktiv bis ${b.aktiv_bis || '–'})\n` +
    `*Ziel (90 Tage):* ${b.ziel_90_tage || '–'}\n` +
    `*Investitionsbereitschaft:* ${b.investition || '–'}\n` +
    `*Dringlichkeit:* ${b.dringlichkeit || '–'}`;

  try {
    await fetch(env.SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
  } catch (err) {
    console.error('Slack notification failed', err);
  }
}

/* ---- /api/bewerbung -------------------------------------------------- */
async function handleBewerbung(body, env) {
  const { name, email } = body || {};
  if (!name || !email) {
    return respond({ error: 'Missing required fields' }, 400);
  }

  const b = body || {};
  const fields = {
    name,
    /* Contact */
    telefon:                 b.telefon                 || '',
    alter_gruppe:            b.alter                   || '',
    beruf:                   b.beruf                   || '',
    /* Athletic identity */
    frag_sport:              b.sport                   || '',
    frag_aktiv_bis:          b.aktiv_bis               || '',
    frag_niveau:             b.niveau                  || '',
    frag_vermisst:           b.vermisst                || '',
    /* Current performance */
    frag_gewicht_aktuell:    b.gewicht_aktuell         || '',
    frag_gewicht_ziel:       b.gewicht_ziel            || '',
    frag_training_frequenz:  b.training_frequenz       || '',
    frag_energie_level:      b.energie_level           || '',
    frag_verletzungen:       b.verletzungen            || '',
    /* Nutrition */
    frag_ernaehrung:         b.ernaehrung_beschreibung || '',
    frag_auswaerts:          b.auswaerts_frequenz      || '',
    frag_alkohol:            b.alkohol                 || '',
    frag_ernaehrung_versuche: b.ernaehrung_versuche   || '',
    /* Recovery */
    frag_schlaf_stunden:     b.schlaf_stunden          || '',
    frag_schlaf_qualitaet:   b.schlaf_qualitaet        || '',
    frag_wearable:           b.wearable                || '',
    frag_stress_level:       b.stress_level            || '',
    /* Daily life */
    frag_alltag:             b.alltag                  || '',
    frag_reise_frequenz:     b.reise_frequenz          || '',
    frag_training_stunden:   b.training_stunden        || '',
    frag_training_zeit:      b.training_zeit           || '',
    /* Goals */
    frag_ziel_90_tage:       b.ziel_90_tage            || '',
    frag_lebensbereich:      b.lebensbereich           || '',
    frag_ereignisse:         b.ereignisse              || '',
    investition:             b.investition             || '',
    dringlichkeit:           b.dringlichkeit           || ''
  };

  try {
    await mlPost(env.MAILERLITE_API_KEY, {
      email,
      fields,
      groups: env.BEWERBUNG_GROUP_ID ? [env.BEWERBUNG_GROUP_ID] : [],
      status: 'active'
    });
  } catch {
    /* Custom fields not yet created in MailerLite — retry with name only */
    await mlPost(env.MAILERLITE_API_KEY, {
      email,
      fields: { name },
      groups: env.BEWERBUNG_GROUP_ID ? [env.BEWERBUNG_GROUP_ID] : [],
      status: 'active'
    });
  }

  await notifySlackBewerbung(env, b);

  return respond({ success: true });
}

/* ---- /api/subscribe -------------------------------------------------- */
async function handleSubscribe(body, env) {
  const { vorname, email, archetypKey, profil } = body || {};
  if (!vorname || !email || !archetypKey) {
    return respond({ error: 'Missing required fields' }, 400);
  }

  const p = profil || {};
  const groupId = ML_GROUPS[archetypKey];

  /* Try with custom profile fields first; fall back to name-only if fields don't exist yet in MailerLite */
  try {
    await mlPost(env.MAILERLITE_API_KEY, {
      email,
      fields: {
        name: vorname,
        sport: p.sport || '',
        niveau: p.niveau || '',
        letzte_saison: p.letzte_saison || '',
        alter_gruppe: p.alter || '',
        gewicht_plus: p.gewicht_plus || ''
      },
      groups: groupId ? [groupId] : [],
      status: 'active'
    });
  } catch {
    /* Custom fields not yet created in MailerLite — retry with name only */
    await mlPost(env.MAILERLITE_API_KEY, {
      email,
      fields: { name: vorname },
      groups: groupId ? [groupId] : [],
      status: 'active'
    });
  }

  /* Store email against a short-lived token for the platz-sichern step */
  const token = crypto.randomUUID();
  await env.SESSIONS.put(token, email, { expirationTtl: TOKEN_TTL_SECONDS });

  return respond({ token });
}

/* ---- /api/platz-sichern ---------------------------------------------- */
async function handlePlatzSichern(body, env) {
  const { token } = body || {};
  if (!token) return respond({ error: 'Missing token' }, 400);

  const email = await env.SESSIONS.get(token);
  if (!email) return respond({ error: 'Token expired or not found' }, 404);

  /* Add to "Platz gesichert" group if configured */
  if (env.PLATZ_GESICHERT_GROUP_ID) {
    await mlPost(env.MAILERLITE_API_KEY, {
      email,
      groups: [env.PLATZ_GESICHERT_GROUP_ID],
      status: 'active'
    });
  }

  /* One-time use — delete token immediately */
  await env.SESSIONS.delete(token);

  return respond({ success: true });
}

/* ---- /api/booking-stop ----------------------------------------------- */
async function handleBookingStop(body, env) {
  const { email } = body || {};
  if (!email) return respond({ error: 'Missing email' }, 400);

  if (!env.GEBUCHT_GROUP_ID) return respond({ success: true }); // not configured yet

  await mlPost(env.MAILERLITE_API_KEY, {
    email,
    groups: [env.GEBUCHT_GROUP_ID],
    status: 'active'
  });

  return respond({ success: true });
}

/* ---- Main handler ---------------------------------------------------- */
export default {
  async fetch(request, env) {
    /* Preflight */
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405, headers: CORS });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return respond({ error: 'Invalid JSON body' }, 400);
    }

    const path = new URL(request.url).pathname;

    try {
      if (path === '/api/bewerbung')      return handleBewerbung(body, env);
      if (path === '/api/subscribe')     return handleSubscribe(body, env);
      if (path === '/api/platz-sichern') return handlePlatzSichern(body, env);
      if (path === '/api/booking-stop')  return handleBookingStop(body, env);
      return new Response('Not found', { status: 404, headers: CORS });
    } catch (err) {
      console.error(err);
      return respond({ error: 'Internal error' }, 500);
    }
  }
};
