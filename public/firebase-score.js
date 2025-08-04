// Firebase Global Top 5 Leaderboard Fonksiyonları

const firebaseConfig = {
  apiKey: "AIzaSyDZZuN9TdeACRgilNUPJCdssLxET8OT22U",
  authDomain: "wizardofanoma.firebaseapp.com",
  databaseURL: "https://wizardofanoma-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "wizardofanoma",
  storageBucket: "wizardofanoma.firebasestorage.app",
  messagingSenderId: "3929821894",
  appId: "1:3929821894:web:f359c3de54e1c640273dc7",
  measurementId: "G-1L2FTQ1YK9"
};

// Firebase başlat
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

/**
 * Skoru kaydet (gönder). Yalnızca daha yüksekse günceller!
 * @param {string} username  // Kullanıcı adı
 * @param {number} score     // Puan
 */
function sendScore(username, score) {
  if (!username || !score) return;
  db.ref('scores/' + username).transaction(currentData => {
    if (currentData === null || score > currentData.score) {
      return { username, score };
    } else {
      return; // Mevcut skor daha yüksek, güncelleme!
    }
  });
}

/**
 * Top 5 skoru çek ve callback'e ver
 * @param {function} callback  // Skorlar geldikten sonra çalışacak fonksiyon
 */
function fetchTop5(callback) {
  db.ref('scores').orderByChild('score').limitToLast(5).once('value', snap => {
    const arr = [];
    snap.forEach(child => arr.push(child.val()));
    arr.sort((a, b) => b.score - a.score);
    callback(arr);
  });
}

/**
 * Top 5'i bir HTML elementine yazdır
 * @param {string} elementId
 */
function showTop5ToElement(elementId) {
  fetchTop5(arr => {
    const el = document.getElementById(elementId);
    if (!el) return;
    el.innerHTML = `<div style="font-size:1.1em;color:#ff3535;font-weight:bold;margin-bottom:6px;">🏅 Top 5</div>` +
      arr.map((item, i) =>
        `<div style="margin-bottom:3px;"><b>#${i+1}</b> @${item.username}: <span style="color:#222">${item.score}</span></div>`
      ).join("");
  });
}