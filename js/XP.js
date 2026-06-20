function levelUpEffect(level) {
  if (typeof celebrate === "function") {
    celebrate(`🎉 LEVEL UP! You are now Level ${level}`);
  }
}

let level = parseInt(localStorage.getItem("level")) || 1;
let xp = parseInt(localStorage.getItem("xp")) || 0;

function xpNeeded() {
  return Math.floor(100 * Math.pow(level, 1.2));
}

function updateUI() {
  if (!document.getElementById("level")) return;

  document.getElementById("level").innerText = level;
  document.getElementById("xp").innerText = xp;
  document.getElementById("xpNeeded").innerText = xpNeeded();

  let percent = (xp / xpNeeded()) * 100;
  document.getElementById("xpBar").style.width = percent + "%";
}

function addXP(amount, reason = "") {
  xp += amount;

  if (xp >= xpNeeded()) {
    xp -= xpNeeded();
    level++;
    alert("🔥 Level Up! Level " + level);
    celebrate(`🎉 LEVEL UP! You are now Level ${level}`);
  }

  localStorage.setItem("level", level);
  localStorage.setItem("xp", xp);

  updateUI();
}

updateUI();