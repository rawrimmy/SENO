document.addEventListener("DOMContentLoaded", () => {
  // 1. 하트 버튼 클릭 (저장 기능 & 숫자 +1 조절)
  const likeBtn = document.querySelector(".like-btn");
  if (likeBtn) {
    const countSpan = likeBtn.querySelector(".like-count");
    const baseCount = parseInt(countSpan.getAttribute("data-count"), 10);

    likeBtn.addEventListener("click", () => {
      likeBtn.classList.toggle("liked");
      
      if (likeBtn.classList.contains("liked")) {
        countSpan.textContent = (baseCount + 1).toLocaleString();
      } else {
        countSpan.textContent = baseCount.toLocaleString();
      }
    });
  }

  // 2. Follow 버튼 클릭 (토글 & 보라색 변환)
  const followBtn = document.getElementById("followBtn");
  if (followBtn) {
    followBtn.addEventListener("click", () => {
      followBtn.classList.toggle("following");
      
      if (followBtn.classList.contains("following")) {
        followBtn.textContent = "following";
      } else {
        followBtn.textContent = "follow";
      }
    });
  }

  // 3. Line Up 미리듣기 (Preview) 기능 - 이탈 없는 인페이지 플레이어 제어
  const previewBtns = document.querySelectorAll(".btn-preview");
  const audioPlayerBar = document.getElementById("audioPlayerBar");
  const globalAudioPlayer = document.getElementById("globalAudioPlayer");
  const closePlayerBtn = document.getElementById("closePlayerBtn");

  previewBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const audioSrc = btn.dataset.audio;
      
      if (audioSrc && globalAudioPlayer) {
        globalAudioPlayer.src = audioSrc;
        globalAudioPlayer.play();
        audioPlayerBar.classList.add("active");
      }
    });
  });

  if (closePlayerBtn) {
    closePlayerBtn.addEventListener("click", () => {
      globalAudioPlayer.pause();
      audioPlayerBar.classList.remove("active");
    });
  }
});

