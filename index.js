let codeBox = document.querySelector("#code-box");
let textBox = document.querySelector("#prompt-text");
let selectFormat = document.querySelector("#code-format");
let selectDifficulty = document.querySelector("#difficulty");
let formatText = document.querySelector("#color-code>p:first-child");
let optContainer = document.querySelector("#color-opts > div.container");
let volatileOpts = document.querySelectorAll(".opts:nth-child(n+4)");
let correctOpt;
let rightHex;
let rightRgb;
let optNo = 3;

function getRandom(mini, maxi) {
  return Math.floor(Math.random() * (maxi - mini)) + mini;
}

function randomHex() {
  let digits = "0123456789ABCDEF";
  let code = "#";
  for (let i = 0; i < 6; i++) {
    let ind = getRandom(0, 16);
    code += digits[ind];
  }
  return code;
}

//showing and hiding the last 3 options based on difficulty
function toggleVolatileOpts() {
  if (window.getComputedStyle(volatileOpts[0]).display != "none") {
    volatileOpts.forEach((ele) => (ele.style.display = "none"));
    optNo = 3;
  } else {
    volatileOpts.forEach((ele) => (ele.style.display = "block"));
    optNo = 6;
  }
  newTest();
}

//loading a new test
function newTest() {
  textBox.innerText = "You Can Can.";
  optContainer.style.backgroundColor = "rgb(48, 43, 43)";

  let codes = [];
  for (let i = 0; i < optNo; i++) {
    codes.push(randomHex());
  }

  let boxes = document.querySelectorAll(".opts");
  for (let i = 0; i < optNo; i++) {
    boxes[i].style.backgroundColor = codes[i];
  }
  let rand = getRandom(0, optNo);
  correctOpt = document.querySelector(`#opts-${rand}`);

  rightHex = codes[rand].slice(1);
  rightRgb = correctOpt.style.backgroundColor.slice(4, -1);
  codeFormatting();
}

//writing the right code and code heading
function codeFormatting() {
  if (selectFormat.value == 0) {
    codeBox.innerText = rightRgb;
    formatText.innerText = "RGB";
  } else {
    codeBox.innerText = rightHex;
    formatText.innerText = "HEX";
  }
}

//checking correctness of clicked options
document.querySelector("#color-opts>div").addEventListener("click", (event) => {
  let clickedOpt = event.target;
  if (clickedOpt.className == "opts") {
    if (clickedOpt == correctOpt) {
      optContainer.style.backgroundColor = "rgba(0, 255, 0, 0.5)";
      textBox.innerText = "You Got It Right!!";
    } else {
      optContainer.style.backgroundColor = "rgba(255, 0, 0, .5)";
      textBox.innerText = "Wrong Guess :3";
    }
  }
});

selectDifficulty.addEventListener("change", toggleVolatileOpts);
selectFormat.addEventListener("change", codeFormatting);
document.querySelector("#color-opts .btn").addEventListener("click", newTest);
window.addEventListener("load", newTest);
