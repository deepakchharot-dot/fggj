const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");
const musicText = document.getElementById("musicText");

function setMusicUI(playing){
  musicBtn.innerHTML = playing
    ? "⏸️ <span id=\"musicText\">Pause Rose Garden</span>"
    : "🎵 <span id=\"musicText\">Play Rose Garden</span>";
  musicBtn.setAttribute("aria-label", playing ? "Pause music" : "Play music");
}

async function playMusic(){
  try {
    await music.play();
    setMusicUI(true);
    return true;
  } catch(e) {
    // Browsers can block audible autoplay until the user interacts with the page.
    setMusicUI(false);
    return false;
  }
}

musicBtn.addEventListener("click", async () => {
  if (music.paused) {
    const played = await playMusic();
    if (!played) {
      alert("Music autoplay browser ne block kiya hai. Play button dobara press karo.");
    }
  } else {
    music.pause();
    setMusicUI(false);
  }
});

// Music is intentionally NOT started on page load.
// It starts automatically when the birthday countdown reaches zero.

// Countdown to the next 25 August.
function nextBirthday(){
  const now = new Date();
  let year = now.getFullYear();
  let target = new Date(year, 7, 25, 0, 0, 0);
  if (target <= now) target = new Date(year + 1, 7, 25, 0, 0, 0);
  return target;
}

let target = nextBirthday();
let birthdayUnlocked = false;

async function tick(){
  const diff = target - new Date();

  if(diff <= 0){
    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";
    document.getElementById("birthdayMessage").textContent = "Happy Birthdayyyyy! 🎂❤️ Music starts now... 🌹";

    if (!birthdayUnlocked) {
      birthdayUnlocked = true;
      await playMusic();
    }
    return;
  }

  const s = Math.floor(diff/1000);
  document.getElementById("days").textContent = String(Math.floor(s/86400)).padStart(2,"0");
  document.getElementById("hours").textContent = String(Math.floor(s%86400/3600)).padStart(2,"0");
  document.getElementById("minutes").textContent = String(Math.floor(s%3600/60)).padStart(2,"0");
  document.getElementById("seconds").textContent = String(s%60).padStart(2,"0");
}

tick();
setInterval(tick,1000);

// Lightbox
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
document.querySelectorAll(".memory img").forEach(img=>{
  img.addEventListener("click", ()=>{
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add("open");
  });
});
document.getElementById("closeLightbox").addEventListener("click",()=>lightbox.classList.remove("open"));
lightbox.addEventListener("click",e=>{ if(e.target===lightbox) lightbox.classList.remove("open"); });

// Floating hearts
const hearts = document.querySelector(".hearts");
setInterval(()=>{
  const h=document.createElement("span");
  h.className="heart";
  h.textContent=["❤️","🌹","💗","✨"][Math.floor(Math.random()*4)];
  h.style.left=Math.random()*100+"%";
  h.style.fontSize=(10+Math.random()*16)+"px";
  h.style.animationDuration=(7+Math.random()*7)+"s";
  hearts.appendChild(h);
  setTimeout(()=>h.remove(),15000);
},900);




/* Music controls — no countdown */
document.addEventListener("DOMContentLoaded", () => {
  const song = document.getElementById("birthdaySong");
  const controls = document.getElementById("musicControls");
  const toggle = document.getElementById("musicToggle");

  if (!song || !controls || !toggle) return;

  controls.style.display = "block";

  toggle.addEventListener("click", () => {
    if (song.paused) {
      song.play().then(() => {
        toggle.textContent = "⏸ Pause";
      }).catch(() => {});
    } else {
      song.pause();
      toggle.textContent = "▶ Play";
    }
  });

  song.addEventListener("play", () => toggle.textContent = "⏸ Pause");
  song.addEventListener("pause", () => toggle.textContent = "▶ Play");
});
