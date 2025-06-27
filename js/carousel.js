/** 캐러셀 */
export const carousel = () => {
  // 캐러셀 컨테이너 선택자
  const container = document.querySelector(".container");
  // 캐러셀 래퍼 선택자
  const wrapper = document.querySelector(".wrapper");
  // 캐러셀 슬라이드 리스트 선택자
  const slideList = document.querySelectorAll(".slide");
  // 캐러셀 페이지 선택자
  const pagination = document.querySelector("#pagination span");

  /** 화면너비 */
  let winSize;
  /** 슬라이드의 사이즈 */
  let slideSize;
  /** 캐러셀의 현재 위치 */
  let now = 2;
  /** 캐러셀의 스피드 */
  let speed = 350;
  /** 슬라이드 위치 구하는 공식(중간정렬) */
  const location = () => slideSize * now - (winSize - slideSize) / 2;
  /** 시스템상 페이지 구하는 공식 */
  const systemIdx = (now) => (now + 2) % slideList.length;
  /** 표시되는 페이지 구하는 공식 */
  const clientIdx = (now) => ((now + 2) % slideList.length) + 1;

  /** 캐러셀 초기화 함수 */
  const carouselInitialize = () => {
    // 화면 크기의 변화를 감지하여 캐러셀 사이즈 및 위치 재설정
    slideSize = slideList[0].clientWidth;
    winSize = container.clientWidth;
    carouselSlide("init", 0);
  };
  window.addEventListener("resize", carouselInitialize);
  window.addEventListener("load", carouselInitialize);

  // 무한루프를 위한 작업
  let firstChild = wrapper.firstElementChild;
  let lastChild = wrapper.lastElementChild;
  let clonedFirst = firstChild.cloneNode(true);
  clonedFirst.classList.add("disabled");
  let clonedSecond = wrapper.children[1].cloneNode(true);
  let clonedThird = wrapper.children[2].cloneNode(true);
  let clonedLast = lastChild.cloneNode(true);

  wrapper.append(clonedFirst, clonedSecond);
  wrapper.insertBefore(clonedLast, firstChild);
  wrapper.insertBefore(clonedThird, clonedLast);

  // 이전 다음 버튼 선택자
  const btnPrev = document.querySelector("#btnPrev");
  const btnNext = document.querySelector("#btnNext");

  /** 캐러셀을 돌려요
   *
   * action : 전진 혹은 후퇴
   * speed : 속도
   */
  const carouselSlide = (action, speed) => {
    // 현재 슬라이드의 표면 인덱스
    const currentClientIdx = clientIdx(now);
    // 이전 슬라이드의 시스템 인덱스
    const previousSystemIdx = action ? systemIdx(now - 1) : systemIdx(now + 1);
    // 이전 슬라이드의 selected, disabled 클래스 삭제
    slideList[previousSystemIdx].classList.remove("selected", "disabled");

    // 표면 인덱스 표시
    pagination.innerText = currentClientIdx;
    // 슬라이드
    wrapper.style.transition = `${speed}ms`;
    wrapper.style.transform = `translateX(-${location()}px)`;
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
      slideList[currentClientIdx - 1].classList.add("selected");
    }, speed);
  };

  /** 이전 버튼 클릭 */
  btnPrev.addEventListener("click", () => {
    now--;
    carouselSlide(false, speed);
  });

  /** 다음 버튼 클릭 */
  btnNext.addEventListener("click", () => {
    now++;
    carouselSlide(true, speed);
  });

  /** 스와이핑 기능 */
  let start;
  let moveX;

  /** 스와이프 초기화 */
  const swipeInit = () => {
    slideList[systemIdx(now)].classList.remove("disabled");
    start = 0;
    moveX = 0;
  };

  /** 움직임 제어 */
  const onMove = (e) => {
    // 터치시 화면이 덜덜 떨려요
    e.preventDefault();

    // 작동중 클릭 제어 -> 해제는 carouselSlide에서
    slideList[systemIdx(now)].classList.add("disabled");

    // mouse : touch
    const clientX = e.clientX ?? e.touches[0].clientX;
    // 터치일 경우 약간의 감도 조절
    moveX = e.clientX ? clientX - start : ((clientX - start) / 5) * 3;
    // 터치 이벤트에 transition을 주어도 덜덜 떨려요
    wrapper.style.transition = e.clientX ? `${speed}ms` : `0ms`;
    wrapper.style.transform = `translateX(-${location() - moveX}px)`;
  };

  /** 마우스 이벤트 */
  const mouseDown = (e) => {
    start = e.clientX;
    wrapper.addEventListener("mousemove", onMove);
    document.onmouseup = mouseUp;
  };

  const mouseUp = (e) => {
    wrapper.removeEventListener("mousemove", onMove);

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
    carouselSlide(moveAction, speed + 100);
    // 초기화
    swipeInit();
  };

  // 드래그 이벤트 리스너
  wrapper.addEventListener("mousedown", mouseDown);

  /** 터치 이벤트 */
  const touchStart = (e) => {
    start = e.touches[0].clientX;
  };

  const touchEnd = (e) => {
    // 버튼 클릭 핸들링
    if (!moveX) return;
    let moveAction;
    if (moveX < -slideSize / 7) {
      moveAction = true;
      now++;
    } else if (moveX > slideSize / 7) {
      moveAction = false;
      now--;
    }
    carouselSlide(moveAction, speed - 100);
    // 초기화
    swipeInit();
  };

  // 터치 이벤트 리스너
  wrapper.addEventListener("touchstart", touchStart);
  wrapper.addEventListener("touchmove", onMove);
  document.addEventListener("touchend", touchEnd);
};
