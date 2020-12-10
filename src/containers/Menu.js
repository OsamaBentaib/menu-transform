import React, { Fragment, useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../context/Context";
import { store } from "./../store";
import { gsap } from "gsap";
import { defaultAnimate, showTheActions } from "../animate";
export default function Menu() {
  /**
   * start definding elements using refs
   */
  const MenuRefs = useRef([]);
  /**
   * simple way to add array columns
   */
  let a = [];
  const lenA = store.length;
  for (let i = 0; i < lenA; i++) a.push((a[i] = []));
  const gallery = useRef(a);
  const title = useRef([]);
  const deco = useRef([]);
  const cta = useRef([]);
  const ctaInner = useRef([]);
  let b = [];
  const lenB = store.length;
  for (let i = 0; i < lenB; i++) b.push((b[i] = []));
  /**
   * we will use react context for getting is hover from any link
   */
  const dispatch = useAppDispatch();
  /**
   * states
   */
  const [current, setCurrent] = useState(0);
  const [animate, setAnimate] = useState(false);
  /**
   * default effect
   */
  useEffect(() => {
    init();
    /**
     * we use this comment to hide the missing depandency we want that
     * to exicute only once
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  /**
   *
   * dispatch when the cursor is in menu link hover
   * this way will allow it to expand with animation using gsap
   */
  const onHover = (hover) => {
    dispatch({
      type: "HOVER",
      hover,
    });
  };
  const init = () => {
    // loop for the galery items and create a default animation
    gallery.current[current].forEach((e, j) => {
      defaultAnimate(gallery.current[current][j]);
    });
    showTheActions(deco.current[current]);
    showTheActions(cta.current[current]);
  };
  const onNavigate = (pos) => {
    if (pos === current || animate) return;
    setAnimate(true);
    /**
     *
     */
    const direction = current < pos ? "up" : "down";
    toggleMenuItems(pos, direction);
    setCurrent(pos);
    setAnimate(false);
  };
  const toggleMenuItems = (pos, direction = "up") => {
    const winsize = { width: window.innerWidth, height: window.innerHeight };
    const dir = direction === "up" ? 1 : -1;
    gsap.to(
      deco.current[current],
      {
        scaleY: 0,
        opacity: 0,
      },
      0
    );
    gsap.to(
      cta.current[current],
      {
        y: "100%",
        opacity: 0,
      },
      0
    );
    gallery.current[current].forEach((e, i) => {
      gsap.to(
        gallery.current[current][i],
        {
          y: dir * -winsize.height * 1.2,
          stagger: dir * 0.05,
          rotation: gsap.utils.random(-30, 30),
        },
        0
      );
    });
    gsap.to(deco.current[pos], {
      startAt: { scaleY: 0 },
      scaleY: 1,
      opacity: 1,
    });
    gsap.to(cta.current[pos], {
      startAt: { y: dir * 100 + "%" },
      y: "0%",
      opacity: 1,
    });
    gallery.current[pos].forEach((e, i) => {
      gsap.to(gallery.current[pos][i], {
        startAt: {
          y: dir * winsize.height * 1.2,
          rotation: gsap.utils.random(-30, 30),
        },
        y: 0,
        opacity: 1,
        rotation: 0,
        stagger: dir * 0.05,
      });
    });
  };
  return (
    <Fragment>
      <div className="bg-gallery-wrap">
        {store &&
          store.map((t, i) => (
            <div
              key={i + t.title}
              className={`bg-gallery bg-gallery--${i + 1}`}
            >
              {t.galery.map((g, j) => (
                <img
                  key={j + 1 * i + 1}
                  ref={(e) => {
                    gallery.current[i][j] = e;
                  }}
                  className="bg-gallery__item"
                  src={g}
                  alt="..."
                />
              ))}
            </div>
          ))}
      </div>
      <nav className="menu" id="menu">
        <div className="menu__headline">
          <span className="menu__headline-deco"></span>
          <span className="menu__headline-text">
            <span>Menu</span>
          </span>
        </div>
        {store.map((t, i) => (
          <span
            key={i}
            ref={(e) => (MenuRefs.current[i] = e)}
            className={`menu__item${
              current === i ? " menu__item--selected" : ""
            }`}
            onMouseEnter={() => onHover(true)}
            onMouseLeave={() => onHover(false)}
            onClick={(e) => onNavigate(i)}
          >
            <span
              ref={(e) => (title.current[i] = e)}
              className="menu__item-title"
            >
              {t.title}
            </span>
            <span
              ref={(e) => (deco.current[i] = e)}
              className="menu__item-deco"
            >
              |
            </span>
            <span ref={(e) => (cta.current[i] = e)} className="menu__item-cta">
              <span ref={(e) => (ctaInner.current[i] = e)}>open</span>
            </span>
          </span>
        ))}
      </nav>
    </Fragment>
  );
}
