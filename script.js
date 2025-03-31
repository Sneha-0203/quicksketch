const canvas = document.getElementById("canvas");
const body = document.querySelector('body');
const ctx = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let theColor = '';
let lineW = 5;
let prevX = null;
let prevY = null;
let draw = false;

body.style.backgroundColor = "#FFFFFF";

const theInput = document.getElementById("favcolor");
theInput.addEventListener("input", function() {
  theColor = theInput.value;
  body.style.backgroundColor = theColor;
}, false);

document.getElementById("ageInputId").oninput = function() {
  draw = null;
  lineW = document.getElementById("ageInputId").value;
  document.getElementById("ageOutputId").innerHTML = lineW;
  ctx.lineWidth = lineW;
};  

const clrs = Array.from(document.querySelectorAll(".clr"));
clrs.forEach(clr => {
  clr.addEventListener("click", () => {
    ctx.strokeStyle = clr.dataset.clr;
  });
});

const clearBtn = document.querySelector(".clear");
clearBtn.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

const saveBtn = document.querySelector(".save");
saveBtn.addEventListener("click", () => {
  const data = canvas.toDataURL("image/png");
  const a = document.createElement("a");
  a.href = data;
  a.download = "sketch.png";
  a.click();
});

// Handle both mouse and touch events for drawing
canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("touchstart", startDraw);

function startDraw(e) {
  draw = true;
  setPosition(e);
}

canvas.addEventListener("mousemove", drawLine);
canvas.addEventListener("touchmove", drawLine);

function drawLine(e) {
  if (!draw) return;

  e.preventDefault(); // Prevent scrolling on touch devices
  const currentX = e.clientX || e.touches[0].clientX;
  const currentY = e.clientY || e.touches[0].clientY;

  ctx.beginPath();
  ctx.moveTo(prevX, prevY);
  ctx.lineTo(currentX, currentY);
  ctx.stroke();

  setPosition(e);
}

canvas.addEventListener("mouseup", () => draw = false);
canvas.addEventListener("touchend", () => draw = false);

function setPosition(e) {
  prevX = e.clientX || e.touches[0].clientX;
  prevY = e.clientY || e.touches[0].clientY;
}
