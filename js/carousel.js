export const carousel = () => {
  const container = document.querySelector(".container");
  // 캐러셀 래퍼 선택자
  const wrapper = document.querySelector(".wrapper");
  // 캐러셀 슬라이드 리스트 선택자
  const slideList = document.querySelectorAll(".slide");

  // 화면너비
  let winSize;
  // 슬라이드의 사이즈
  let slideSize;
  // 캐러셀의 현재 위치
  let now = 2;

  // 캐러셀 초기화 함수
  const carouselInitialize = () => {
    // 화면 크기의 변화를 감지하여 캐러셀 사이즈 및 위치 재설정
    slideSize = slideList[0].clientWidth;
    winSize = container.clientWidth;

    carouselSlide(null, 0);
  };
  window.addEventListener("resize", carouselInitialize);
  window.addEventListener("load", carouselInitialize);

  // 무한루프를 위한 작업
  let firstChild = wrapper.firstElementChild;
  let lastChild = wrapper.lastElementChild;
  let clonedFirst = firstChild.cloneNode(true);
  let clonedSecond = wrapper.children[1].cloneNode(true);
  let clonedThird = wrapper.children[2].cloneNode(true);
  let clonedLast = lastChild.cloneNode(true);

  wrapper.append(clonedFirst, clonedSecond);
  wrapper.insertBefore(clonedLast, firstChild);
  wrapper.insertBefore(clonedThird, clonedLast);

  // 이전 다음 버튼 선택
  const btnPrev = document.querySelector("#btnPrev");
  const btnNext = document.querySelector("#btnNext");

  // 슬라이드 위치 구하기(중간정렬)
  const location = () => {
    return slideSize * now - (winSize - slideSize) / 2;
  };

  /** 캐러셀을 돌려요 */
  const carouselSlide = (action, speed) => {
    wrapper.style.transition = `${speed}ms`;
    wrapper.style.transform = `translateX(-${location()}px)`;
    // 단순 이동 제어
    if (!speed) return;
    // UX를 위한 캐러셀 회전 딜레이 제어
    const targetBtn = action ? btnNext : btnPrev;
    targetBtn.classList.add("disabled");
    setTimeout(() => {
      // 루프 제어
      if (now === 1 || now > slideList.length + 1) {
        // 캐러셀 위치 초기화
        now = action ? 2 : slideList.length + 1;
        wrapper.style.transition = `0ms`;
        wrapper.style.transform = `translateX(-${location()}px)`;
      }
      targetBtn.classList.remove("disabled");
    }, speed);
  };

  /** 이전 버튼 클릭 */
  btnPrev.addEventListener("click", () => {
    now--;
    carouselSlide(false, 450);
  });

  /** 다음 버튼 클릭 */
  btnNext.addEventListener("click", () => {
    now++;
    carouselSlide(true, 450);
  });

  /** 스와이프 기능 */
  let start;
  let moveX;
  const swipeInit = () => {
    start = 0;
    moveX = 0;
  };
  // 터치 및 드래그 제어
  const onMove = (e) => {
    // 터치시 화면이 덜덜 떨려요
    e.preventDefault();
    // mouse : touch
    const clientX = e.clientX ? e.clientX : e.touches[0].clientX;
    moveX = clientX - start;
    wrapper.style.transition = e.clientX ? `450ms` : `0ms`;
    wrapper.style.transform = `translateX(-${location() - moveX}px)`;
  };

  // 마우스
  wrapper.onmousedown = (e) => {
    start = e.clientX;
    wrapper.addEventListener("mousemove", onMove);
    document.onmouseup = (e) => {
      wrapper.removeEventListener("mousemove", onMove);
      document.onmouseup = null;

      // 버튼 클릭 핸들링
      if (!moveX) return;

      let moveAction;
      if (moveX < -slideSize / 5) {
        moveAction = true;
        now++;
      } else if (moveX > slideSize / 5) {
        moveAction = false;
        now--;
      }
      carouselSlide(moveAction, 450);
      // 초기화
      swipeInit();
    };
  };

  // 터치
  const touchStart = (e) => {
    start = e.touches[0].clientX;
  };

  const touchEnd = (e) => {
    // 버튼 클릭 핸들링
    if (!moveX) return;
    let moveAction;
    if (moveX < -slideSize / 5) {
      moveAction = true;
      now++;
    } else if (moveX > slideSize / 5) {
      moveAction = false;
      now--;
    }
    carouselSlide(moveAction, 300);
    // 초기화
    swipeInit();
  };

  wrapper.addEventListener("touchstart", touchStart);
  wrapper.addEventListener("touchmove", onMove);
  document.addEventListener("touchend", touchEnd);
};
