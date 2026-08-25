// type your JavaScript code...

(() => {
  // Shared state
  let videos = [];
  let hero = null;

  const perPage = 2;
  let page = 0;

  // ====== 1) LOAD DATA FROM API ======
  const getYoutubeVideo = async () => {
    try {
      console.log("Calling API for YouTube videos...");

      const response = await apiCall(
        "AnonymousDataGet/ExecuteJson/SPClientAnonymous/54",
        { PageName: "CFA" },
      );

      const raw = response?.result;

      // Expecting JSON array string
      videos = typeof raw === "string" ? JSON.parse(raw) : raw || [];

      console.log("Videos from API:", videos);

      if (!Array.isArray(videos) || videos.length === 0) {
        console.warn("No videos returned from API");
        return;
      }

      renderSlides();
      initSwiper();
      renderStrip(); // bottom cards
    } catch (err) {
      console.error("Error in getYoutubeVideo:", err);
    }
  };

  // Call the API on load
  getYoutubeVideo();

  // ====== 2) BUILD SWIPER SLIDES ======
  function renderSlides() {
    const wrapper = document.querySelector(".heroSwiper .swiper-wrapper");
    if (!wrapper) {
      console.warn(".heroSwiper .swiper-wrapper not found");
      return;
    }

    wrapper.innerHTML = "";

    videos.forEach((v, i) => {
      const slide = document.createElement("div");
      slide.className = "swiper-slide";

      const link = document.createElement("a");
      link.className = "slide-link";
      link.href = v.url || "#";
      link.target = "_blank";
      link.rel = "noopener";
      link.setAttribute("aria-label", v.title || `Video ${i + 1}`);

      const img = document.createElement("img");
      img.src = v.img;
      img.alt = v.title || `Video ${i + 1}`;

      const overlay = document.createElement("div");
      overlay.className = "play-overlay";
      overlay.innerHTML = `
        <img src="https://i.postimg.cc/pdK2MSQ3/image-3-2x.png" alt="Play">
      `;

      link.appendChild(img);
      link.appendChild(overlay);
      slide.appendChild(link);
      wrapper.appendChild(slide);
    });
  }

  // ====== 3) INIT SWIPER AFTER SLIDES ======
  function initSwiper() {
    if (hero) {
      hero.update();
      return;
    }

    if (typeof Swiper === "undefined") {
      console.error("Swiper is not loaded");
      return;
    }

    hero = new Swiper(".heroSwiper", {
      speed: 500,
      effect: "slide",
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      loop: true,
    });

    hero.update();
  }

  // ====== 4) BOTTOM STRIP (BIG + MINI CARDS) ======
  const big1 = document.getElementById("big1");
  const big2 = document.getElementById("big2");
  const big1img = document.getElementById("big1img");
  const big2img = document.getElementById("big2img");

  const mini1 = document.getElementById("mini1");
  const mini2 = document.getElementById("mini2");
  const mini3 = document.getElementById("mini3");
  const mini1img = document.getElementById("mini1img");
  const mini2img = document.getElementById("mini2img");
  const mini3img = document.getElementById("mini3img");

  const fab = document.getElementById("moreFab");
  const dotsWrap = document.getElementById("dots");

  function setCard(el, imgEl, idx) {
    if (!el || !imgEl) return;

    if (idx < videos.length) {
      const v = videos[idx];
      el.style.visibility = "visible";
      imgEl.src = v.img;
      imgEl.alt = v.title || `Video ${idx + 1}`;
      el.onclick = (e) => {
        e.preventDefault();
        if (hero) {
          // +1 because Swiper's internal index shifts with loop
          hero.slideToLoop(idx, 500);
        }
      };
    } else {
      el.style.visibility = "hidden";
      el.onclick = null;
    }
  }

  function renderDots() {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = "";

    const pages = Math.ceil(videos.length / perPage) || 1;

    for (let i = 0; i < pages; i++) {
      const d = document.createElement("span");
      d.className = "dot" + (i === page ? " active" : "");
      d.addEventListener("click", () => {
        page = i;
        renderStrip();
      });
      dotsWrap.appendChild(d);
    }
  }

  function renderStrip() {
    if (!videos.length) return;

    const start = page * perPage;

    setCard(big1, big1img, start);
    setCard(big2, big2img, start + 1);

    setCard(mini1, mini1img, start + 2);
    setCard(mini2, mini2img, start + 3);
    setCard(mini3, mini3img, start + 4);

    const remaining = Math.max(0, videos.length - (start + 5));
    if (fab) {
      if (remaining > 0) {
        fab.textContent = `+${remaining}`;
        fab.style.display = "flex";
        fab.onclick = () => {
          const pages = Math.ceil(videos.length / perPage) || 1;
          if (page < pages - 1) {
            page += 1;
            renderStrip();
          }
        };
      } else {
        fab.style.display = "none";
        fab.onclick = null;
      }
    }

    renderDots();
  }
})();
