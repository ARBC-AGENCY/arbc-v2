import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

gsap.registerPlugin(
  ScrollTrigger,
  ScrollSmoother,
  SplitText,
  MorphSVGPlugin,
  DrawSVGPlugin
);

export {
  gsap,
  ScrollTrigger,
  ScrollSmoother,
  SplitText,
  MorphSVGPlugin,
  DrawSVGPlugin,
};