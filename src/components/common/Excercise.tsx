"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
const Excercise = () => {
  return (
    <>
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
            <h1>케이블 시티드 로우</h1>
            <div>4세트</div>
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
      <div className="flex flex-col gap-[8px]">
        <div className="flex items-center px-2.5 justify-between h-[45px] border border-[#d9d9d9] rounded-[8px]">
          <div>버튼</div>
          <div>1세트</div>
          <div>120KG</div>
          <div>12회</div>
        </div>
        <div className="flex items-center px-2.5 justify-between h-[45px] border border-[#d9d9d9] rounded-[8px]">
          <div>버튼</div>
          <div>1세트</div>
          <div>120KG</div>
          <div>12회</div>
        </div>
        <div className="flex items-center px-2.5 justify-between h-[45px] border border-[#d9d9d9] rounded-[8px]">
          <div>버튼</div>
          <div>1세트</div>
          <div>120KG</div>
          <div>12회</div>
        </div>
        <div className="flex items-center px-2.5 justify-between h-[45px] border border-[#d9d9d9] rounded-[8px]">
          <div>버튼</div>
          <div>1세트</div>
          <div>120KG</div>
          <div>12회</div>
        </div>
      </div>
      <div></div>
    </>
  );
};

export default Excercise;
