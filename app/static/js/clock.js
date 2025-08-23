Notification.requestPermission().then((result) => {});

const clock = document.getElementById("clock");
const hand = document.getElementById("hand");

let isDragging = false;
let currentAngle = 0;
let animationFrameId = null;

function getAngle(x, y, centerX, centerY) {
  const dx = x - centerX;
  const dy = y - centerY;
  let angle = Math.atan2(dy, dx) * (180 / Math.PI);
  angle = angle + 90;
  if (angle < 0) angle += 360;
  return angle;
}

function setHandAngle(angle) {
  currentAngle = angle;
  hand.style.transform = `rotate(${angle}deg)`;
}

function animateCountdown() {
  if (currentAngle <= 0) {
    cancelAnimationFrame(animationFrameId);
    var mailNotification = new Notification("Homepage pomodoro", {
      body: "Time's up!",
      icon: "/static/alarm_time_up.svg",
    });
    return;
  }
  currentAngle -= 0.00167;
  //currentAngle -= 1;
  if (currentAngle < 0) currentAngle = 0;
  setHandAngle(currentAngle);
  animationFrameId = requestAnimationFrame(animateCountdown);
}

clock.addEventListener("mousedown", (e) => {
  isDragging = true;
  cancelAnimationFrame(animationFrameId);
  const rect = clock.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const angle = getAngle(e.clientX, e.clientY, centerX, centerY);
  setHandAngle(angle);
});

window.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  const rect = clock.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const angle = getAngle(e.clientX, e.clientY, centerX, centerY);
  setHandAngle(angle);
});

window.addEventListener("mouseup", () => {
  if (isDragging) {
    isDragging = false;
    animateCountdown();
  }
});
