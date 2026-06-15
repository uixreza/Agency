import { useEffect } from "react";
import { useInView } from "framer-motion";
import { useRef } from "react";

export function useInViewAnimation(once = true) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-50px" });

  return { ref, isInView };
}
