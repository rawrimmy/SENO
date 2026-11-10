document.addEventListener("DOMContentLoaded", () => {
  // 1. 날짜 태그 및 달력 팝업 제어
  const dateTagBtn = document.getElementById("dateTagBtn");
  const calendarPopup = document.getElementById("calendarPopup");
  const datePicker = document.getElementById("datePicker");
  const selectedDateText = document.getElementById("selectedDateText");

  dateTagBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    calendarPopup.classList.toggle("show");
  });

  datePicker.addEventListener("change", (e) => {
    if (e.target.value) {
      selectedDateText.textContent = e.target.value;
      calendarPopup.classList.remove("show");
    }
  });

  document.addEventListener("click", (e) => {
    if (!calendarPopup.contains(e.target) && !dateTagBtn.contains(e.target)) {
      calendarPopup.classList.remove("show");
    }
  });

  // 2. 타입 필터 (Party & DJ Set / Festival)
  const typeBtns = document.querySelectorAll(".type-btn");
  const genreFilterGroup = document.getElementById("genreFilterGroup");

  typeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const activeBtns = document.querySelectorAll(".type-btn.active");

      // 버튼 2개 중 최소 1개는 켜져 있어야 하므로 방어 코드 유지
      if (btn.classList.contains("active") && activeBtns.length === 1) {
        return; 
      }

      btn.classList.toggle("active");

      // Festival 버튼 상태에 따라 장르 태그 6개 제어
      const festivalBtn = document.querySelector(".type-btn.festival");
      if (!festivalBtn.classList.contains("active")) {
        genreFilterGroup.classList.remove("hide"); // Festival을 끄면 장르 태그 노출
      } else {
        genreFilterGroup.classList.add("hide");    // Festival이 켜져있으면 장르 태그 숨김
      }

      filterCards();
    });
  });

  // 3. 장르 태그 토글 제어
  const genreBtns = document.querySelectorAll(".genre-btn");
  genreBtns.forEach((gBtn) => {
    gBtn.addEventListener("click", () => {
      gBtn.classList.toggle("active");
      filterCards();
    });
  });

  // 4. 하트 누르기 (핑크색으로 변하기 + 숫자 1,234 -> 1,235로 +1 증가)
  const likeBtns = document.querySelectorAll(".like-btn");
  likeBtns.forEach((lBtn) => {
    const countSpan = lBtn.querySelector(".like-count");
    const baseCount = parseInt(countSpan.getAttribute("data-count"), 10);

    lBtn.addEventListener("click", () => {
      lBtn.classList.toggle("liked");
      
      if (lBtn.classList.contains("liked")) {
        countSpan.textContent = (baseCount + 1).toLocaleString(); // 1,235로 변경
      } else {
        countSpan.textContent = baseCount.toLocaleString(); // 원복
      }
    });
  });

  // 5. 카드 필터링 종합 처리 함수
  function filterCards() {
    const activeTypes = Array.from(document.querySelectorAll(".type-btn.active")).map(b => b.dataset.type);
    const festivalActive = activeTypes.includes("festival");
    const activeGenres = Array.from(document.querySelectorAll(".genre-btn.active")).map(b => b.dataset.genre);

    const cards = document.querySelectorAll(".event-card");

    cards.forEach((card) => {
      const cardType = card.dataset.type;
      const cardGenres = card.dataset.genres ? card.dataset.genres.split(",") : [];

      // 타입 일치 여부
      const matchType = activeTypes.includes(cardType);

      // 장르 일치 여부 (Festival이 꺼져서 장르 태그가 떠 있을 때만 적용)
      let matchGenre = true;
      if (!festivalActive) {
        matchGenre = cardGenres.some(g => activeGenres.includes(g));
      }

      // 최종 노출 조건
      if (matchType && matchGenre) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  }
});

// 이벤트 카드 클릭 시 각 카드에 지정된 상세페이지로 이동
  const eventCards = document.querySelectorAll(".event-card");
  
  eventCards.forEach((card) => {
    card.style.cursor = "pointer";

    card.addEventListener("click", (e) => {
      // 하트 버튼을 클릭한 경우는 상세페이지 이동 제외
      if (e.target.closest(".like-btn")) {
        return;
      }

      // 해당 카드에 적혀있는 data-detail 주소를 가져옴
      const detailUrl = card.getAttribute("data-detail");
      
      if (detailUrl) {
        window.location.href = detailUrl;
      }
    });
  });