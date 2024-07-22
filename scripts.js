function getSetGoal() {
  let goalInput = document.getElementById("setGoal");
  let goal = parseInt(goalInput.value);
  return isNaN(goal) ? 10 : goal; // Varsayılan olarak 10 set
}

function increaseScore(playerId, setId, opponentId) {
  let scoreElement = document.getElementById(playerId);
  let score = parseInt(scoreElement.innerText);
  scoreElement.innerText = score + 1;

  let setGoal = getSetGoal();

  if (score + 1 === setGoal) {
    // Kullanıcı tarafından belirlenen set kazanma koşulu
    let setElement = document.getElementById(setId);
    let sets = parseInt(setElement.innerText.split(": ")[1]);
    setElement.innerText = `Kazandığı Setler: ${sets + 1}`;
    startConfetti();
    setTimeout(stopConfetti, 3000);
    resetScores();
  }
}

function decreaseScore(playerId) {
  let scoreElement = document.getElementById(playerId);
  let score = parseInt(scoreElement.innerText);
  if (score > 0) {
    scoreElement.innerText = score - 1;
  }
}

function resetScores() {
  document.getElementById("score1").innerText = 0;
  document.getElementById("score2").innerText = 0;
}

function resetGame() {
  resetScores();
  document.getElementById("sets1").innerText = "Kazandığı Setler: 0";
  document.getElementById("sets2").innerText = "Kazandığı Setler: 0";
}

// Konfeti animasyonu
const confetti = document.getElementById("confetti");
const confettiCtx = confetti.getContext("2d");
const confettiPieces = [];

function ConfettiPiece() {
  this.x = Math.random() * confetti.width;
  this.y = Math.random() * confetti.height - confetti.height;
  this.size = Math.random() * 10 + 10;
  this.speed = Math.random() * 3 + 2;
  this.angle = Math.random() * 360;
  this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
}

function updateConfetti() {
  confettiCtx.clearRect(0, 0, confetti.width, confetti.height);
  confettiPieces.forEach((piece) => {
    piece.y += piece.speed;
    piece.angle += piece.speed;
    if (piece.y > confetti.height) {
      piece.y = -piece.size;
    }
    confettiCtx.fillStyle = piece.color;
    confettiCtx.beginPath();
    confettiCtx.arc(piece.x, piece.y, piece.size, 0, 2 * Math.PI);
    confettiCtx.fill();
  });
  requestAnimationFrame(updateConfetti);
}

function startConfetti() {
  confetti.width = window.innerWidth;
  confetti.height = window.innerHeight;
  for (let i = 0; i < 100; i++) {
    confettiPieces.push(new ConfettiPiece());
  }
  updateConfetti();
}

function stopConfetti() {
  confettiPieces.length = 0;
  confettiCtx.clearRect(0, 0, confetti.width, confetti.height);
}
