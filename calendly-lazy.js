(function() {
  var URL = 'https://calendly.com/reprimecoaching/100tage';
  var loading = false;
  var queue = [];

  window.openCalendly = function(e) {
    if (e && e.preventDefault) e.preventDefault();

    if (window.Calendly) {
      window.Calendly.initPopupWidget({url: URL});
      return;
    }

    queue.push(function() { window.Calendly.initPopupWidget({url: URL}); });
    if (loading) return;
    loading = true;

    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://assets.calendly.com/assets/external/widget.css';
    document.head.appendChild(link);

    var script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.onload = function() {
      queue.forEach(function(fn) { fn(); });
      queue = [];
    };
    document.head.appendChild(script);
  };
})();
