"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface SetItem {
  id: number;
  weight: number;
  reps: number;
}

interface ExerciseProps {
  id: number;
  name: string;
  sets: SetItem[];
  completedSetIds: Set<number>;
  isSelected?: boolean;
  onClickExercise: (id: number) => void;
  addSets: (id: number) => void;
  onClickSet: (setId: number) => void;
}
const Excercise = ({
  id,
  name,
  sets,
  completedSetIds,
  isSelected,
  onClickExercise,
  addSets,
  onClickSet,
}: ExerciseProps) => {
  const [rotated, setRotated] = useState(false);

  const [checkedSets, setCheckedSets] = useState<boolean[]>(
    sets.map(() => false)
  );

  const toggleChecked = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
    id: number
  ) => {
    e.stopPropagation();
    onClickSet(id);
  };
  return (
    <div onClick={() => onClickExercise(id)} className="py-5 px-5">
      <div className="flex items-center h-[48px] mb-3 ">
        <div className="w-[40px]">
          <button
            onClick={() => setRotated(!rotated)}
            className={`transition-transform duration-300 ${
              rotated ? "rotate-180" : "rotate-0"
            }`}
          >
            <Image
              src="/images/common/icon/navigation/arrow_forward_ios_24px.svg"
              width={24}
              height={24}
              alt="리셋"
            />
          </button>
        </div>
        <div className="flex gap-[8px]" style={{ flex: 1 }}>
          <div className="w-[48px] h-[48px] bg-black"></div>
          <div>
            <h1>{name}</h1>
            <div>{sets?.length}세트</div>
          </div>
        </div>
        <div>
          <button>
            <Image
              src="/images/common/icon/edit-contained.svg"
              width={24}
              height={24}
              alt="리셋"
            />
          </button>
        </div>
      </div>

      {/* 세트 리스트 */}
      {!rotated && (
        <div className="text-sm  flex flex-col gap-[8px]">
          {sets.map((set, index) => {
            const isCompleted = completedSetIds.has(set.id);
            return (
              <div
                key={set?.id}
                className="flex items-center px-2.5 justify-between h-[45px] border border-[#d9d9d9] rounded-[8px]"
              >
                <div
                  onClick={(e) => toggleChecked(e, index, set.id)}
                  className="w-5 h-5 flex items-center justify-center rounded-full border border-gray-400"
                >
                  {isCompleted && (
                    <div className="w-2.5 h-2.5 bg-blue-500 rounded-full" />
                  )}
                </div>
                <div>{index + 1}세트</div>
                <div>{set?.weight}KG</div>
                <div>{set?.reps}회</div>
              </div>
            );
          })}
        </div>
      )}
      <div className="text-sm mt-2 flex justify-between h-[32px]">
        <button className="w-[93px] border border-[#d9d9d9] rounded-[8px]">
          운동 메모
        </button>
        <button
          onClick={() => addSets(id)}
          className="w-[207px] border border-[#d9d9d9] rounded-[8px]"
        >
          세트 추가하기
        </button>
      </div>
    </div>
  );
};

export default Excercise;
