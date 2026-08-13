import type { Metadata } from "next";
import NotFoundView from "@/components/NotFoundView";

export const metadata: Metadata = {
  robots: { index: false },
};

export default function CatchAllNotFound() {
  return <NotFoundView />;
}