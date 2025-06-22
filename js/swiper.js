export const swiper = () => {
  const wrapper = document.querySelector(".wrapper");
  const slideList = document.querySelectorAll(".slide");

  // 이전 다음 버튼
  const btnPrev = document.querySelector("#btnPrev");
  const btnNext = document.querySelector("#btnNext");

  // 캐러셀의 현재 위치
  let now = 1;

  // 화면 크기
  let size = slideList[0].clientWidth;
  // 화면 크기의 변화를 감지하여 재설정
  window.addEventListener("resize", () => {
    size = slideList[0].clientWidth;
    wrapper.style.transition = "none";
    wrapper.style.transform = `translateX(-${size * (now - 1)}px)`;
  });

  // 캐러셀 1번 페이징
  wrapper.style.transform = `translateX(-${size * (now - 1)}px)`;

  // 이전 버튼
  btnPrev.addEventListener("click", () => {
    now--;
    if (now === 0) {
      console.log("KYAAAAA");
      now = slideList.length;
    }
    wrapper.style.transition = "0.5s";
    wrapper.style.transform = `translateX(-${size * (now - 1)}px)`;
  });

  // 다음 버튼
  btnNext.addEventListener("click", () => {
    now++;
    if (now > slideList.length) {
      console.log("KYAAAAA");
      now = 1;
    }
    wrapper.style.transition = "0.5s";
    wrapper.style.transform = `translateX(-${size * (now - 1)}px)`;
  });
};
