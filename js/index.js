/** 임포트 관리자 */
import { carousel } from "./carousel.js";
import { earthSlide } from "./earthSlide.js";

carousel();
earthSlide();

// 로딩
window.onload = () => {
  document.querySelector(".loading").style.visibility = "hidden";
};
