import React, { useEffect, useRef, useState } from "react";
import { useMousePosition } from "./../hooks";
import { useAppState } from "./../context/Context";
import { gsap } from "gsap";
import { lerp } from "./../utils";

export default function Cursor() {
  const mouse = useMousePosition();
  const cursor = useRef(null);
  const { hover } = useAppState();
  useEffect(() => {
    hoverRender(hover);
  }, [hover]);
  useEffect(() => {
    init();
  }, []);
  const init = () => {
    if (cursor) {
      cursor.current.style.opacity = 0;
    }
  };
  useEffect(() => {
    onMouseMoveEv();
  }, [mouse]);
  const onMouseMoveEv = () => {
    if (cursor) {
      gsap.to(cursor.current, {
        duration: 0.9,
        ease: "Power3.easeOut",
        opacity: 1,
        left: mouse.x,
        top: mouse.y,
      });
    }
  };
  const hoverRender = (hover) => {
    if (cursor) {
      if (hover) {
        gsap.to(cursor.current, {
          duration: 0.9,
          ease: "Power3.easeOut",
          opacity: 1,
          left: mouse.x,
          top: mouse.y,
          width: "60px",
          height: "60px",
        });
      } else {
        gsap.to(cursor.current, {
          duration: 0.9,
          ease: "Power3.easeOut",
          opacity: 1,
          left: mouse.x,
          top: mouse.y,
          width: "30px",
          height: "30px",
        });
      }
    }
  };
  return (
    <svg
      ref={cursor}
      className="cursor"
      width="30"
      height="30"
      viewBox="0 0 30 30"
    >
      <circle className="cursor__inner" cx="15" cy="15" r="7.5" />
    </svg>
  );
}
