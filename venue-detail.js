document.addEventListener("DOMContentLoaded", () => {
  // 1. Follow 버튼 클릭 시 토글 + Followers 수 (+1 / 원복) 제어
  const followBtn = document.getElementById("followBtn");
  const followersCount = document.getElementById("followersCount");

  if (followBtn && followersCount) {
    const baseCount = parseInt(followersCount.getAttribute("data-count"), 10);

    followBtn.addEventListener("click", () => {
      followBtn.classList.toggle("following");

      if (followBtn.classList.contains("following")) {
        followBtn.textContent = "following";
        // 팔로우 시 +1 처리 (1,235)
        followersCount.textContent = (baseCount + 1).toLocaleString();
      } else {
        followBtn.textContent = "follow";
        // 팔로우 취소 시 원래 숫자로 복원 (1,234)
        followersCount.textContent = baseCount.toLocaleString();
      }
    });
  }

  // 2. 하단 이벤트 카드 클릭 시 상세페이지 이동
  const eventCards = document.querySelectorAll(".event-card");
  eventCards.forEach((card) => {
    card.style.cursor = "pointer";
    card.addEventListener("click", (e) => {
      if (e.target.closest(".like-btn")) return;
      const detailUrl = card.getAttribute("data-detail");
      if (detailUrl) window.location.href = detailUrl;
    });
  });

  // 3. 하단 이벤트 카드 하트 저장 버튼 토글
  const likeBtns = document.querySelectorAll(".like-btn");
  likeBtns.forEach((lBtn) => {
    const countSpan = lBtn.querySelector(".like-count");
    const baseCount = parseInt(countSpan.getAttribute("data-count"), 10);

    lBtn.addEventListener("click", () => {
      lBtn.classList.toggle("liked");
      if (lBtn.classList.contains("liked")) {
        countSpan.textContent = (baseCount + 1).toLocaleString();
      } else {
        countSpan.textContent = baseCount.toLocaleString();
      }
    });
  });
});