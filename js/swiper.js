export const swiper = () => {
  const wrapper = document.querySelector(".wrapper");
  const slideList = document.querySelectorAll(".slide");

  const prevBtn = document.querySelector("#prevBtn");
  const nextBtn = document.querySelector("#nextBtn");

  let now = 1;
  const size = slideList[0].clientWidth;
  wrapper.style.transform = `translateX(-${size * (now - 1)}px)`;
  console.log(size, -size * now);

  prevBtn.addEventListener("click", () => {
    now--;
    console.log(now);
    wrapper.style.transform = `translateX(-${size * (now - 1)}px)`;
    console.log(size, -size * now);
  });

  nextBtn.addEventListener("click", () => {
    now++;
    console.log(now);
    wrapper.style.transform = `translateX(-${size * (now - 1)}px)`;
    console.log(size, -size * now);
  });
};
