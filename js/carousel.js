export const carousel = () => {
  // 캐러셀 컨테이너 선택자
  const container = document.querySelector(".container");
  // 캐러셀 래퍼 선택자
  const wrapper = document.querySelector(".wrapper");
  // 캐러셀 슬라이드 리스트 선택자
  const slideList = document.querySelectorAll(".slide");
  // 캐러셀 페이지 선택자
  const pagination = document.querySelector("#pagination span");

  // 화면너비
  let winSize;
  // 슬라이드의 사이즈
  let slideSize;
  // 캐러셀의 현재 위치
  let now = 2;
  // 캐러셀의 스피드
  let speed = 300;
  // 페이지네이션 공식
  const page = (now) => ((now + 2) % slideList.length) + 1;

  // 캐러셀 초기화 함수
  const carouselInitialize = () => {
    // 화면 크기의 변화를 감지하여 캐러셀 사이즈 및 위치 재설정
    slideSize = slideList[0].clientWidth;
    winSize = container.clientWidth;

    // 이펙트 크기를 재설정
    slideList.forEach((slide) => {
      const img = slide.querySelector("img");
      const effect = slide.querySelector(".select-effect");

      effect.style.width = `${img.width}px`;
      effect.style.height = `${(img.width * img.naturalHeight) / img.naturalWidth}px`;
    });
    carouselSlide("init", 0);
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
  const location = () => slideSize * now - (winSize - slideSize) / 2;

  /** 캐러셀을 돌려요 */
  const carouselSlide = (action, speed) => {
    // 현재 슬라이드
    const currentSlide = page(now);
    // 이전 슬라이드의 인덱스
    const previousIndex = action ? page(now - 1) - 1 : page(now + 1) - 1;
    // 이전 슬라이드의 selected 클래스 삭제
    slideList[previousIndex].classList.remove("selected");

    // 페이지네이션
    pagination.innerText = currentSlide;
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
      slideList[currentSlide - 1].classList.add("selected");
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
    // 터치일 경우 약간의 감도 조절
    moveX = e.clientX ? clientX - start : ((clientX - start) / 5) * 3;
    // 터치 이벤트에 transition을 주어도 덜덜 떨려요
    wrapper.style.transition = e.clientX ? `${speed}ms` : `0ms`;
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
      carouselSlide(moveAction, speed + 100);
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

  wrapper.addEventListener("touchstart", touchStart);
  wrapper.addEventListener("touchmove", onMove);
  document.addEventListener("touchend", touchEnd);
};
