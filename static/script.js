const repCounter = document.querySelector("#repNumber");
const rebirthCounter = document.querySelector("#rebirthNumber");
const rankText = document.querySelector("#rank");
const forearm = document.querySelector("#forearm");
const repClick = document.querySelector("#clicking");
const resetProgress = document.querySelector("#reset");
const rebirth = document.querySelector("#rebirth");
const floatingContainer = document.querySelector("#floaters");

let reps = Number(localStorage.getItem("count")) || 0;
let rebirths = Number(localStorage.getItem("rebirths")) || 0;

repCounter.textContent = reps;
rebirthCounter.textContent = rebirths;

const ranks = [
  { name: "Mortal", min: 0 },
  { name: "Elite", min: 1 },
  { name: "Titan", min: 3 },
  { name: "God", min: 5 },
  { name: "Angel", min: 8 },
  { name: "Archangel", min: 12 },
  { name: "Seraph", min: 20 }
];

function updateRank() {
  let current = ranks[0];
  for (let r of ranks) {
    if (rebirths >= r.min) current = r;
  }
  rankText.textContent = current.name;
  forearm.style.setProperty("--curlPower", `${-75 - Math.min(rebirths * 2.5, 35)}deg`);
}

function floatText() {
  const span = document.createElement("span");
  span.className = "floater";
  span.textContent = "+1";
  span.style.left = "50%";
  span.style.top = "60%";
  floatingContainer.appendChild(span);
  setTimeout(() => span.remove(), 800);
}

repClick.addEventListener("click", () => {
  reps++;
  repCounter.textContent = reps;
  localStorage.setItem("count", reps);

  forearm.classList.remove("curl");
  void forearm.offsetWidth;
  forearm.classList.add("curl");

  floatText();

  if (reps >= 10) rebirth.classList.remove("hidden");
});

rebirth.addEventListener("click", () => {
  if (reps >= 10) {
    reps = 0;
    rebirths++;
    repCounter.textContent = reps;
    rebirthCounter.textContent = rebirths;
    localStorage.setItem("count", reps);
    localStorage.setItem("rebirths", rebirths);
    rebirth.classList.add("hidden");
    updateRank();
  }
});

resetProgress.addEventListener("click", () => {
  reps = 0;
  rebirths = 0;
  repCounter.textContent = reps;
  rebirthCounter.textContent = rebirths;
  localStorage.setItem("count", reps);
  localStorage.setItem("rebirths", rebirths);
  rebirth.classList.add("hidden");
  updateRank();
});

updateRank();
