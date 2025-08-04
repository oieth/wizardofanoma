// --- OYUN İÇİ LEADERBOARD GÖRÜNÜRLÜK KONTROLÜ ---
function showLeaderboard(show = true) {
  const lb = document.getElementById("leaderboardArea");
  if (!lb) return;
  lb.style.display = show ? "block" : "none";
  if (show && typeof showTop5ToElement === "function") {
    showTop5ToElement("leaderboardArea");
  }
}
const startScreen = document.getElementById("start-screen");
const startButton = document.getElementById("start-button");
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const usernameInput = document.getElementById("username");
const howtoBtn = document.getElementById("howtoBtn");
const howtoModal = document.getElementById("howtoModal");
const closeHowToBtn = document.getElementById("closeHowTo");
const gameOverScreen = document.getElementById("game-over-screen");
const finalScoreText = document.getElementById("finalScore");
const restartButton = document.getElementById("restartButton");
const shareXButton = document.getElementById("shareXButton");
window.jumpSound = new Audio("jump.mp3");
window.spellSound = new Audio("spell.mp3");
const profilePhotoContainer = document.getElementById("profile-photo-container");
const profilePhoto = document.getElementById("profile-photo");

const gameOverPhoto = document.getElementById("game-over-photo");
const gameOverUsername = document.getElementById("game-over-username");

const congratsText = document.getElementById("congratsText");
const highScoreDisplay = document.getElementById("highScoreDisplay");
const topBar = document.getElementById("top-bar");

const usernameModal = document.getElementById("username-modal");
const closeUsernameModal = document.getElementById("closeUsernameModal");
const usernameModalText = document.getElementById("username-modal-text");

const langBar = document.getElementById("lang-select-bar");
const langBtns = document.querySelectorAll(".lang-btn");
// Elementleri seç
const feedbackBtn = document.getElementById("feedbackBtn");
const feedbackModal = document.getElementById("feedbackModal");
const sendFeedbackBtn = document.getElementById("sendFeedbackBtn");
const feedbackInput = document.getElementById("feedbackInput");
const closeFeedbackModal = document.getElementById("closeFeedbackModal");

// Feedback butonuna tıklayınca modalı aç
feedbackBtn && feedbackBtn.addEventListener("click", () => {
  feedbackModal.style.display = "flex";
});

// Modalı kapat
closeFeedbackModal && closeFeedbackModal.addEventListener("click", () => {
  feedbackModal.style.display = "none";
});

// Modal dışında tıklayınca da kapansın
feedbackModal && feedbackModal.addEventListener("click", function(e) {
  if (e.target === feedbackModal) {
    feedbackModal.style.display = "none";
  }
});
sendFeedbackBtn && sendFeedbackBtn.addEventListener("click", () => {
  const feedbackText = feedbackInput.value.trim();
  if (!feedbackText) {
    alert("Lütfen bir mesaj yazın.");
    return;
  }
  // İstersen kullanıcı adı da gönderebilirsin
  const username = currentUsername || "Anonim";
  const feedbackData = {
    username,
    feedback: feedbackText,
    date: new Date().toISOString(),
    score: score || 0
  };
  // Firebase Realtime Database'e yaz
  const ref = window.db ? window.db.ref('feedbacks') : firebase.database().ref('feedbacks');
  ref.push(feedbackData, function(error) {
    if (error) {
      alert("Gönderilemedi: " + error.message);
    } else {
      alert("Teşekkürler! Geri bildiriminiz alındı.");
      feedbackInput.value = "";
      feedbackModal.style.display = "none";
    }
  });
});
const LANGS = {
  tr: {
    title: "Wizard Of Anoma",
    beta: "BETA",
    username_label: "Lütfen X kullanıcı adınızı giriniz",
    username_placeholder: "Kullanıcı Adı",
    start: "Oyna",
    howto: "Nasıl Oynanır?",
    howto_title: "Nasıl Oynanır?",
    howto_desc: "Sağa doğru ilerle. Büyü ile balonları vur, bloklardan zıpla ve düşmanlardan kaç. Canları topla, en yüksek skoru yap!",
    howto_jump: "<b>Yukarı:</b> W veya ↑ ile zıpla",
    howto_shoot: "<b>Büyü at:</b> Boşluk veya Fare Sol Tık",
    modal: "Lütfen X kullanıcı adını giriniz",
    restart: "Tekrar Oyna",
    oi: "Made by Oi",
    score: "Puan",
    leaderboard: "🏅 En İyi 5 Skor",
    time: "Süre",
    highscore: "En Yüksek Puan",
    yourscore: "Senin Puanın",
    newhigh: "🎉 Tebrikler! Yeni rekorunu kırdın!",
    close: "Kapat",
    sharex: "X'te Paylaş"
  },
  en: {
    title: "Wizard Of Anoma",
    beta: "BETA",
    username_label: "Please enter your X username",
    username_placeholder: "Username",
    start: "Play",
    howto: "How to Play?",
    howto_title: "How to Play?",
    howto_desc: "Move right. Shoot balloons with magic, jump on blocks and avoid enemies. Collect hearts, make the highest score!",
    howto_jump: "<b>Jump:</b> W or ↑",
    howto_shoot: "<b>Shoot:</b> Space or Left Mouse",
    modal: "Please enter your X username",
    restart: "Play Again",
    oi: "Made by Oi",
    score: "Score",
    leaderboard: "🏅 Top 5 Scores",
    time: "Time",
    highscore: "High Score",
    yourscore: "Your Score",
    newhigh: "🎉 Congrats! New high score!",
    close: "Close",
    sharex: "Share on X"
  },
  ko: {
    title: "Wizard Of Anoma",
    beta: "베타",
    username_label: "X 사용자 이름을 입력하세요",
    username_placeholder: "사용자 이름",
    start: "시작하기",
    howto: "플레이 방법?",
    howto_title: "플레이 방법?",
    howto_desc: "오른쪽으로 이동하세요. 마법으로 풍선을 쏘고, 블록 위로 점프하고 적을 피하세요. 하트를 모으고, 최고 점수를 기록하세요!",
    howto_jump: "<b>점프:</b> W 또는 ↑",
    howto_shoot: "<b>마법 쏘기:</b> 스페이스 또는 마우스 왼쪽 버튼",
    modal: "X 사용자 이름을 입력하세요",
    restart: "다시 시작",
    oi: "Made by Oi",
    score: "점수",
    leaderboard: "🏅 상위 5점",
    time: "시간",
    highscore: "최고 점수",
    yourscore: "당신의 점수",
    newhigh: "🎉 축하합니다! 최고 점수 달성!",
    close: "닫다",
    sharex: "X에 공유"
  },
  vi: {
    title: "Wizard Of Anoma",
    beta: "BETA",
    username_label: "Vui lòng nhập tên người dùng X",
    username_placeholder: "Tên người dùng",
    start: "Chơi",
    howto: "Cách chơi?",
    howto_title: "Cách chơi?",
    howto_desc: "Di chuyển sang phải. Bắn bóng bằng phép thuật, nhảy lên khối và tránh kẻ thù. Thu thập tim, đạt điểm cao nhất!",
    howto_jump: "<b>Nhảy:</b> W hoặc ↑",
    howto_shoot: "<b>Bắn phép:</b> Space hoặc Chuột trái",
    modal: "Vui lòng nhập tên người dùng X",
    restart: "Chơi lại",
    oi: "Made by Oi",
    score: "Điểm",
    leaderboard: "🏅 Top 5 điểm",
    time: "Thời gian",
    highscore: "Điểm cao",
    yourscore: "Điểm của bạn",
    newhigh: "🎉 Chúc mừng! Bạn đã đạt kỷ lục mới!",
    close: "đóng",
    sharex: "Chia sẻ trên X"
  },
  pl: {
    title: "Wizard Of Anoma",
    beta: "BETA",
    username_label: "Wpisz nazwę użytkownika X",
    username_placeholder: "Nazwa użytkownika",
    start: "Graj",
    howto: "Jak grać?",
    howto_title: "Jak grać?",
    howto_desc: "Idź w prawo. Strzelaj do balonów magią, skacz po blokach i unikaj wrogów. Zbieraj serca, zdobywaj najwyższy wynik!",
    howto_jump: "<b>Skok:</b> W lub ↑",
    howto_shoot: "<b>Magia:</b> Spacja lub Lewy Przycisk Myszy",
    modal: "Wpisz nazwę użytkownika X",
    restart: "Zagraj ponownie",
    oi: "Made by Oi",
    score: "Wynik",
    leaderboard: "🏅 Top 5 wyników",
    time: "Czas",
    highscore: "Najlepszy wynik",
    yourscore: "Twoje Wyniki",
    newhigh: "🎉 Gratulacje! Nowy rekord!",
    close: "닫다",
    sharex: "Udostępnij na X"
  },
  ru: {
    title: "Wizard Of Anoma",
    beta: "БЕТА",
    username_label: "Пожалуйста, введите ваш X логин",
    username_placeholder: "Логин",
    start: "Играть",
    howto: "Как играть?",
    howto_title: "Как играть?",
    howto_desc: "Двигайтесь вправо. Стреляйте по шарам магией, прыгайте по блокам и избегайте врагов. Собирайте сердца и набирайте максимальный балл!",
    howto_jump: "<b>Прыжок:</b> W или ↑",
    howto_shoot: "<b>Магия:</b> Пробел или ЛКМ",
    modal: "Пожалуйста, введите ваш X логин",
    restart: "Играть снова",
    oi: "Made by Oi",
    score: "Счёт",
    leaderboard: "🏅 Топ 5",
    time: "Время",
    highscore: "Рекорд",
    yourscore: "Ваш счёт",
    newhigh: "🎉 Поздравляем! Новый рекорд!",
    close: "Закрыть",
    sharex: "Поделиться на X"
  },
  zh: {
    title: "Wizard Of Anoma",
    beta: "测试版",
    username_label: "请输入您的X用户名",
    username_placeholder: "用户名",
    start: "开始游戏",
    howto: "怎么玩？",
    howto_title: "怎么玩？",
    howto_desc: "向右移动。用魔法击打气球，跳上方块，避开敌人。收集爱心，获得最高分！",
    howto_jump: "<b>跳跃:</b> W或↑",
    howto_shoot: "<b>魔法攻击:</b> 空格或鼠标左键",
    modal: "请输入您的X用户名",
    restart: "再玩一次",
    oi: "Made by Oi",
    score: "得分",
    leaderboard: "🏅 前5名",
    time: "时间",
    highscore: "最高分",
    yourscore: "您的得分",
    newhigh: "🎉 恭喜！新纪录！",
    close: "닫다",
    sharex: "分享到 X"
  }
};
function showStartScreen() {
  document.getElementById("start-screen").style.display = "flex";
  document.getElementById("side-leaderboard").style.display = "flex";
  // (Varsa başka başlatma kodların buraya!)
  document.addEventListener("DOMContentLoaded", showAudioFab);
}
document.getElementById("effectVolumeSlider").addEventListener("input", function(e) {
  const value = Number(e.target.value);
  // jump.mp3 ve spell.mp3 sesini değiştir
  if (window.jumpSound) window.jumpSound.volume = value;
  if (window.spellSound) window.spellSound.volume = value;
  // Eğer oyun sırasında birden fazla Audio objesi üretiyorsan, hepsine uygula!
});
function showAudioFab() {
  document.getElementById("audio-controls-fab").style.display = "flex";
}
function hideAudioFab() {
  document.getElementById("audio-controls-fab").style.display = "none";
}
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("side-leaderboard").style.display = "flex";
});
document.getElementById("start-button").addEventListener("click", function() {
  hideAudioFab();
  // Oyun başlatan kodlarını da burada çağır
});
document.getElementById("restartButton").addEventListener("click", function() {
  showAudioFab();
  // Başlangıç ekranına dönme kodların
});
// Örneğin tekrar oyna butonunda:
document.getElementById("restartButton").addEventListener("click", showStartScreen);
let currentLang = "en";
window.addEventListener("DOMContentLoaded", function() {
  setLanguage(currentLang);
});
function setLanguage(lang) {
  currentLang = lang;
  document.getElementById("title-main").textContent = "Wizard Of Anoma";
  document.getElementById("title-beta").textContent = LANGS[lang].beta;
  document.getElementById("username-label").textContent = LANGS[lang].username_label;
  usernameInput.placeholder = LANGS[lang].username_placeholder;
  startButton.textContent = LANGS[lang].start;
  howtoBtn.textContent = LANGS[lang].howto;
  document.querySelector(".oi-credit").textContent = LANGS[lang].oi;
  document.getElementById("title-main-over").textContent = "Wizard Of Anoma";
  document.getElementById("title-beta-over").textContent = LANGS[lang].beta;
  document.getElementById("restartButton").textContent = LANGS[lang].restart;
  document.querySelector("#game-over-screen .oi-credit").textContent = LANGS[lang].oi;
  usernameModalText.textContent = LANGS[lang].modal;
  document.getElementById("howto-title").textContent = LANGS[lang].howto_title;
  document.getElementById("howto-desc").textContent = LANGS[lang].howto_desc;
  document.getElementById("howto-jump").innerHTML = LANGS[lang].howto_jump;
  document.getElementById("howto-shoot").innerHTML = LANGS[lang].howto_shoot;
  document.querySelector(".howto-credit").textContent = LANGS[lang].oi;
  document.getElementById("start-button").addEventListener("click", function() {
  // Başlangıç ekranını gizle
  document.getElementById("start-screen").style.display = "none";
  // Sıralama panelini gizle
  document.getElementById("side-leaderboard").style.display = "none";
  // (Oyununu başlatan diğer kodlar buraya!)
});
  langBtns.forEach(btn => btn.classList.remove("active"));
  document.querySelector(`.lang-btn[data-lang="${lang}"]`).classList.add("active");
  // Kapat butonlarını güncelle
  closeHowToBtn.textContent = LANGS[lang].close;
  closeUsernameModal.textContent = LANGS[lang].close;
  // X paylaş butonu
  shareXButton.textContent = LANGS[lang].sharex;
}
langBtns.forEach(btn => {
  btn.addEventListener("click", function() {
    setLanguage(btn.getAttribute("data-lang"));
  });
});
setLanguage(currentLang);

function showBlurScreen(target, show) {
  if (show) target.classList.add("show-blur");
  else target.classList.remove("show-blur");
  document.getElementById("bg-image").style.zIndex = show ? "1" : "0";
}
function showTopBar(show) {
  if (show) topBar.classList.add("top-bar-visible");
  else topBar.classList.remove("top-bar-visible");
  if (!show) {
    document.body.classList.add("in-game");
  } else {
    document.body.classList.remove("in-game");
  }
}
let gameStarted = false;
let currentUsername = "";
let currentUserPhotoURL = "";

let highScore = 0;

function getHighScore(username) {
  if (!username) return 0;
  return Number(localStorage.getItem("highscore_" + username)) || 0;
}
function setHighScore(username, score) {
  if (!username) return;
  localStorage.setItem("highscore_" + username, String(score));
}

function getAllHighScores() {
  const scores = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith("highscore_")) {
      const username = key.substring(10);
      const score = Number(localStorage.getItem(key)) || 0;
      if (username && score > 0) {
        scores.push({ username, score });
      }
    }
  }
  return scores.sort((a, b) => b.score - a.score).slice(0, 5);
}
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", () => {
  resizeCanvas();
  resetWizardPosition();
});
const walkImg = new Image();
walkImg.src = "sağ.png";
const spellImg = new Image();
spellImg.src = "büyü.png";
const yataImg = new Image();
yataImg.src = "yata.png";
const dikeyImg = new Image();
dikeyImg.src = "dikey.png";
const birdImg = new Image();
birdImg.src = "dusman.png";
const wizard = {
  x: 0,
  y: 0,
  width: 120,
  height: 160,
  speed: 2,
  vy: 0,
  gravity: 0.3,
  jumpPower: 16,
  onGround: false,
  invincible: false,
  direction: "right",
};
const maxHealth = 3;
let currentHealth = maxHealth;
const heartImg = new Image();
heartImg.src = "can.png";
function resetWizardPosition() {
  wizard.x = 0;
  wizard.y = canvas.height - wizard.height - 20;
  wizard.vy = 0;
  wizard.onGround = true;
}
resetWizardPosition();
const spells = [];
const orbs = [];
const blocks = [];
const birds = [];
const healthPickups = [];
let score = 0;
let cameraX = 0;
let blockCount = 0;
let stairActive = false;
let stairStep = 0;
let elapsedTime = 0;
let lastTime = Date.now();
let difficulty = 1;
let blockSpacing = 250;
let borderFlash = false;
let borderFlashTimeout = null;
let healthPickupTimer = 0;
const healthPickupInterval = 45;
let birdSpawnInterval = 3200;
function resetBirdInterval() {
  clearInterval(birdIntervalId);
  birdIntervalId = setInterval(spawnBird, birdSpawnInterval);
}
let birdIntervalId = setInterval(spawnBird, birdSpawnInterval);

function fetchXProfilePhoto(username) {
  return `https://unavatar.io/twitter/${username}`;
}
function updateProfilePhoto(username) {
  if (!username) {
    profilePhotoContainer.style.display = "none";
    startButton.disabled = true;
    currentUserPhotoURL = "";
    currentUsername = "";
    highScore = 0;
    return;
  }
  const photoURL = fetchXProfilePhoto(username);
  profilePhoto.src = photoURL;
  profilePhoto.onerror = () => (profilePhoto.src = "default-profile.png");
  profilePhoto.onload = () => {
    profilePhotoContainer.style.display = "block";
    startButton.disabled = false;
  };
  currentUserPhotoURL = photoURL;
  currentUsername = username;
  highScore = getHighScore(username);
}
usernameInput.addEventListener("input", (e) => {
  updateProfilePhoto(e.target.value.trim());
});
startButton.addEventListener("click", (e) => {
  const usernameVal = usernameInput.value.trim();
  if (!usernameVal) {
    usernameModal.style.display = "flex";
    return;
  }
  showLeaderboard(true);
  gameStarted = true;
  document.body.classList.add("in-game");
  startScreen.style.display = "none";
  showBlurScreen(startScreen, false);
  showTopBar(false);
  gameOverScreen.style.display = "none";
  showBlurScreen(gameOverScreen, false);
  showTopBar(false);
  howtoModal.style.display = "none";
  canvas.style.display = "block";
  resetWizardPosition();
  lastTime = Date.now();
  score = 0;
  elapsedTime = 0;
  currentHealth = maxHealth;
  healthPickups.length = 0;
  healthPickupTimer = 0;
  highScore = getHighScore(usernameVal);
  currentUsername = usernameVal;
  gameLoop();
  resetBirdInterval();
});
closeUsernameModal.addEventListener("click", () => {
  usernameModal.style.display = "none";
});
usernameModal.addEventListener("click", (e) => {
  if (e.target === usernameModal) usernameModal.style.display = "none";
});
howtoBtn.addEventListener("click", () => (howtoModal.style.display = "flex"));
closeHowToBtn.addEventListener("click", () => (howtoModal.style.display = "none"));
restartButton.addEventListener("click", () => {
  gameOverScreen.style.display = "none";
  showBlurScreen(gameOverScreen, false);
  showTopBar(true);
  document.body.classList.remove("in-game");
  resetWizardPosition();
  currentHealth = maxHealth;
  score = 0;
  elapsedTime = 0;
  wizard.x = 0;
  orbs.length = 0;
  spells.length = 0;
  blocks.length = 0;
  birds.length = 0;
  healthPickups.length = 0;
  healthPickupTimer = 0;
  gameStarted = true;
  lastTime = Date.now();
  startScreen.style.display = "flex";
  showBlurScreen(startScreen, true);
  showTopBar(true);
  canvas.style.display = "none";
  highScore = getHighScore(currentUsername);
  showLeaderboard(false);
});
document.addEventListener("DOMContentLoaded", function() {
  showLeaderboard(false); // SAYFA AÇILINCA LEADERBOARD GİZLİ BAŞLASIN
  showBlurScreen(startScreen, true);
  showTopBar(true);
});
// X'te Paylaş: tıklanınca paylaşım aç
shareXButton.addEventListener("click", function() {
  const oyunLink = "https://oyun-linki-gelecek.com"; // Buraya kendi oyun linkini koyacaksın.
  const tweetText = encodeURIComponent(
    `Just scored ${score} in Wizard of Anoma!\nCan you beat me? 🧙‍♂️✨\nPlay here: ${oyunLink}\nThanks @oinomaoseth\n#WizardOfAnoma`
  );
  const url = `https://twitter.com/intent/tweet?text=${tweetText}`;
  window.open(url, "_blank");
});

function updateDifficulty() {
  if (elapsedTime >= 40) difficulty = 1.4;
  else if (elapsedTime >= 20) difficulty = 1.2;
  else if (elapsedTime >= 10) difficulty = 1.1;
  else difficulty = 1;
  let newBirdInterval = Math.max(1200, 3200 / difficulty);
  if (Math.abs(newBirdInterval - birdSpawnInterval) > 1) {
    birdSpawnInterval = newBirdInterval;
    resetBirdInterval();
  }
}
function spawnBlock() {
  blockCount++;
  if (blockCount % 7 === 0 && !stairActive) {
    stairActive = true;
    stairStep = 0;
  }
  if (stairActive) {
    const baseY = canvas.height - 120;
    const y = baseY - stairStep * 40;
    blocks.push({
      x: cameraX + canvas.width + 200 + stairStep * (blockSpacing + 10),
      y,
      width: 200,
      height: 40,
      isVertical: false,
    });
    stairStep++;
    if (stairStep >= 2) stairActive = false;
  } else {
    const fixedY = canvas.height - 120;
    let baseBlock = {
      x: cameraX + canvas.width + 200,
      y: fixedY,
      width: 200,
      height: 40,
      isVertical: false,
    };
    blocks.push(baseBlock);
    if (Math.random() < 0.2) {
      const dikeyBlokBoyu = 120;
      blocks.push({
        x: baseBlock.x + baseBlock.width + 40,
        y: baseBlock.y + baseBlock.height - dikeyBlokBoyu,
        width: 40,
        height: dikeyBlokBoyu,
        isVertical: true,
      });
    }
  }
}
let blockSpawnInterval = 3000;
function resetBlockInterval() {
  clearInterval(blockIntervalId);
  blockIntervalId = setInterval(spawnBlock, blockSpawnInterval);
}
let blockIntervalId = setInterval(spawnBlock, blockSpawnInterval);

function spawnOrb() {
  const minOrbY = wizard.y + 30;
  const maxOrbY = Math.min(canvas.height / 2, wizard.y + 100);
  orbs.push({
    x: cameraX + canvas.width + 50,
    y: Math.random() * (maxOrbY - minOrbY) + minOrbY,
    radius: 20,
  });
}
let orbSpawnInterval = 3500;
function resetOrbInterval() {
  clearInterval(orbIntervalId);
  orbIntervalId = setInterval(spawnOrb, orbSpawnInterval);
}
let orbIntervalId = setInterval(spawnOrb, orbSpawnInterval);

function spawnBird() {
  if (!gameStarted) return;
  let isOnBlock = false;
  let wizardBlockTop = canvas.height - wizard.height - 20;
  for (const block of blocks) {
    const wizardRect = {
      x: wizard.x,
      y: wizard.y,
      width: wizard.width,
      height: wizard.height,
    };
    const blockRect = {
      x: block.x,
      y: block.y,
      width: block.width,
      height: block.height,
    };
    if (
      !block.isVertical &&
      wizard.y + wizard.height >= block.y - 2 &&
      wizard.x + wizard.width > block.x &&
      wizard.x < block.x + block.width
    ) {
      isOnBlock = true;
      wizardBlockTop = block.y - wizard.height;
      break;
    }
  }
  const jumpTopY = wizardBlockTop - wizard.jumpPower * 10;
  let enemyY;
  if (!isOnBlock && wizard.y + wizard.height >= canvas.height - 22) {
    const minY = canvas.height - 80;
    const maxY = canvas.height - 35;
    enemyY = Math.random() * (maxY - minY) + minY;
  } else if (isOnBlock) {
    const minY = Math.max(20, jumpTopY - 40);
    const maxY = Math.max(60, jumpTopY + 20);
    enemyY = Math.random() * (maxY - minY) + minY;
  } else {
    const minY = canvas.height / 1.5;
    const maxY = canvas.height - 80;
    enemyY = Math.random() * (maxY - minY) + minY;
  }
  birds.push({
    x: cameraX + canvas.width + 80,
    y: enemyY,
    width: 90,
    height: 60,
    speed: 3.5 * difficulty,
    hit: false,
  });
}
function spawnHealthPickup() {
  const margin = 100;
  const minX = cameraX + canvas.width * 0.1 + margin;
  const maxX = cameraX + canvas.width * 0.9 - margin;
  const randomX = Math.random() * (maxX - minX) + minX;
  const y = canvas.height - 80;
  healthPickups.push({
    x: randomX,
    y: y,
    width: 70,
    height: 70,
    taken: false,
    img: heartImg,
  });
}
function rectsOverlap(r1, r2) {
  return !(
    r2.x > r1.x + r1.width ||
    r2.x + r2.width < r1.x ||
    r2.y > r1.y + r1.height ||
    r2.y + r2.height < r1.y
  );
}
function handleWizardBlockCollision() {
  wizard.onGround = false;
  let collidedWithBlock = false;
  for (let block of blocks) {
    const wizardRect = {
      x: wizard.x,
      y: wizard.y,
      width: wizard.width,
      height: wizard.height,
    };
    const blockRect = {
      x: block.x,
      y: block.y,
      width: block.width,
      height: block.height,
    };
    if (!block.isVertical) {
      const isAboveBlock =
        wizardRect.y + wizardRect.height <= blockRect.y + 10 &&
        wizardRect.y + wizardRect.height + wizard.vy >= blockRect.y &&
        wizardRect.x + wizardRect.width > blockRect.x &&
        wizardRect.x < blockRect.x + blockRect.width;
      if (isAboveBlock) {
        wizard.y = blockRect.y - wizard.height;
        wizard.vy = 0;
        wizard.onGround = true;
        collidedWithBlock = true;
      }
      const nearLeftSide =
        Math.abs(wizardRect.x + wizardRect.width - blockRect.x) < 5 &&
        wizardRect.y + wizardRect.height > blockRect.y &&
        wizardRect.y < blockRect.y + blockRect.height;
      if (nearLeftSide && !wizard.invincible) {
        currentHealth--;
        wizard.invincible = true;
        showBorderFlash();
        setTimeout(() => {
          wizard.invincible = false;
        }, 1000);
        if (currentHealth <= 0) {
          gameOver();
        }
        collidedWithBlock = true;
      }
    } else {
      if (rectsOverlap(wizardRect, blockRect) && !wizard.invincible) {
        currentHealth--;
        wizard.invincible = true;
        showBorderFlash();
        setTimeout(() => {
          wizard.invincible = false;
        }, 1000);
        if (currentHealth <= 0) {
          gameOver();
        }
        collidedWithBlock = true;
      }
    }
  }
  if (!collidedWithBlock) {
    if (wizard.y + wizard.height >= canvas.height - 20) {
      wizard.y = canvas.height - wizard.height - 20;
      wizard.vy = 0;
      wizard.onGround = true;
    }
  }
}
function handleWizardBirdCollision() {
  const wizardRect = {
    x: wizard.x,
    y: wizard.y,
    width: wizard.width,
    height: wizard.height,
  };
  for (const bird of birds) {
    if (bird.hit) continue;
    const birdRect = {
      x: bird.x,
      y: bird.y,
      width: bird.width,
      height: bird.height,
    };
    if (rectsOverlap(wizardRect, birdRect)) {
      bird.hit = true;
      currentHealth--;
      wizard.invincible = true;
      showBorderFlash();
      setTimeout(() => {
        wizard.invincible = false;
      }, 1000);
      if (currentHealth <= 0) {
        gameOver();
      }
    }
  }
}
function handleWizardHealthPickup() {
  const wizardRect = {
    x: wizard.x,
    y: wizard.y,
    width: wizard.width,
    height: wizard.height,
  };
  for (const pickup of healthPickups) {
    if (pickup.taken) continue;
    const pickupRect = {
      x: pickup.x,
      y: pickup.y,
      width: pickup.width,
      height: pickup.height,
    };
    if (rectsOverlap(wizardRect, pickupRect)) {
      pickup.taken = true;
      if (currentHealth < maxHealth) {
        currentHealth++;
      }
    }
  }
}
function showBorderFlash() {
  borderFlash = true;
  if (borderFlashTimeout) clearTimeout(borderFlashTimeout);
  borderFlashTimeout = setTimeout(() => {
    borderFlash = false;
  }, 1000);
}
function gameOver() {
  showLeaderboard(false);
  gameStarted = false;
  document.body.classList.remove("in-game");
  gameOverScreen.style.display = "flex";
   sendScore(currentUsername, score); 
  showBlurScreen(gameOverScreen, true);
  showTopBar(true);
  sendScore(currentUsername, score); 
  finalScoreText.textContent = "Your Score: " + score;
  gameOverPhoto.src = currentUserPhotoURL || "default-profile.png";
  gameOverUsername.textContent = currentUsername || "Bilinmiyor";
  canvas.style.display = "none";
  highScore = getHighScore(currentUsername);
  let isNewHighScore = false;
  if (score > highScore) {
    setHighScore(currentUsername, score);
    highScore = score;
    isNewHighScore = true;
  }
  if (isNewHighScore) {
    congratsText.textContent = LANGS[currentLang].newhigh;
    congratsText.style.display = "block";
  } else {
    congratsText.textContent = "";
    congratsText.style.display = "none";
  }
  highScoreDisplay.textContent = `${LANGS[currentLang].highscore}: ` + highScore;
}
function showTop5ToElement(elementId) {
  // Firebase-score.js dosyasında db olarak tanımlandıysa, onu kullan:
  const ref = window.db ? window.db.ref('scores') : firebase.database().ref('scores');
  const leaderboardDiv = document.getElementById(elementId);
  if (!leaderboardDiv) return;
  leaderboardDiv.innerHTML = `<div style="margin-bottom:7px;">${LANGS[currentLang]?.leaderboard || "🏅 Top 5 Scores"}</div><div style="color:#333;">Yükleniyor...</div>`;

  ref.orderByChild('score').limitToLast(5).once('value', function(snapshot) {
    const items = [];
    snapshot.forEach(function(child) {
      items.push(child.val());
    });
    // Skorları büyükten küçüğe sırala
    items.sort((a, b) => b.score - a.score);

    let html = `<div style="font-size:1.08em; margin-bottom:7px;">${LANGS[currentLang]?.leaderboard || "🏅 Top 5 Scores"}</div>`;
    if (items.length === 0) {
      html += `<div style="text-align:left; color:#333;">No scores yet.</div>`;
    } else {
      html += `<ol style="padding-left:18px;">`;
      items.forEach((item, i) => {
        html += `<li style="margin-bottom:5px;">
          <span style="color:#ff3535;">${item.username || "Anon"}</span>
          <span style="float:right; color:#222;">${item.score}</span>
        </li>`;
      });
      html += `</ol>`;
    }
    leaderboardDiv.innerHTML = html;
  });
}
function drawWizard() {
  const screenX = wizard.x - cameraX + canvas.width * 0.1;
  ctx.drawImage(walkImg, screenX, wizard.y, wizard.width, wizard.height);
}
function drawSpells() {
  spells.forEach((spell) => {
    const screenX = spell.x - cameraX + canvas.width * 0.1;
    ctx.drawImage(
      spellImg,
      screenX,
      spell.y,
      spell.width,
      spell.height
    );
  });
}
const orbImg = new Image();
orbImg.src = "balon.png";
function drawOrbs() {
  orbs.forEach((orb) => {
    const screenX = orb.x - cameraX + canvas.width * 0.1;
    ctx.drawImage(
      orbImg,
      screenX - orb.radius,
      orb.y - orb.radius,
      orb.radius * 5,
      orb.radius * 5
    );
  });
}
function drawBirds() {
  for (const bird of birds) {
    if (bird.hit) continue;
    const screenX = bird.x - cameraX + canvas.width * 0.1;
    ctx.drawImage(birdImg, screenX, bird.y, bird.width, bird.height);
  }
}
function drawHealthPickups() {
  for (const pickup of healthPickups) {
    if (pickup.taken) continue;
    const screenX = pickup.x - cameraX;
    ctx.drawImage(pickup.img, screenX, pickup.y, pickup.width, pickup.height);
  }
}
function drawBlocks() {
  blocks.forEach((block) => {
    const screenX = block.x - cameraX + canvas.width * 0.1;
    if (block.isVertical) {
      ctx.drawImage(
        dikeyImg,
        screenX,
        block.y,
        block.width,
        block.height
      );
    } else {
      ctx.drawImage(
        yataImg,
        screenX,
        block.y,
        block.width,
        block.height
      );
    }
  });
}
function drawScoreAndTimeModern() {
  const panelWidth = 270;
  const panelHeight = 95;
  const panelX = 24;
  const panelY = 22;
  const radius = 20;
  ctx.save();
  ctx.globalAlpha = 0.80;
  ctx.fillStyle = "rgba(255, 53, 53, 0.10)";
  ctx.beginPath();
  ctx.moveTo(panelX + radius, panelY);
  ctx.lineTo(panelX + panelWidth - radius, panelY);
  ctx.quadraticCurveTo(panelX + panelWidth, panelY, panelX + panelWidth, panelY + radius);
  ctx.lineTo(panelX + panelWidth, panelY + panelHeight - radius);
  ctx.quadraticCurveTo(panelX + panelWidth, panelY + panelHeight, panelX + panelWidth - radius, panelY + panelHeight);
  ctx.lineTo(panelX + radius, panelY + panelHeight);
  ctx.quadraticCurveTo(panelX, panelY + panelHeight, panelX, panelY + panelHeight - radius);
  ctx.lineTo(panelX, panelY + radius);
  ctx.quadraticCurveTo(panelX, panelY, panelX + radius, panelY);
  ctx.closePath();
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.shadowColor = "rgba(255,53,53,0.18)";
  ctx.shadowBlur = 18;
  ctx.font = "bold 21px 'Montserrat', Arial";
  ctx.fillStyle = "#ff3535";
  ctx.textAlign = "left";
  ctx.fillText(`🏆 ${LANGS[currentLang].score}:`, panelX + 28, panelY + 38);
  ctx.font = "bold 29px 'Montserrat', Arial";
  ctx.fillStyle = "#222";
  ctx.textAlign = "left";
  ctx.fillText(score, panelX + 160, panelY + 39);
  ctx.font = "bold 19px 'Montserrat', Arial";
  ctx.fillStyle = "#ff3535";
  ctx.fillText(`⏱ ${LANGS[currentLang].time}:`, panelX + 28, panelY + 80);
  ctx.font = "bold 23px 'Montserrat', Arial";
  ctx.fillStyle = "#222";
  ctx.fillText(elapsedTime.toFixed(1) + " s", panelX + 160, panelY + 82); // sn -> s
  ctx.restore();
}
function drawHealth() {
  const heartWidth = 60;
  const heartHeight = 60;
  const padding = 10;
  for (let i = 0; i < maxHealth; i++) {
    const x = canvas.width - (heartWidth + padding) * (maxHealth - i);
    const y = 10;
    ctx.globalAlpha =
      currentHealth >= i + 1 ? 1 : currentHealth > i ? 0.5 : 0.2;
    ctx.drawImage(heartImg, x, y, heartWidth, heartHeight);
  }
  ctx.globalAlpha = 1;
}
function drawBorderEffect() {
  if (!borderFlash) return;
  ctx.save();
  ctx.globalAlpha = 0.53;
  ctx.lineWidth = 60;
  ctx.strokeStyle = "#ff3535";
  ctx.beginPath();
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.stroke();
  ctx.restore();
}
let pointTimer = 0;
function update() {
  if (!gameStarted) return;
  const now = Date.now();
  const delta = now - lastTime;
  lastTime = now;
  elapsedTime += delta / 1000;
  updateDifficulty();
  wizard.speed = 2 * difficulty;
  const newBlockInterval = Math.max(900, 3000 / difficulty);
  if (Math.abs(newBlockInterval - blockSpawnInterval) > 1) {
    blockSpawnInterval = newBlockInterval;
    resetBlockInterval();
  }
  const newOrbInterval = Math.max(1500, 3500 / difficulty);
  if (Math.abs(newOrbInterval - orbSpawnInterval) > 1) {
    orbSpawnInterval = newOrbInterval;
    resetOrbInterval();
  }
  healthPickupTimer += delta / 1000;
  if (healthPickupTimer >= healthPickupInterval) {
    spawnHealthPickup();
    healthPickupTimer = 0;
  }
  pointTimer += delta / 1000;
  if (pointTimer >= 0.5) {
    score += 1;
    pointTimer = 0;
  }
  wizard.x += wizard.speed;
  const targetCameraX = wizard.x - canvas.width * 0.1 + 100;
  cameraX += (targetCameraX - cameraX) * 0.1;
  wizard.vy += wizard.gravity;
  wizard.y += wizard.vy;
  handleWizardBlockCollision();
  for (let i = birds.length - 1; i >= 0; i--) {
    const bird = birds[i];
    if (bird.hit) continue;
    bird.x -= bird.speed;
    if (bird.x - cameraX < -bird.width - 40) {
      birds.splice(i, 1);
    }
  }
  handleWizardBirdCollision();
  handleWizardHealthPickup();
  for (let i = spells.length - 1; i >= 0; i--) {
    const spell = spells[i];
    spell.x += spell.speed;
    for (let j = orbs.length - 1; j >= 0; j--) {
      const orb = orbs[j];
      const orbHitbox = {
        x: orb.x - orb.radius * 2.5,
        y: orb.y - orb.radius * 2.5,
        width: orb.radius * 5,
        height: orb.radius * 5,
      };
      const spellHitbox = {
        x: spell.x,
        y: spell.y,
        width: spell.width,
        height: spell.height
      };
      if (rectsOverlap(spellHitbox, orbHitbox)) {
        orbs.splice(j, 1);
        spells.splice(i, 1);
        score += 10;
        break;
      }
    }
    if (spell.x - cameraX > canvas.width + 100) {
      spells.splice(i, 1);
    }
  }
  for (let i = orbs.length - 1; i >= 0; i--) {
    const orb = orbs[i];
    orb.x -= 1.5 * difficulty;
    if (orb.x - cameraX < -100) {
      orbs.splice(i, 1);
    }
  }
  for (let i = blocks.length - 1; i >= 0; i--) {
    const block = blocks[i];
    if (block.x - cameraX < -block.width) {
      blocks.splice(i, 1);
    }
  }
  for (let i = healthPickups.length - 1; i >= 0; i--) {
    const pickup = healthPickups[i];
    if (pickup.taken || pickup.x - cameraX < -pickup.width - 40) {
      healthPickups.splice(i, 1);
    }
  }
}
function gameLoop() {
  if (!gameStarted) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  update();
  drawScoreAndTimeModern();
  drawWizard();
  drawSpells();
  drawOrbs();
  drawBlocks();
  drawBirds();
  drawHealthPickups();
  drawHealth();
  drawBorderEffect();
  requestAnimationFrame(gameLoop);
}
document.addEventListener("keydown", (e) => {
  if (!gameStarted) return;
  if ((e.code === "KeyW" || e.code === "ArrowUp") && wizard.onGround) {
    wizard.vy = -wizard.jumpPower;
    wizard.onGround = false;
    jumpSound.currentTime = 0; // Baştan başlatır
    jumpSound.play();
  }
});
const shootCooldown = 700;
let lastShootTime = 0;
function shootSpell() {
  const now = Date.now();
  if (now - lastShootTime < shootCooldown) return;
  lastShootTime = now;
  spells.push({
    x: wizard.x + wizard.width,
    y: wizard.y + wizard.height / 3,
    width: 120,
    height: 40,
    speed: 8,
  });
  spellSound.currentTime = 0; // Baştan başlatır
  spellSound.play();
}
document.addEventListener("keydown", (e) => {
  if (!gameStarted) return;
  if (e.code === "Space") shootSpell();
});
document.addEventListener("mousedown", (e) => {
  if (!gameStarted) return;
  if (e.button === 0) shootSpell();
});
window.addEventListener("DOMContentLoaded", function() {
  showBlurScreen(startScreen, true);
  showTopBar(true);
});
// How to Play ek ipuçları (dillere göre)
// OYUNUN DİĞER TÜM KODLARI BURADA KALSIN, SADECE AŞAĞIDAKİ HOWTO VE VİDEO KISMINI ENTEGRE EDİN

// === Howto Ekstra İpuçları (daha detaylı!) ===
const HOWTO_EXTRA = {
  tr: [
    "💡 Balonları büyüyle vurmak ekstra puan kazandırır!",
    "💡 Düşmanlara ve blokların yan kenarlarına çarpmamaya çalış!",
    "💡 Sağ üstteki kalpler canını gösterir. Can topladıkça canın artar!",
    "💡 Zıplamak için W veya Yukarı ok tuşunu kullan!",
    "💡 Büyü atmak için Space veya fare sol tık.",
    "💡 Bloklara üstten basarsan yere düşmezsin.",
    "💡 Düşmanlardan can kaybedersin, dikkatli ol!"
  ],
  en: [
    "💡 Shooting balloons gives extra points!",
    "💡 Avoid enemies and block sides!",
    "💡 Hearts at the top right show your health. Collect hearts for more!",
    "💡 Jump with W or Up arrow!",
    "💡 Shoot magic with Space or left mouse click.",
    "💡 Land on top of blocks to stay safe from falling.",
    "💡 Colliding with enemies makes you lose health!"
  ],
  ko: [
    "💡 풍선을 맞추면 추가 점수를 얻습니다!",
    "💡 적과 블록 가장자리에 부딪히지 마세요!",
    "💡 오른쪽 위의 하트가 체력을 보여줍니다. 하트를 모아 체력을 늘리세요!",
    "💡 점프하려면 W 또는 ↑를 누르세요!",
    "💡 스페이스 또는 마우스 왼쪽 버튼으로 마법을 쏘세요.",
    "💡 블록 위에 서 있으면 떨어지지 않습니다.",
    "💡 적과 부딪히면 체력이 줄어듭니다!"
  ],
  vi: [
    "💡 Bắn bóng để nhận thêm điểm.",
    "💡 Tránh va chạm với kẻ thù và cạnh khối!",
    "💡 Trái tim ở góc phải trên là máu của bạn. Nhặt tim để tăng máu!",
    "💡 Nhấn W hoặc mũi tên lên để nhảy!",
    "💡 Nhấn Space hoặc chuột trái để bắn phép.",
    "💡 Đứng trên khối để không bị rơi.",
    "💡 Va chạm với kẻ thù sẽ mất máu!"
  ],
  pl: [
    "💡 Strzelanie do balonów to dodatkowe punkty!",
    "💡 Unikaj kontaktu z wrogami i bokami bloków!",
    "💡 Serca w prawym górnym rogu pokazują Twoje życie. Zbieraj serca!",
    "💡 Skacz klawiszem W lub strzałką w górę!",
    "💡 Rzucaj magię spacją lub lewym przyciskiem myszy.",
    "💡 Stań na bloku, aby nie spaść.",
    "💡 Utrata zdrowia po kontakcie z wrogiem!"
  ],
  ru: [
    "💡 Уничтожайте шары для получения дополнительных очков!",
    "💡 Избегайте врагов и боков блоков!",
    "💡 Сердца в правом верхнем углу показывают ваше здоровье. Собирайте сердца!",
    "💡 Прыгайте с помощью W или стрелки вверх!",
    "💡 Магия — пробел или левая кнопка мыши.",
    "💡 Встаньте на блок, чтобы не упасть.",
    "💡 Потеряете жизнь при столкновении с врагом!"
  ],
  zh: [
    "💡 用魔法打气球可获得额外分数！",
    "💡 避免与敌人和方块边缘碰撞！",
    "💡 右上角的爱心显示你的生命值。收集爱心可增加生命！",
    "💡 按W或↑键跳跃！",
    "💡 按空格或鼠标左键释放魔法。",
    "💡 站在方块上不会掉下去。",
    "💡 被敌人碰到会失去生命！"
  ]
};

// DİL DEĞİŞTİKÇE HOWTO DETAYLARI VE VİDEO BUTONU GÜNCELLENSİN
const setLanguageOld = setLanguage;
setLanguage = function(lang) {
  setLanguageOld(lang);
  // Howto tips
  const tips = HOWTO_EXTRA[lang] || HOWTO_EXTRA["en"];
  for(let i=1;i<=7;i++) {
    const li = document.getElementById("howto-tip"+i);
    if(li) li.textContent = tips[i-1]||"";
  }
  // Ana ekrandaki video buton metni
  const videoBtnTextMain = document.getElementById("videoBtnTextMain");
  if (videoBtnTextMain) {
    videoBtnTextMain.textContent = (
      lang === "tr" ? "Oynanış Videosu" :
      lang === "en" ? "How to Play Video" :
      lang === "ko" ? "플레이 영상" :
      lang === "vi" ? "Video Hướng Dẫn" :
      lang === "pl" ? "Film instruktażowy" :
      lang === "ru" ? "Видео по игре" :
      lang === "zh" ? "玩法视频" : "How to Play Video"
    );
  }
  // Modal içindeki video buton metni
  const videoBtnText = document.getElementById("videoBtnText");
  if (videoBtnText) {
    videoBtnText.textContent = (
      lang === "tr" ? "Oynanış Videosu" :
      lang === "en" ? "How to Play Video" :
      lang === "ko" ? "플레이 영상" :
      lang === "vi" ? "Video Hướng Dẫn" :
      lang === "pl" ? "Film instruktażowy" :
      lang === "ru" ? "Видео по игре" :
      lang === "zh" ? "玩法视频" : "How to Play Video"
    );
  }
}

// === VİDEO MODAL ve BUTONLARI ===
const videoBtn    = document.getElementById("videoBtn");
const videoModal  = document.getElementById("videoModal");
const closeVideoModal = document.getElementById("closeVideoModal");
const howtoVideo  = document.getElementById("howtoVideo");

// Modal içindeki video butonu
if(videoBtn) {
  videoBtn.addEventListener("click", function() {
    videoModal.style.display = "flex";
    howtoVideo.currentTime = 0;
    setTimeout(() => { howtoVideo.play(); }, 150);
  });
}
if(closeVideoModal) {
  closeVideoModal.addEventListener("click", function() {
    videoModal.style.display = "none";
    howtoVideo.pause();
  });
}
if(videoModal) {
  videoModal.addEventListener("click", function(e) {
    if (e.target === videoModal) {
      videoModal.style.display = "none";
      howtoVideo.pause();
    }
  });
}

// Ana ekrandaki video butonu
const howtoVideoBtnMain = document.getElementById("howtoVideoBtnMain");
if(howtoVideoBtnMain) {
  howtoVideoBtnMain.addEventListener("click", function() {
    videoModal.style.display = "flex";
    howtoVideo.currentTime = 0;
    setTimeout(() => { howtoVideo.play(); }, 150);
  });
}
// --- SES/MÜZİK DOSYALARI ---
const bgMusic = new Audio("travis.mp3");
bgMusic.loop = true;

// --- BAŞLANGIÇ AYARLARI (localStorage'dan oku veya varsayılan) ---
let effectVolume = Number(localStorage.getItem("effectVolume") || 1);
let musicVolume = Number(localStorage.getItem("musicVolume") || 1);
let musicEnabled = localStorage.getItem("musicEnabled") !== "false";

// --- SLIDER VE BUTONLARI SEÇ ---
const effectSlider = document.getElementById("effectVolumeSlider");
const musicSlider = document.getElementById("musicVolumeSlider");
const musicBtn = document.getElementById("musicToggleBtn");
const musicIcon = document.getElementById("musicToggleIcon");

const effectSliderPause = document.getElementById("effectVolumeSliderPause");
const musicSliderPause = document.getElementById("musicVolumeSliderPause");
const musicBtnPause = document.getElementById("musicToggleBtnPause");
const musicIconPause = document.getElementById("musicToggleIconPause");

// --- VOLUME & MUTE GÜNCELLE ---
function updateAudioUI() {
  if (effectSlider) effectSlider.value = effectVolume;
  if (musicSlider) musicSlider.value = musicVolume;
  if (effectSliderPause) effectSliderPause.value = effectVolume;
  if (musicSliderPause) musicSliderPause.value = musicVolume;
  if (musicIcon) {
    musicIcon.textContent = musicEnabled ? "✅" : "❌";
    musicBtn.classList.toggle("active", musicEnabled);
    musicBtn.classList.toggle("muted", !musicEnabled);
  }
  if (musicIconPause) {
    musicIconPause.textContent = musicEnabled ? "✅" : "❌";
    musicBtnPause.classList.toggle("active", musicEnabled);
    musicBtnPause.classList.toggle("muted", !musicEnabled);
  }
  bgMusic.volume = musicEnabled ? musicVolume : 0;
}
updateAudioUI();

function setEffectVolume(val) {
  effectVolume = Number(val);
  localStorage.setItem("effectVolume", effectVolume);
  updateAudioUI();
}
function setMusicVolume(val) {
  musicVolume = Number(val);
  localStorage.setItem("musicVolume", musicVolume);
  bgMusic.volume = musicEnabled ? musicVolume : 0;
  updateAudioUI();
}
function setMusicEnabled(flag) {
  musicEnabled = flag;
  localStorage.setItem("musicEnabled", musicEnabled);
  bgMusic.volume = musicEnabled ? musicVolume : 0;
  updateAudioUI();
  if (musicEnabled && bgMusic.paused) {
    bgMusic.play();
  }
  if (!musicEnabled && !bgMusic.paused) {
    bgMusic.pause();
  }
}

// Ana menü sliderlarına event bağla
if (effectSlider) effectSlider.oninput = e => {
  setEffectVolume(e.target.value);
  updateAudioUI();
};
if (musicSlider) musicSlider.oninput = e => {
  setMusicVolume(e.target.value);
  updateAudioUI();
};
if (musicBtn) musicBtn.onclick = () => {
  setMusicEnabled(!musicEnabled);
  updateAudioUI();
};

// Pause paneli sliderlarına event bağla
if (effectSliderPause) effectSliderPause.oninput = e => {
  setEffectVolume(e.target.value);
  updateAudioUI();
};
if (musicSliderPause) musicSliderPause.oninput = e => {
  setMusicVolume(e.target.value);
  updateAudioUI();
};
if (musicBtnPause) musicBtnPause.onclick = () => {
  setMusicEnabled(!musicEnabled);
  updateAudioUI();
};

// --- Zıplama ve büyü sesini volume ile çal ---
function playJumpSound() {
  jumpSound.volume = effectVolume;
  jumpSound.currentTime = 0;
  jumpSound.play();
}
function playSpellSound() {
  spellSound.volume = effectVolume;
  spellSound.currentTime = 0;
  spellSound.play();
}

// Zıplama fonksiyonunu güncelle:
document.addEventListener("keydown", (e) => {
  if (!gameStarted) return;
  if ((e.code === "KeyW" || e.code === "ArrowUp") && wizard.onGround) {
    wizard.vy = -wizard.jumpPower;
    wizard.onGround = false;
    playJumpSound();
  }
});

// Büyü atma fonksiyonunu güncelle:
function shootSpell() {
  const now = Date.now();
  if (now - lastShootTime < shootCooldown) return;
  lastShootTime = now;
  spells.push({
    x: wizard.x + wizard.width,
    y: wizard.y + wizard.height / 2 - 40,
    width: 120,
    height: 40,
    speed: 8,
  });
  playSpellSound();
}

// Oyun başlarken müziği başlat:
function startGameMusic() {
  if (musicEnabled) {
    bgMusic.volume = musicVolume;
    bgMusic.play();
  }
}
function stopGameMusic() {
  bgMusic.pause();
  bgMusic.currentTime = 0;
}
startButton.addEventListener("click", () => {
  startGameMusic();
});
restartButton.addEventListener("click", () => {
  stopGameMusic();
});

// --- PAUSE PANELİ KONTROLÜ ---
const pauseBtn = document.getElementById("pauseBtn");
const pausePanel = document.getElementById("pausePanel");
const resumeBtn = document.getElementById("resumeBtn");

pauseBtn && pauseBtn.addEventListener("click", () => {
  gameStarted = false;
  pausePanel.style.display = "flex";
});
resumeBtn && resumeBtn.addEventListener("click", () => {
  pausePanel.style.display = "none";
  gameStarted = true;
  requestAnimationFrame(gameLoop);
});

// ESC tuşu ile pause aç/kapat
document.addEventListener("keydown", (e) => {
  if (e.code === "Escape" && gameStarted) {
    gameStarted = false;
    pausePanel.style.display = "flex";
  }
});

// Oyun başladığında pause butonu görünür olsun:
function showPauseButton(show) {
  if (pauseBtn) pauseBtn.style.display = show ? "block" : "none";
}
startButton.addEventListener("click", () => {
  showPauseButton(true);
});
restartButton.addEventListener("click", () => {
  showPauseButton(false);
  pausePanel.style.display = "none";
});
// ...oyunun kalan script.js kodları aynı şekilde devam edecek...
// FEEDBACK POPUP AÇMA/KAPAMA VE FIREBASE'E GÖNDERME

// Elementleri seç
const feedbackFab = document.getElementById("feedback-fab");
const feedbackPopup = document.getElementById("feedback-popup");
const feedbackSendBtn = document.getElementById("feedback-send");
const feedbackTextarea = document.getElementById("feedback-text");
const feedbackUsernameInput = document.getElementById("feedback-username");

if (feedbackFab) {
  feedbackFab.addEventListener("click", function() {
    if (feedbackPopup.style.display === "flex" || feedbackPopup.style.display === "block") {
      feedbackPopup.style.display = "none";
    } else {
      feedbackPopup.style.display = "flex";
      feedbackUsernameInput && feedbackUsernameInput.focus();
    }
  });
}

// Dışarı tıklayınca kapansın
document.addEventListener("mousedown", function(e) {
  if (
    feedbackPopup.style.display !== "none" &&
    !feedbackPopup.contains(e.target) &&
    !feedbackFab.contains(e.target)
  ) {
    feedbackPopup.style.display = "none";
  }
});

if (feedbackSendBtn) {
  feedbackSendBtn.addEventListener("click", function() {
    const text = feedbackTextarea.value.trim();
    const username = feedbackUsernameInput?.value.trim() || "Anonim";
    if (!text) {
      alert("Please write some feedback.");
      return;
    }
    const score = (window.score || 0);
    const data = {
      text,
      username,
      score,
      date: new Date().toISOString()
    };
    const ref = window.db ? window.db.ref('feedbacks') : firebase.database().ref('feedbacks');
    ref.push(data, function(error) {
      if (error) {
        alert("Feedback gönderilemedi: " + error.message);
      } else {
        alert("Teşekkürler! Geri bildiriminiz alındı.");
        feedbackTextarea.value = "";
        if(feedbackUsernameInput) feedbackUsernameInput.value = "";
        feedbackPopup.style.display = "none";
      }
    });
  });
}
