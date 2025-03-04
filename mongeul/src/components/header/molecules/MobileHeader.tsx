"use client";

import NotificationButton from "../atoms/NotificationButton";
import BackButton from "../atoms/BackButton";

export default function MobileHeader() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full lg:w-3/4 flex justify-between">
        <BackButton />
        <NotificationButton />
      </div>
    </div>
  );
}
