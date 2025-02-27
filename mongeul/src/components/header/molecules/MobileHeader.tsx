"use client";

import NotificationButton from "../atoms/NotificationButton";
import BackButton from "../atoms/BackButton";

export default function MobileHeader() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full md:w-3/4 flex justify-between p-4">
        <BackButton />
        <NotificationButton />
      </div>
    </div>
  );
}
