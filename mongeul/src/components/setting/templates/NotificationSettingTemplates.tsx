"use client";

import Card from "@/components/common/atoms/Card";
import Text from "../atoms/Text";
import Toggle from "@/components/common/atoms/Toggle";
import { useFcmToggle } from "@/hooks/useFcmToggle";

export default function NotificationSettingTemplates() {
  const { enabled, fcmToggle } = useFcmToggle();

  return (
    <div className="w-full">
      <Card padding="p-8">
        <div className="w-full h-full flex flex-col gap-5">
          <Text text="현재 기기에서 알림을 받으시겠습니까?" />
          <div className="flex justify-end">
            <Toggle enabled={enabled} onChange={fcmToggle} />
          </div>
        </div>
        {/* <p className="mt-2">현재 상태: {enabled ? "ON" : "OFF"}</p> */}
      </Card>
    </div>
  );
}
