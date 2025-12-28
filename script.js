document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#booking form");
  const destinationInput = document.querySelector("#destination");

  const overlay = document.getElementById("travelOverlay");
  const bg = overlay?.querySelector(".travel-bg");
  const ship = document.getElementById("travelShip");
  const message = document.getElementById("travelMessage");
  const backBtn = document.getElementById("travelBackBtn");

  const header = document.querySelector("header");
  const main = document.querySelector("main");
  const footer = document.querySelector("footer");

  if (
    !form ||
    !destinationInput ||
    !overlay ||
    !bg ||
    !ship ||
    !message ||
    !backBtn
  ) {
    console.error("Missing required elements. Check IDs/classes in HTML.");
    return;
  }

  // ✅ საჭირო სტილები (Overlay + Stars + Ship animations) — CSS არ გჭირდება ცალკე
  injectTravelStyles();

  const destinationImages = {
    "Kepler-186f": "./assets/dest_kepler.jpeg",
    "Titan Station": "./assets/dest_titan.jpeg",
    "Nebula Resort": "./assets/dest_nebula.jpeg",
    "Event Horizon": "./assets/dest_blackhole.jpeg",
  };

  let starsEl = null;
  let travelTimer1 = null;
  let travelTimer2 = null;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const planet = destinationInput.value.trim();
    const planetImg = destinationImages[planet];
    if (!planetImg) {
      // თუ გინდა აქ alert ან inline error დაამატე
      return;
    }

    // 1) მთავარი საიტის გაქრობა
    header?.classList.add("is-hidden");
    main?.classList.add("is-hidden");
    footer?.classList.add("is-hidden");

    // 2) Overlay გახსნა + პლანეტის ფოტო ფონად
    message.hidden = true;
    overlay.setAttribute("aria-hidden", "false");
    bg.style.backgroundImage = `url("${planetImg}")`;

    overlay.classList.add("is-active", "is-warping");
    overlay.classList.remove("is-orbiting", "is-flying");

    // 3) ვარსკვლავების ეფექტი ჩართვა
    if (starsEl) starsEl.remove();
    starsEl = startFallingStars(overlay);

    // 4) მანქანის ფრენა (ზემოდან ქვემოთ) + წრე (ორბიტა)
    //    (პირველ 0.2s-ში “შემოიჭრას”, მერე “დაარტყას წრე”)
    clearTimeout(travelTimer1);
    clearTimeout(travelTimer2);

    overlay.classList.add("is-flying");

    travelTimer1 = setTimeout(() => {
      overlay.classList.add("is-orbiting"); // წრეზე ტრიალი
    }, 800);

    // 5) დასრულება -> შეტყობინება
    travelTimer2 = setTimeout(() => {
      overlay.classList.remove("is-warping");
      overlay.classList.remove("is-orbiting");
      message.hidden = false;

      // ვარსკვლავები შეგიძლია დატოვო ან გამორთო:
      if (starsEl) starsEl.remove();
      starsEl = null;
    }, 5200);
  });

  backBtn.addEventListener("click", () => {
    // reset overlay
    overlay.classList.remove(
      "is-active",
      "is-warping",
      "is-orbiting",
      "is-flying"
    );
    overlay.setAttribute("aria-hidden", "true");
    message.hidden = true;

    // remove stars
    if (starsEl) starsEl.remove();
    starsEl = null;

    // show site back
    header?.classList.remove("is-hidden");
    main?.classList.remove("is-hidden");
    footer?.classList.remove("is-hidden");

    // დაბრუნება დასაწყისზე
    destinationInput.value = "";
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  function startFallingStars(parentEl) {
    const container = document.createElement("div");
    container.className = "star-container";

    // მეტი ვარსკვლავი = უფრო “warp” ეფექტი
    const count = 12;
    for (let i = 0; i < count; i++) {
      const star = document.createElement("div");
      star.className = "star";

      // რანდომ პოზიცია/სიჩქარე/დაყოვნება
      const right = Math.random() * 95; // %
      const duration = 2.6 + Math.random() * 4.2; // 2.6s - 6.8s
      const delay = Math.random() * 2.5; // 0 - 2.5s
      const height = 80 + Math.random() * 140; // 80 - 220px

      star.style.right = `${right}%`;
      star.style.animationDuration = `${duration}s`;
      star.style.animationDelay = `${delay}s`;
      star.style.height = `${height}px`;

      container.appendChild(star);
    }

    parentEl.appendChild(container);
    return container;
  }

  function injectTravelStyles() {
    if (document.getElementById("travel-effects-style")) return;

    const style = document.createElement("style");
    style.id = "travel-effects-style";
    style.textContent = `
      /* hide site */
      .is-hidden { display: none !important; }

      /* FULLSCREEN overlay base */
      .travel-overlay{
        position: fixed;
        inset: 0;
        z-index: 9999;
        display: none;
        overflow: hidden;
        background: #000;
      }
      .travel-overlay.is-active{ display: block; }

      .travel-bg{
        position: absolute;
        inset: 0;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        transform: scale(1.02);
        filter: saturate(1.05) contrast(1.05);
      }

      /* warp pulse */
      .travel-overlay.is-warping .travel-bg{
        animation: warpPulse 0.6s ease-in-out infinite;
      }
      @keyframes warpPulse{
        0% { transform: scale(1.02); filter: blur(0px); }
        50% { transform: scale(1.08); filter: blur(2px); }
        100% { transform: scale(1.02); filter: blur(0px); }
      }

      /* Ship */
      .travel-ship{
        position: absolute;
        top: -35%;
        left: 50%;
        width: 160px;
        transform: translateX(-50%) scale(0.7);
        opacity: 0;
        filter: drop-shadow(0 0 25px rgba(0,255,255,0.45));
        pointer-events: none;
      }

      /* Fly down */
      .travel-overlay.is-flying .travel-ship{
        opacity: 1;
        animation: flyDown 2.2s cubic-bezier(0.2,0.8,0.2,1) forwards;
      }
      @keyframes flyDown{
        0%   { top: -35%; transform: translateX(-50%) scale(0.55) rotate(0deg); filter: blur(0px); }
        55%  { top: 30%;  transform: translateX(-50%) scale(0.95) rotate(8deg); filter: blur(0.6px); }
        100% { top: 55%;  transform: translateX(-50%) scale(1.0) rotate(0deg); filter: blur(0.2px); }
      }

      /* Orbit spin (after it reaches center) */
      .travel-overlay.is-orbiting .travel-ship{
        animation: orbitSpin 2.4s linear infinite;
        top: 55%;
      }
      @keyframes orbitSpin{
        0%   { transform: translate(-50%, -50%) rotate(0deg) translateX(140px) rotate(0deg) scale(0.85); }
        100% { transform: translate(-50%, -50%) rotate(360deg) translateX(140px) rotate(-360deg) scale(0.85); }
      }

      /* Stars (CSS falling) */
      .star-container{
        position: absolute;
        inset: 0;
        pointer-events: none;
        z-index: 2;
      }
      .star{
        position: absolute;
        top: -15%;
        width: 2px;
        background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(180,220,255,1));
        opacity: 0;
        transform: rotate(45deg);
        animation-name: fall;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
      }
      @keyframes fall{
        0%   { opacity: 0; transform: translate(0,0) rotate(45deg); }
        10%  { opacity: 1; }
        100% { opacity: 0; transform: translate(-120vh, 120vh) rotate(45deg); }
      }

      /* Message box center */
      .travel-message{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: min(820px, 92vw);
        padding: 34px 28px;
        border: 2px solid rgba(0,255,255,0.55);
        background: rgba(0,0,0,0.55);
        backdrop-filter: blur(10px);
        box-shadow: 0 0 36px rgba(0,255,255,0.18);
        text-align: center;
        z-index: 3;
      }

      .travel-message h2{
        margin: 0 0 12px;
        font-family: "Orbitron", "Syncopate", system-ui, sans-serif;
        font-size: clamp(34px, 5vw, 56px);
        letter-spacing: 0.14em;
        line-height: 1.05;
        text-transform: uppercase;
        color: #fff;
        text-shadow: 0 0 10px rgba(0,255,255,0.22);
      }

      .travel-message p{
        margin: 0 0 20px;
        font-family: system-ui, sans-serif;
        font-size: clamp(14px, 2vw, 18px);
        opacity: 0.9;
        color: rgba(255,255,255,0.88);
      }

      .travel-back-btn{
        border: 2px solid rgba(0,255,255,0.75);
        background: transparent;
        color: #fff;
        padding: 12px 18px;
        cursor: pointer;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
      .travel-back-btn:hover{
        box-shadow: 0 0 18px rgba(0,255,255,0.25);
      }
    `;
    document.head.appendChild(style);
  }
});
