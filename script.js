// ---------------- Elements ----------------
const passwordInput = document.getElementById("passwordInput");
const passwordBtn = document.getElementById("passwordBtn");
const passMsg = document.getElementById("passMsg");
const passwordScreen = document.querySelector(".password-screen");
const mainInterface = document.querySelector(".main-interface");
const openLetterBtn = document.getElementById("openLetterBtn");
const letterBox = document.querySelector(".letter-box");
const letterContent = document.getElementById("letterContent");
const bgMusic = document.getElementById("bgMusic");
const floatingHeartsContainer = document.querySelector(".floating-hearts");

// ------------- Customize here -------------
const correctPassword = "pinky"; // ← change password
const myMessage = `Wishing you a very Happy Birthday To Ragnitha Reddy Chenepalli🫂😍

You were the one who made our B.Tech days so special — planning all those fun trips and turning them into unforgettable memories. You always took care of me, fed me with your tasty food and wherever I see cashews, a smile comes on my face thinking "entha manchiga vandi pettedhi ani" 😂🫂, and you treated me like your own family.

After I lost many people in my life, you became my support system. You stood beside me when I needed someone the most. Even my parents trust you more than me sometimes 😂😂 — that’s how close you’ve become to my family!

No matter how sad you are, you never show it. You always bring smiles to everyone around you, and that’s what makes you truly special ♥️

I pray to God that this birthday brings you endless happiness, good health, and great success in everything you do. 2025 thagedhey ley 🥵😎🔥
`;
// ------------------------------------------

// ----------------- Password -----------------
passwordBtn.addEventListener("click", () => {
  const entered = passwordInput.value.trim();
  if (entered === correctPassword) {
    passwordScreen.classList.add("hidden");
    mainInterface.classList.remove("hidden");
    playMusic();
    spawnHearts(15);
    confettiShow();
  } else {
    passMsg.textContent = "❌ Wrong Password! Try Again";
    passwordScreen.animate(
      [
        { transform: "translateX(-6px)" },
        { transform: "translateX(6px)" },
        { transform: "translateX(0)" }
      ],
      { duration: 250 }
    );
  }
});

// ------------- Play background music safely -------------
function playMusic() {
  if (!bgMusic) return;
  const p = bgMusic.play();
  if (p && typeof p.then === "function") {
    p.catch(() => {});
  }
}

// ------------- Open letter (typewriter) -------------
openLetterBtn.addEventListener("click", () => {
  if (!letterBox.classList.contains("hidden")) {
    letterContent.textContent = "";
    typeWriter(myMessage, letterContent, 0);
    confettiShow();
    return;
  }

  letterContent.textContent = "";
  letterBox.classList.remove("hidden");
  typeWriter(myMessage, letterContent, 0);
  confettiShow();
});

// ------------ Typewriter function ------------
function typeWriter(text, element, index) {
  if (!element) return;

  if (index < text.length) {
    element.textContent += text.charAt(index);
    const ch = text.charAt(index);
    let delay = 45;
    if (ch === " ") delay = 18;
    if (/[.,!?]/.test(ch)) delay = 60;
    setTimeout(() => typeWriter(text, element, index + 1), delay);
  } else {
    confettiShow(800);
  }
}

// --------------- Confetti ---------------
function confettiShow(customDuration = 2000) {
  if (typeof confetti !== "function") return;
  const duration = customDuration;
  const end = Date.now() + duration;

  (function frame() {
    const x = Math.random() * 0.6 + 0.2;
    confetti({
      particleCount: 6,
      startVelocity: 30,
      spread: 110,
      ticks: 60,
      origin: { x, y: 0.2 + Math.random() * 0.2 }
    });
    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

// ------------- Floating hearts -------------
function spawnHearts(count = 10) {
  if (!floatingHeartsContainer) return;
  for (let i = 0; i < count; i++) {
    const heart = document.createElement("div");
    heart.className = "heart";
    const size = Math.floor(Math.random() * 30) + 22;
    heart.style.width = `${size}px`;
    heart.style.height = `${size}px`;
    heart.style.left = `${Math.random() * 90}%`;
    const duration = 5 + Math.random() * 5;
    const delay = Math.random() * 1.5;
    heart.style.animation = `floatHeart ${duration}s linear ${delay}s forwards`;
    heart.style.opacity = `${0.7 + Math.random() * 0.3}`;
    heart.addEventListener("click", () => {
      confettiShow(500);
      heart.animate(
        [
          { transform: "scale(1)" },
          { transform: "scale(1.4)" },
          { transform: "scale(0)" }
        ],
        { duration: 300, easing: "ease-out" }
      );
      setTimeout(() => heart.remove(), 320);
    });
    floatingHeartsContainer.appendChild(heart);
    setTimeout(() => {
      if (heart && heart.parentElement) heart.remove();
    }, (duration + delay + 0.3) * 1000);
  }
}
