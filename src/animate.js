import { gsap } from "gsap";

const defaultAnimate = (ele) => {
  return new Promise((reserve, reject) => {
    gsap.to(ele, {
      duration: 1,
      ease: "expo",
      startAt: { scale: 0.01, rotation: gsap.utils.random(-20, 20) },
      scale: 1,
      opacity: 1,
      rotation: 0,
      stagger: 0.05,
      onComplete: reserve(),
    });
  });
};
const showTheActions = (ele) => {
  gsap.set(ele, { opacity: 1 });
};
export { defaultAnimate, showTheActions };
