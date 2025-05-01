"use client";
export const dynamic = "force-dynamic";

import { Suspense } from "react";
import Spinner from "@/components/common/atoms/Spinner";
import GoogleCallbackInner from "./GoogleCallbackInner";

export default function GoogleCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full h-screen flex items-center justify-center">
          <Spinner />
        </div>
      }
    >
      <GoogleCallbackInner />
    </Suspense>
  );
}
