document.addEventListener("DOMContentLoaded", () => {
  // 1. 1차 메인 탭 전환 (My tickets / Saved events / Following)
  const mainTabBtns = document.querySelectorAll(".main-tab-btn");
  const tabContentSections = document.querySelectorAll(".tab-content-section");

  mainTabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      mainTabBtns.forEach((b) => b.classList.remove("active"));
      tabContentSections.forEach((sec) => sec.classList.remove("active"));

      btn.classList.add("active");
      const targetTabId = `tab-${btn.dataset.tab}`;
      const targetSection = document.getElementById(targetTabId);

      if (targetSection) {
        targetSection.classList.add("active");
      }
    });
  });

  // 2. 2차 서브 탭 전환 (Upcoming / Past)
  const subTabBtns = document.querySelectorAll(".sub-tab-btn");

  subTabBtns.forEach((sBtn) => {
    sBtn.addEventListener("click", () => {
      const parentSection = sBtn.closest(".tab-content-section");
      if (!parentSection) return;

      const currentSubBtns = parentSection.querySelectorAll(".sub-tab-btn");
      const currentSubPanels = parentSection.querySelectorAll(".sub-content-panel");

      currentSubBtns.forEach((b) => b.classList.remove("active"));
      currentSubPanels.forEach((p) => p.classList.remove("active"));

      sBtn.classList.add("active");
      const targetSubId = `sub-${sBtn.dataset.sub}`;
      const targetPanel = parentSection.querySelector(`#${targetSubId}`);

      if (targetPanel) {
        targetPanel.classList.add("active");
      }
    });
  });

  // 3. Ticket QR 팝업 모달 & 60초 타이머 제어
  const openTicketQrBtn = document.getElementById("openTicketQrBtn");
  const ticketModal = document.getElementById("ticketModal");
  const ticketModalClose = document.getElementById("ticketModalClose");
  const qrTimer = document.getElementById("qrTimer");

  let countdownInterval = null;

  function startQrTimer() {
    let timeLeft = 60;
    qrTimer.textContent = "00:60";

    if (countdownInterval) clearInterval(countdownInterval);

    countdownInterval = setInterval(() => {
      timeLeft--;
      const secondsStr = timeLeft < 10 ? `0${timeLeft}` : `${timeLeft}`;
      qrTimer.textContent = `00:${secondsStr}`;

      if (timeLeft <= 0) {
        clearInterval(countdownInterval);
        qrTimer.textContent = "Expired";
      }
    }, 1000);
  }

  if (openTicketQrBtn && ticketModal) {
    openTicketQrBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // 카드 클릭 이동 방지
      ticketModal.classList.add("show");
      startQrTimer();
    });

    ticketModalClose.addEventListener("click", () => {
      ticketModal.classList.remove("show");
      if (countdownInterval) clearInterval(countdownInterval);
    });

    ticketModal.addEventListener("click", (e) => {
      if (e.target === ticketModal) {
        ticketModal.classList.remove("show");
        if (countdownInterval) clearInterval(countdownInterval);
      }
    });
  }

  // 4. Saved Events 탭 내부 하트 누르기 기능
  const likeBtns = document.querySelectorAll(".like-btn");
  likeBtns.forEach((lBtn) => {
    const countSpan = lBtn.querySelector(".like-count");
    const baseCount = parseInt(countSpan.getAttribute("data-count"), 10);

    lBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // 카드 클릭 이동 방지
      lBtn.classList.toggle("liked");
      
      if (lBtn.classList.contains("liked")) {
        countSpan.textContent = (baseCount + 1).toLocaleString();
      } else {
        countSpan.textContent = baseCount.toLocaleString();
      }
    });
  });

  // 5. 이벤트 카드 및 베뉴 이름 클릭 시 페이지 이동 처리
  const eventCards = document.querySelectorAll(".event-card");
  eventCards.forEach((card) => {
    card.style.cursor = "pointer";
    card.addEventListener("click", (e) => {
      // 1. 베뉴 이름을 클릭한 경우 -> 베뉴 상세 페이지로 이동
      const venueLink = e.target.closest(".venue-name-link");
      if (venueLink) {
        const venueUrl = venueLink.getAttribute("data-venue-url");
        if (venueUrl) {
          window.location.href = venueUrl;
          return;
        }
      }

      // 2. 하트 버튼이나 티켓 버튼을 누른 경우는 이동 제외
      if (e.target.closest(".like-btn") || e.target.closest(".ticket-icon-btn")) {
        return;
      }

      // 3. 그 외 카드 영역을 누른 경우 -> 이벤트 상세 페이지로 이동
      const detailUrl = card.getAttribute("data-detail");
      if (detailUrl) {
        window.location.href = detailUrl;
      }
    });
  });
});