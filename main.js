document.addEventListener("DOMContentLoaded", () => {
  // GNB 로고 스크롤 이동 이벤트
  const firstPageLogo = document.querySelector(".logo-link");
  if (firstPageLogo) {
    firstPageLogo.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Z-Pattern 항목 호버 인터랙션
  const zRows = document.querySelectorAll(".z-row");

  zRows.forEach((row) => {
    const items = row.querySelectorAll(".feature-item");
    const displayImg = row.querySelector(".feature-display-img");

    let slideInterval = null;

    // 마우스가 해당 Z-row를 벗어날 때 슬라이드 정지 (선택사항)
    row.addEventListener("mouseleave", () => {
      if (slideInterval) {
        clearInterval(slideInterval);
        slideInterval = null;
      }
    });

    items.forEach((item) => {
      item.addEventListener("mouseenter", () => {
        // 1. 활성화 클래스(active) 토글 (텍스트 밝아지고 나머지 어두워지는 효과)
        items.forEach((i) => i.classList.remove("active"));
        item.classList.add("active");

        // 기존에 돌고 있던 슬라이드 타이머가 있다면 정지
        if (slideInterval) {
          clearInterval(slideInterval);
          slideInterval = null;
        }

        // 2. 첫 번째 텍스트: 300ms 마다 2개 이미지 슬라이드쇼 전환
        if (item.dataset.imgType === "slide") {
          const slideImages = item.dataset.slideImgs.split(",");
          let currentIdx = 0;
          
          displayImg.src = slideImages[currentIdx];
          
          slideInterval = setInterval(() => {
            currentIdx = (currentIdx + 1) % slideImages.length;
            displayImg.style.opacity = "0.4"; // 부드러운 전환 느낌
            setTimeout(() => {
              displayImg.src = slideImages[currentIdx];
              displayImg.style.opacity = "1";
            }, 150);
          }, 800); // 300ms 간격
        } 
        // 3. 일반 텍스트: 각 <li>에 지정된 data-img 단일 이미지로 변경
        else if (item.dataset.img) {
          displayImg.style.opacity = "0.4";
          setTimeout(() => {
            displayImg.src = item.dataset.img;
            displayImg.style.opacity = "1";
          }, 100);
        }
      });
    });
  });
});

// Get the App 버튼 QR 모달 제어
  const getAppBtn = document.querySelector(".btn-get-app");
  const qrModal = document.getElementById("qrModal");
  const closeBtn = document.querySelector(".qr-close-btn");

  if (getAppBtn && qrModal) {
    // 버튼 클릭 시 모달 열기
    getAppBtn.addEventListener("click", () => {
      qrModal.style.display = "flex";
    });

    // X 버튼 클릭 시 모달 닫기
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        qrModal.style.display = "none";
      });
    }

    // 모달 바깥 배경 클릭 시 모달 닫기
    qrModal.addEventListener("click", (e) => {
      if (e.target === qrModal) {
        qrModal.style.display = "none";
      }
    });
  }