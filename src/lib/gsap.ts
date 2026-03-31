import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";

gsap.registerPlugin(
  ScrollTrigger,
  ScrollSmoother,
  SplitText,
  MorphSVGPlugin,
  DrawSVGPlugin,
  Draggable,
  InertiaPlugin
);

export {
  gsap,
  ScrollTrigger,
  ScrollSmoother,
  SplitText,
  MorphSVGPlugin,
  DrawSVGPlugin,
  Draggable,
  InertiaPlugin,
};