/* [NAME] Training — vanilla component bundle. Assigns window.Trainer. No dependencies, no network. */
(function () {
  "use strict";

  /* ---------------- icons: 24px grid, 1.5px square-cap line ---------------- */
  var ICONS = {
    pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    phone: '<path d="M5 3.5h3.2l1.6 4.2-2 1.3a11 11 0 0 0 7.2 7.2l1.3-2 4.2 1.6V19a1.5 1.5 0 0 1-1.5 1.5A16.5 16.5 0 0 1 3.5 5 1.5 1.5 0 0 1 5 3.5z"/>',
    chat: '<path d="M4 4.5h16v11H10l-6 4.5v-15.5z"/><path d="M8 9h8M8 12h5"/>',
    mail: '<rect x="3" y="5.5" width="18" height="13"/><path d="M3 6.5l9 6.5 9-6.5"/>',
    camera: '<rect x="3" y="7" width="18" height="13"/><path d="M8.5 7l1.5-2.5h4L15.5 7"/><circle cx="12" cy="13.5" r="3.5"/>',
    menu: '<path d="M3 7h18M3 12h18M3 17h18"/>',
    close: '<path d="M5 5l14 14M19 5L5 19"/>',
    chevL: '<path d="M15 3l-9 9 9 9"/>',
    chevR: '<path d="M9 3l9 9-9 9"/>',
    chevD: '<path d="M5 9l7 7 7-7"/>',
    arrow: '<path d="M4 12h15M13 6l6 6-6 6"/>'
  };
  function icon(name, size, stroke) {
    size = size || 24;
    return '<svg class="pt-icon" width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' + (stroke || 1.5) +
      '" stroke-linecap="square" stroke-linejoin="miter" aria-hidden="true">' + (ICONS[name] || "") + "</svg>";
  }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function ph(variant, caption, extra) {
    return '<div class="pt-ph' + (variant ? " pt-ph--" + variant : "") + (extra ? " " + extra : "") + '" role="img" aria-label="' + esc(caption) + '"><span class="pt-ph__cap">Photo · ' + esc(caption) + "</span></div>";
  }

  /* ---------------- sample content: edit here ---------------- */
  var SAMPLE = {
    brand: {
      name: "[NAME]", city: "[CITY]",
      phone: "[000 000 0000]", whatsapp: "[000 000 0000]", email: "hello@[domain].com", instagram: "@[handle]",
      bookUrl: "#contact"
    },
    // tone: "solid" | "outline" | "tint" — the only way gyms are told apart. Max three gyms.
    gyms: [
      { id: "a", name: "[GYM A]", neighborhood: "[Neighborhood A]", address: "[Street address], [CITY]", tone: "solid", directionsUrl: "#", bookUrl: "#" },
      { id: "b", name: "[GYM B]", neighborhood: "[Neighborhood B]", address: "[Street address], [CITY]", tone: "outline", directionsUrl: "#", bookUrl: "#" },
      { id: "c", name: "[GYM C]", neighborhood: "[Neighborhood C]", address: "[Street address], [CITY]", tone: "tint", directionsUrl: "#", bookUrl: "#" }
    ],
    // day: mon..sun · type: "1-1" | "Group" · full: true marks Fully booked
    slots: [
      { day: "mon", start: "06:00", end: "07:00", gym: "a", type: "1-1" },
      { day: "mon", start: "12:15", end: "13:00", gym: "b", type: "Group" },
      { day: "mon", start: "18:00", end: "19:00", gym: "a", type: "Group" },
      { day: "tue", start: "07:00", end: "08:00", gym: "c", type: "1-1", full: true },
      { day: "tue", start: "17:30", end: "18:30", gym: "b", type: "1-1" },
      { day: "wed", start: "06:00", end: "07:00", gym: "a", type: "1-1" },
      { day: "wed", start: "18:00", end: "19:00", gym: "c", type: "Group" },
      { day: "thu", start: "07:00", end: "08:00", gym: "b", type: "1-1" },
      { day: "thu", start: "12:15", end: "13:00", gym: "a", type: "Group", full: true },
      { day: "fri", start: "06:00", end: "07:00", gym: "c", type: "1-1" },
      { day: "sat", start: "09:00", end: "10:00", gym: "b", type: "Group" },
      { day: "sat", start: "10:30", end: "11:30", gym: "a", type: "Group" }
    ],
    // Placeholders: replace with real, attributed client testimonials before launch.
    testimonials: [
      { quote: "[Client testimonial.] No noise, no fads. Just a plan that fit my week, and someone who noticed every rep.", name: "[CLIENT NAME]", detail: "1-1 client" },
      { quote: "[Client testimonial.] I came for the deadlift. I stayed because the group became the best hour of my week.", name: "[CLIENT NAME]", detail: "Small group" },
      { quote: "[Client testimonial.] Patient, precise, and honest about what actually works.", name: "[CLIENT NAME]", detail: "1-1 client" }
    ]
  };

  var DAYS = [["mon", "Mon", "Monday"], ["tue", "Tue", "Tuesday"], ["wed", "Wed", "Wednesday"], ["thu", "Thu", "Thursday"], ["fri", "Fri", "Friday"], ["sat", "Sat", "Saturday"], ["sun", "Sun", "Sunday"]];
  function todayKey(data) { return (data && data.today) || DAYS[(new Date().getDay() + 6) % 7][0]; }
  function gymById(data, id) { for (var i = 0; i < data.gyms.length; i++) if (data.gyms[i].id === id) return data.gyms[i]; return null; }
  function d(data) { return data || SAMPLE; }

  /* ---------------- sections (HTML strings) ---------------- */
  function nav(data) {
    var b = d(data).brand;
    var links = [["#schedule", "Schedule"], ["#approach", "Approach"], ["#about", "About"], ["#contact", "Contact"]];
    var li = links.map(function (l) { return '<li><a href="' + l[0] + '">' + l[1] + "</a></li>"; }).join("");
    var cta = '<li><a class="pt-btn pt-btn--light pt-btn--sm" href="' + esc(b.bookUrl) + '">Book</a></li>';
    return '<header class="pt-nav" data-pt="nav"><div class="pt-container"><div class="pt-nav__bar">' +
      '<a class="pt-wordmark" href="#top">' + esc(b.name) + "</a>" +
      '<ul class="pt-nav__links">' + li + cta + "</ul>" +
      '<button class="pt-nav__toggle" type="button" aria-expanded="false" aria-label="Open menu">' + icon("menu") + "</button>" +
      '</div></div><nav class="pt-nav__panel" aria-label="Mobile"><div class="pt-container"><ul>' + li + cta + "</ul></div></nav></header>";
  }

  function hero(data) {
    var b = d(data).brand;
    return '<section id="top" class="pt-hero pt-photo pt-ph">' +
      '<div class="pt-container pt-reveal"><span class="pt-eyebrow">Personal training · ' + esc(b.city) + "</span>" +
      '<h1 class="pt-h1">Back to basics.</h1>' +
      '<p class="pt-em">Your body. Your goals. Your lifestyle.</p>' +
      '<a class="pt-btn pt-btn--light" href="' + esc(b.bookUrl) + '">Start today</a></div>' +
      '<span class="pt-ph__cap">Photo · Action shot, gym floor</span></section>';
  }

  function ticker(data) {
    return '<div class="pt-ticker"><div class="pt-container pt-ticker__row">' + icon("pin", 14) +
      '<span class="pt-label">Personal training across ' + esc(d(data).brand.city) + "</span></div></div>";
  }

  function slot(data, s, compact) {
    var g = gymById(data, s.gym) || { name: s.gym, tone: "outline", bookUrl: "#" };
    var cls = "pt-slot pt-slot--" + g.tone + (s.full ? " pt-slot--full" : "");
    var type = (s.type === "1-1" ? "1-1" : "Group") + (s.full ? " · Fully booked" : "");
    var inner = '<span class="pt-slot__time">' + esc(s.start) + "–" + esc(s.end) + "</span>" +
      '<span class="pt-slot__gym">' + esc(g.name) + "</span>" +
      '<span class="pt-slot__type pt-label-s">' + esc(type) + "</span>";
    if (s.full) return '<div class="' + cls + '" aria-label="' + esc(s.start + " " + g.name + " " + type) + '">' + inner + "</div>";
    return '<a class="' + cls + '" href="' + esc(g.bookUrl) + '" aria-label="Book ' + esc(s.type + " at " + g.name + ", " + s.start + "–" + s.end) + '">' + inner +
      '<span class="pt-slot__go">' + icon("arrow", 14) + "</span></a>";
  }

  function scheduleInner(data, filter) {
    var t = todayKey(data);
    var visible = data.slots.filter(function (s) { return filter === "all" || s.gym === filter; });
    var fGym = filter === "all" ? null : gymById(data, filter);
    function forDay(k) { return visible.filter(function (s) { return s.day === k; }).sort(function (a, b) { return a.start < b.start ? -1 : 1; }); }
    function offText(k) {
      var anyAtAll = data.slots.some(function (s) { return s.day === k; });
      return !anyAtAll || !fGym ? "Not training today." : "Not at " + fGym.name + " today.";
    }

    var tabs = '<div class="pt-tabs" role="group" aria-label="Filter by location">' +
      [["all", "All"]].concat(data.gyms.map(function (g) { return [g.id, g.name]; })).map(function (o) {
        return '<button type="button" class="pt-tab" data-filter="' + esc(o[0]) + '" aria-pressed="' + (o[0] === filter) + '">' + esc(o[1]) + "</button>";
      }).join("") + "</div>";

    var week = '<div class="pt-week">' + DAYS.map(function (day) {
      var list = forDay(day[0]);
      var isT = day[0] === t;
      return '<div class="pt-day' + (isT ? " pt-day--today" : "") + '"><div class="pt-day__head"><span class="pt-label">' + day[1] + "</span>" +
        (isT ? '<span class="pt-today pt-label-s">Today</span>' : "") + "</div>" +
        (list.length ? list.map(function (s) { return slot(data, s); }).join("") : '<div class="pt-off">' + esc(offText(day[0])) + "</div>") + "</div>";
    }).join("") + "</div>";

    var daylist = '<div class="pt-daylist">' + DAYS.map(function (day) {
      var list = forDay(day[0]);
      var isT = day[0] === t;
      var meta = list.length ? list.length + (list.length === 1 ? " session" : " sessions") : "Rest day";
      return '<details class="pt-dayrow"' + (isT ? " open" : "") + "><summary>" +
        '<span class="pt-label">' + day[2] + "</span>" +
        '<span class="pt-dayrow__meta">' + (isT ? '<span class="pt-today pt-label-s">Today</span>' : "") + '<span class="pt-label-s">' + meta + "</span>" + icon("chevD", 16) + "</span></summary>" +
        '<div class="pt-dayrow__body">' + (list.length ? list.map(function (s) { return slot(data, s); }).join("") : '<div class="pt-off">' + esc(offText(day[0])) + "</div>") + "</div></details>";
    }).join("") + "</div>";

    var legend = '<div class="pt-legend pt-label-s">' + data.gyms.map(function (g) {
      return '<span class="pt-legend__item"><span class="pt-swatch pt-swatch--' + g.tone + '"></span>' + esc(g.name) + "</span>";
    }).join("") + '<span class="pt-legend__item"><span class="pt-swatch pt-swatch--full"></span>Fully booked</span></div>';

    var gyms = data.gyms.filter(function (g) { return filter === "all" || g.id === filter; });
    var variants = ["", "b", "c"];
    var locs = '<div class="pt-locs">' + gyms.map(function (g) { return locationCard(g, variants[data.gyms.indexOf(g) % 3]); }).join("") + "</div>";

    return { tabs: tabs, body: week + daylist + legend + locs };
  }

  function locationCard(g, variant) {
    return '<article class="pt-loc">' + ph(variant, g.name + " exterior") +
      '<div class="pt-loc__body"><span class="pt-loc__hood pt-label-s"><span class="pt-swatch pt-swatch--' + esc(g.tone) + '"></span>' + esc(g.neighborhood) + "</span>" +
      '<h3 class="pt-h3">' + esc(g.name) + "</h3>" +
      '<p class="pt-text-s pt-muted">' + esc(g.address) + "</p>" +
      '<div class="pt-loc__actions"><a class="pt-link" href="' + esc(g.directionsUrl) + '">Get directions ' + icon("arrow", 12, 2) + "</a>" +
      '<a class="pt-btn pt-btn--dark pt-btn--sm" href="' + esc(g.bookUrl) + '">Book here</a></div></div></article>';
  }

  function scheduleShell() {
    return '<section id="schedule" class="pt-section pt-bg-paper" data-pt="schedule"><div class="pt-container">' +
      '<div class="pt-sched__top pt-reveal"><div class="pt-head"><span class="pt-eyebrow">Schedule</span><h2 class="pt-h2">Where to find me.</h2>' +
      '<p class="pt-em">Book a session at the location closest to you.</p></div><div data-pt-tabs></div></div>' +
      '<div class="pt-reveal" data-pt-body></div></div></section>';
  }

  function statement(data) {
    return '<section id="approach" class="pt-section pt-bg-off"><div class="pt-container pt-statement__grid">' +
      '<h2 class="pt-h1 pt-reveal">Strong is built, not bought.</h2>' +
      '<div class="pt-statement__body pt-reveal"><p class="pt-lead">No gimmicks. No twelve-week miracles. Just the fundamentals — squat, hinge, push, pull, carry — coached properly and progressed patiently.</p>' +
      "<p>I train people one-to-one and in groups of up to six, so every rep gets seen and every plan fits the life you actually have.</p>" +
      '<p class="pt-em">Show up. Do the work. Go home stronger.</p>' +
      '<a class="pt-btn pt-btn--dark" href="' + esc(d(data).brand.bookUrl) + '">Book a free consult</a></div></div></section>';
  }

  function band(data) {
    return '<section class="pt-band pt-photo pt-ph pt-ph--b"><div class="pt-container pt-band__row pt-reveal">' +
      '<div><h2>Small groups. Full attention.</h2><p class="pt-em">Six people, one coach, no one hiding at the back.</p></div>' +
      '<a class="pt-btn pt-btn--light" href="#schedule">See group sessions</a></div>' +
      '<span class="pt-ph__cap">Photo · Small group session</span></section>';
  }

  function contact(data) {
    var b = d(data).brand;
    var cards = [
      ["phone", "Text or call.", "Quickest way to reach me. " + b.phone, "Call now", "tel:"],
      ["chat", "WhatsApp.", "Message any time, I reply between sessions.", "Message", "#"],
      ["mail", "Email.", "For longer questions or corporate groups.", "Write", "mailto:" + b.email],
      ["camera", "Instagram.", "Training clips and form tips. " + b.instagram, "Follow", "#"]
    ];
    return '<section id="contact" class="pt-section pt-bg-off"><div class="pt-container">' +
      '<div class="pt-head pt-reveal"><span class="pt-eyebrow">Contact</span><h2 class="pt-h2">Let’s talk.</h2><p class="pt-em">Tell me where you are. I’ll tell you where to start.</p></div>' +
      '<div class="pt-contact__grid pt-reveal">' + cards.map(function (c) {
        return '<article class="pt-card">' + icon(c[0], 28) + '<h3 class="pt-h3" style="font-size:20px">' + esc(c[1]) + '</h3><p class="pt-text-s">' + esc(c[2]) + "</p>" +
          '<a class="pt-btn pt-btn--dark pt-btn--sm" href="' + esc(c[4]) + '">' + esc(c[3]) + "</a></article>";
      }).join("") + "</div></div></section>";
  }

  function testimonial(data) {
    var t = d(data).testimonials[0];
    return '<section class="pt-quote pt-photo pt-photo--strong pt-ph pt-ph--c" data-pt="carousel" aria-roledescription="carousel" aria-label="Client testimonials"><div class="pt-container">' +
      '<div class="pt-quote__stage pt-reveal">' +
      '<span class="pt-eyebrow" style="margin:0">Clients</span>' +
      '<blockquote aria-live="polite">“' + esc(t.quote) + '”</blockquote><cite class="pt-label">' + esc(t.name) + " — " + esc(t.detail) + "</cite>" +
      '<span class="pt-quote__count pt-label-s">01 / 0' + d(data).testimonials.length + "</span>" +
      '<button class="pt-quote__arrow pt-quote__arrow--prev" type="button" aria-label="Previous testimonial">' + icon("chevL", 32, 1) + "</button>" +
      '<button class="pt-quote__arrow pt-quote__arrow--next" type="button" aria-label="Next testimonial">' + icon("chevR", 32, 1) + "</button>" +
      '</div></div><span class="pt-ph__cap">Photo · Dark, low-key portrait</span></section>';
  }

  function about(data) {
    var b = d(data).brand;
    var shots = [["", "Coaching a squat"], ["b", "Kettlebell detail"], ["c", "Group warm-up"], ["b", "Chalk and bar"]];
    return '<section id="about" class="pt-about pt-photo pt-photo--strong pt-ph pt-ph--b"><div class="pt-container pt-about__grid">' +
      '<div class="pt-reveal"><span class="pt-eyebrow">About</span><h2 class="pt-h1" style="font-size:72px">Hi, I’m ' + esc(b.name) + ".</h2></div>" +
      '<div class="pt-about__bio pt-reveal">' +
      '<p class="pt-em">I don’t sell transformations. I teach people to train.</p>' +
      "<p>I’ve coached in " + esc(b.city) + " for [X] years, across commercial floors, strength gyms and the odd car park at 6am. Before that I was the person at the back of the class, unsure what I was doing and too stubborn to ask.</p>" +
      "<p>That’s the person I build sessions for. We start with how you move today, not how someone on the internet moves. We pick a few things that matter, we do them well, and we add weight when you’ve earned it. Nothing clever. Nothing you can’t keep doing in ten years.</p>" +
      "<p>Most of my clients are busy: parents, shift workers, people who’ve tried everything once. They don’t need more motivation. They need a plan, a time and a place. That’s why I train at three gyms across the city — so the closest one is never far.</p>" +
      "<p>[Qualifications and certifications.]</p></div></div>" +
      '<span class="pt-ph__cap">Photo · Coach portrait</span></section>' +
      '<div class="pt-gallery pt-dark"><div class="pt-gallery__grid">' + shots.map(function (s) { return ph(s[0], s[1], "pt-reveal"); }).join("") + "</div></div>";
  }

  function footer(data) {
    var b = d(data).brand;
    return '<footer class="pt-footer pt-dark"><div class="pt-container pt-footer__row">' +
      '<a class="pt-wordmark" href="#top">' + esc(b.name) + "</a>" +
      '<div class="pt-footer__links pt-label"><a href="#schedule">Schedule</a><a href="#about">About</a><a href="#contact">Contact</a></div>' +
      '<p class="pt-text-s">© ' + new Date().getFullYear() + " " + esc(b.name) + " · Personal training in " + esc(b.city) + "</p></div></footer>";
  }

  /* ---------------- behaviour ---------------- */
  function mountSchedule(root, data) {
    data = d(data);
    var host = root.querySelector('[data-pt="schedule"]') || root;
    var filter = "all";
    function render() {
      var r = scheduleInner(data, filter);
      host.querySelector("[data-pt-tabs]").innerHTML = r.tabs;
      host.querySelector("[data-pt-body]").innerHTML = r.body;
    }
    host.addEventListener("click", function (e) {
      var b = e.target.closest && e.target.closest("[data-filter]");
      if (!b) return;
      filter = b.getAttribute("data-filter");
      render();
    });
    render();
  }

  function mountNav(root) {
    var n = root.querySelector('[data-pt="nav"]');
    if (!n) return;
    var t = n.querySelector(".pt-nav__toggle");
    t.addEventListener("click", function () {
      var open = !n.classList.contains("is-open");
      n.classList.toggle("is-open", open);
      t.setAttribute("aria-expanded", String(open));
      t.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      t.innerHTML = icon(open ? "close" : "menu");
    });
    n.querySelectorAll(".pt-nav__panel a").forEach(function (a) { a.addEventListener("click", function () { if (n.classList.contains("is-open")) t.click(); }); });
  }

  function mountCarousel(root, data) {
    var c = root.querySelector('[data-pt="carousel"]');
    if (!c) return;
    var list = d(data).testimonials, i = 0;
    var q = c.querySelector("blockquote"), ci = c.querySelector("cite"), n = c.querySelector(".pt-quote__count");
    function go(step) {
      i = (i + step + list.length) % list.length;
      c.classList.add("is-fading");
      setTimeout(function () {
        q.textContent = "“" + list[i].quote + "”";
        ci.textContent = list[i].name + " — " + list[i].detail;
        n.textContent = "0" + (i + 1) + " / 0" + list.length;
        c.classList.remove("is-fading");
      }, 300);
    }
    c.querySelector(".pt-quote__arrow--prev").addEventListener("click", function () { go(-1); });
    c.querySelector(".pt-quote__arrow--next").addEventListener("click", function () { go(1); });
  }

  function reveal(root) {
    var els = root.querySelectorAll(".pt-reveal");
    if (!("IntersectionObserver" in window)) return;
    root.classList.add("pt-js");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    els.forEach(function (el) { io.observe(el); });
    // safety: never leave content hidden (e.g. in a static capture)
    setTimeout(function () { els.forEach(function (el) { el.classList.add("is-in"); }); }, 2500);
  }

  var PARTS = {
    nav: nav, hero: hero, ticker: ticker, schedule: scheduleShell, statement: statement, band: band,
    contact: contact, testimonial: testimonial, about: about, footer: footer
  };
  var ORDER = ["nav", "hero", "ticker", "schedule", "statement", "band", "contact", "testimonial", "about", "footer"];

  /* mount(el, parts, data): parts = "home" | a part name | array of part names */
  function mount(el, parts, data) {
    data = d(data);
    var list = parts === "home" || !parts ? ORDER : [].concat(parts);
    el.classList.add("pt");
    el.innerHTML = list.map(function (p) { return PARTS[p](data); }).join("");
    if (list.indexOf("schedule") > -1) mountSchedule(el, data);
    mountNav(el);
    mountCarousel(el, data);
    reveal(el);
    return el;
  }

  window.Trainer = {
    sample: SAMPLE, days: DAYS, icon: icon, mount: mount,
    html: { slot: function (s, data) { return slot(d(data), s); }, locationCard: locationCard, placeholder: ph },
    parts: ORDER.slice()
  };
})();
