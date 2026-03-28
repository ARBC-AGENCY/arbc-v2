"use client";

import { useTransitionContext } from "@/context/TransitionContext";

/**
 * Drop-in replacement for next-intl's <Link> wherever a page transition
 * should be triggered. Renders a plain <a> tag (preserves href for
 * accessibility/SEO) but intercepts the click to fire the GSAP overlay
 * before letting Next.js router handle the actual navigation.
 *
 * Usage:
 *   <TransitionLink href="/about" label="About">About</TransitionLink>
 *
 * - href  : path WITHOUT locale prefix  ("/", "/about", "/explore")
 * - label : the word shown in the overlay  (must match an <h2> in PageTransition)
 */
interface TransitionLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  label: string;
}

export default function TransitionLink({
  href,
  label,
  children,
  ...rest
}: TransitionLinkProps) {
  const { navigate } = useTransitionContext();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate(href, label);
  };

  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
