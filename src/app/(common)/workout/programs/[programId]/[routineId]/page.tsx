"use client";
import React, { useState, useEffect, useRef } from "react";
import Exercise from "@/components/common/Exercise";
import Timer from "@/components/common/Timer";
// export default function RoutinePage() {
//   return <div>Workout Record Page for program </div>;
// }
export default function RoutinePage({
  params,
}: {
  params: { routineId: number };
}) {
  const TIMER_HEIGHT = 375;
  const [exercises, setExercises] = useState([
    {
      id: 1,
      name: "스쿼트",
      restSeconds: 60,
      sets: [
        { id: 1, weight: 120, reps: 12 },
        { id: 2, weight: 120, reps: 12 },
        { id: 3, weight: 120, reps: 12 },
      ],
    },
    {
      id: 2,
      name: "벤치프레스",
      restSeconds: 90,
      sets: [
        { id: 1, weight: 80, reps: 10 },
        { id: 2, weight: 80, reps: 10 },
      ],
    },
    {
      id: 3,
      name: "데드리프트",
      restSeconds: 120,
      sets: [
        { id: 1, weight: 120, reps: 12 },
        { id: 2, weight: 120, reps: 12 },
        { id: 3, weight: 120, reps: 12 },
      ],
    },
  ]);
  const [currentExerciseId, setCurrentExerciseId] = useState<number | null>(
    null
  );
  const exerciseRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // wrapperRef 영역 안이면 클릭 무시
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setCurrentExerciseId(null); // 선택 초기화 → Timer 숨김
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleExerciseClick = (id: number) => {
    setCurrentExerciseId(id);

    // 클릭된 Exercise가 상단으로 스크롤되도록
    setTimeout(() => {
      const el = exerciseRefs.current.get(id);
      if (el && wrapperRef.current) {
        // wrapperRef 내부 스크롤
        wrapperRef.current.scrollTo({
          top: el.offsetTop - 66,
          behavior: "smooth",
        });
      }
    }, 50); // 렌더 후 refs 적용
  };
  return (
    <div>
      {/* Exercise + Timer 영역만 감싸는 ref */}
      <div
        ref={wrapperRef}
        className="overflow-y-auto"
        style={{
          height: `calc(100vh - 60px - ${
            currentExerciseId ? TIMER_HEIGHT : 0
          }px)`,
        }}
      >
        <div className="flex flex-col gap-[10px] pt-5">
          {exercises.map((exercise) => (
            <div
              key={exercise.id}
              ref={(el) => {
                if (el) exerciseRefs.current.set(exercise.id, el);
              }}
            >
              <Exercise
                {...exercise}
                isSelected={exercise.id === currentExerciseId}
                onClick={() => handleExerciseClick(exercise.id)}
              />
            </div>
          ))}
        </div>

        {currentExerciseId && (
          <Timer
            restSeconds={
              exercises.find((item) => item.id === currentExerciseId)
                ?.restSeconds
            }
          />
        )}
      </div>
    </div>
  );
}
