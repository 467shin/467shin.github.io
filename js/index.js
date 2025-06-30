/** 임포트 관리자 */
import { carousel } from "./carousel.js";
import { theCreation } from "./earthSlide.js";

carousel();
theCreation();

// 로딩
window.onload = () => {
  document.querySelector(".loading").style.visibility = "hidden";
};
