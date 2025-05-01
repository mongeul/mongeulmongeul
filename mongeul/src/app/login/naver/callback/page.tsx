"use client";
export const dynamic = "force-dynamic";

import { Suspense } from "react";
import Spinner from "@/components/common/atoms/Spinner";
import NaverCallbackInner from "./NaverCallbackInner";

export default function NaverCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full h-screen flex items-center justify-center">
          <Spinner />
        </div>
      }
    >
      <NaverCallbackInner />
    </Suspense>
  );
}
