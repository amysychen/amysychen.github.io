(function () {
  "use strict";

  function initSpinningPhoto(el) {
    if (!el) return;
    var rotation = 0;
    var speed = 0;
    var rafId = null;
    var maxSpeed = 45;

    function tick() {
      rotation += speed;
      if (rotation >= 360) rotation -= 360;
      if (rotation < 0) rotation += 360;
      el.style.transform = "rotate(" + rotation + "deg)";
      speed = Math.min(speed * 1.04, maxSpeed);
      rafId = requestAnimationFrame(tick);
    }

    el.addEventListener("mouseenter", function () {
      speed = 0.15;
      if (!rafId) rafId = requestAnimationFrame(tick);
    });

    el.addEventListener("mouseleave", function () {
      cancelAnimationFrame(rafId);
      rafId = null;
      speed = 0;
      el.style.transform = "";
    });
  }

  initSpinningPhoto(document.querySelector(".panel-photo-wrap"));
  initSpinningPhoto(document.querySelector(".about-image .image-wrapper"));

  var nav = document.querySelector(".nav");
  var menuToggle = document.querySelector(".menu-toggle");
  var navLinks = document.querySelectorAll('.nav-list a[href^="#"]');

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", function () {
      var expanded = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", !expanded);
      nav.classList.toggle("open");
      document.body.style.overflow = expanded ? "" : "hidden";
    });
  }

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      if (nav && nav.classList.contains("open")) {
        nav.classList.remove("open");
        if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    });
  });

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        var id = entry.target.getAttribute("id");
        var navLink = document.querySelector('.nav-list a[href="#' + id + '"]');
        if (navLink) {
          navLink.classList.toggle("active", entry.isIntersecting);
        }
      });
    },
    { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
  );

  document.querySelectorAll("#about, #experience, #skills, #contact").forEach(function (section) {
    observer.observe(section);
  });
})();
