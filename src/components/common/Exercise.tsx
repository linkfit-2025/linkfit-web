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
  isSelected?: boolean;

  onClick: () => void;
}
const Excercise = ({ id, name, sets, isSelected, onClick }: ExerciseProps) => {
  const [checkedSets, setCheckedSets] = useState<boolean[]>(
    sets.map(() => false)
  );

  const toggleChecked = (index: number) => {
    setCheckedSets((prev) => prev.map((v, i) => (i === index ? !v : v)));
  };
  return (
    <div onClick={onClick}>
      <div className="flex items-center h-[48px] mb-3">
        <div className="w-[40px]">
          <Image
            src="/images/common/icon/navigation/arrow_forward_ios_24px.svg"
            width={24}
            height={24}
            alt="리셋"
          />
        </div>
        <div className="flex gap-[8px]" style={{ flex: 1 }}>
          <div className="w-[48px] h-[48px] bg-black"></div>
          <div>
            <h1>{name}</h1>
            <div>{sets.length}세트</div>
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
      <div className="flex flex-col gap-[8px]">
        {sets.map((set, index) => (
          <div
            key={set.id}
            className="flex items-center px-2.5 justify-between h-[45px] border border-[#d9d9d9] rounded-[8px]"
          >
            <button
              onClick={() => toggleChecked(index)}
              className="w-5 h-5 flex items-center justify-center rounded-full border border-gray-400"
            >
              {checkedSets[index] && (
                <div className="w-2.5 h-2.5 bg-blue-500 rounded-full" />
              )}
            </button>
            <div>{index + 1}세트</div>
            <div>{set.weight}KG</div>
            <div>{set.reps}회</div>
          </div>
        ))}
      </div>
      <div></div>
    </div>
  );
};

export default Excercise;
