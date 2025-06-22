export const swiper = () => {
  const wrapper = document.querySelector(".wrapper");
  const slideList = document.querySelectorAll(".slide");

  // 슬라이드의 사이즈
  let size;
  // 캐러셀의 현재 위치
  let now = 1;

  // 초기화
  const initializeData = () => {
    now = 1;
    // 초기화 및 화면 크기의 변화를 감지하여 재설정
    size = slideList[0].clientWidth;
    wrapper.style.transition = "none";
    wrapper.style.transform = `translateX(-${size * now}px)`;
  };
  window.addEventListener("resize", initializeData);
  window.addEventListener("load", initializeData);

  console.log(now);

  // 무한루프를 위한 작업
  let firstChild = wrapper.firstElementChild;
  let secondChild = wrapper.children[1];
  let lastChild = wrapper.lastElementChild;
  let clonedFirst = firstChild.cloneNode(true);
  let clonedSecond = secondChild.cloneNode(true);
  let clonedLast = lastChild.cloneNode(true);

  wrapper.append(clonedFirst, clonedSecond);
  wrapper.insertBefore(clonedLast, wrapper.firstElementChild);

  // 이전 다음 버튼
  const btnPrev = document.querySelector("#btnPrev");
  const btnNext = document.querySelector("#btnNext");

  // 캐러셀을 돌려요
  const carouselSlide = (now, speed) => {
    wrapper.style.transition = `${speed}s`;
    wrapper.style.transform = `translateX(-${size * now}px)`;
  };

  // 이전 버튼
  btnPrev.addEventListener("click", () => {
    now--;
    carouselSlide(now, 0.5);
    // 첫 슬라이드에서 이전으로 갈 경우
    if (now === 0) {
      setTimeout(() => {
        now = slideList.length;
        carouselSlide(now, 0);
      }, 450);
    }
  });

  // 다음 버튼
  btnNext.addEventListener("click", () => {
    now++;
    carouselSlide(now, 0.5);
    // 마지막 슬라이드에서 다음으로 갈 경우
    if (now > slideList.length) {
      setTimeout(() => {
        now = 1;
        carouselSlide(now, 0);
      }, 500);
    }
  });
};
