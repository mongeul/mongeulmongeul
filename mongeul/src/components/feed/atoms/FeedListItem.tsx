"use client";

import FeelingsIcon from "@/components/common/atoms/FeelingsIcon";
import { FeedListItem } from "@/types/feedTypes";
import Link from "next/link";
import { useEffect, useState } from "react";

interface FeedListItemProps {
  feed: FeedListItem;
}

export default function FeedItem({ feed }: FeedListItemProps) {
  // 아이콘의 초기 위치를 중앙(50%, 50%)으로 설정
  const [position, setPosition] = useState<{ top: string; left: string }>({
    top: "50%",
    left: "50%",
  });

  // 아이콘이 움직이는 오프셋 (흔들리는 효과)
  const [offset, setOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  // 애니메이션 지속 시간 설정 (기본값 3초)
  const [animationDuration, setAnimationDuration] = useState<string>("3s");

  useEffect(() => {
    // 아이콘의 랜덤한 위치 설정 (5% ~ 95%)
    const top = `${Math.random() * 80 + 5}%`;
    const left = `${Math.random() * 10 + 5}%`;

    // 아이콘의 랜덤한 이동 범위 설정 (-7.5px ~ 7.5px)
    const x = Math.random() * 7 - 3.5;
    const y = Math.random() * 15 - 7.5;

    // 아이콘의 랜덤한 애니메이션 지속 시간 설정 (2초 ~ 5초)
    const duration = `${Math.random() * 3 + 2}s`;

    // 상태 업데이트
    setPosition({ top, left });
    setOffset({ x, y });
    setAnimationDuration(duration);

    // 유니크한 애니메이션 키프레임 생성
    const styleSheet = document.styleSheets[0];
    const randomId = `shake-${feed.feedId}`;
    const keyframes = `
      @keyframes ${randomId} {
        0%, 100% { transform: translate(${x}px, ${y}px); }
        50% { transform: translate(${x * -1}px, ${y * -1}px); }
      }
    `;

    // 키프레임을 스타일 시트에 추가
    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

    return () => {
      // 컴포넌트가 언마운트되면 해당 키프레임 삭제
      const index = Array.from(styleSheet.cssRules).findIndex((rule) =>
        rule.cssText.includes(randomId)
      );
      if (index !== -1) {
        styleSheet.deleteRule(index);
      }
    };
  }, [feed.feedId]);

  return (
    <div
      className="absolute flex items-center justify-center w-full aspect-[1/1]"
      style={{
        // 랜덤 위치 배치
        top: position.top,
        left: position.left,
        // 랜덤 흔들림 효과 적용
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        animation: `shake-${feed.feedId} ${animationDuration} ease-in-out infinite alternate`,
      }}
    >
      <Link href={`/feed/${feed.feedId}`} className="cursor-pointer">
        <FeelingsIcon feeling={feed.feeling} size="w-24 h-24" />
      </Link>
    </div>
  );
}
