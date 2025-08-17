"use client";
import Header from "@/components/common/header";
import { useRouter } from "next/navigation";
export default function SignupInfoPage() {
  const router = useRouter();

  const handleNext = () => {
    // 여기에 다음 단계로 넘어가는 로직을 추가하세요.
    // 예를 들어, 입력된 정보를 검증하고 다음 페이지로 이동할 수 있습니다.
    router.push("/signup/info/step3");
  };
  return (
    <div>
      <Header />
      <main className="px-[20px]">
        <h1>회원 유형을 선택해 주세요.</h1>
        <div className="grid grid-cols-2 gap-5">
          <div className="border border-[#d9d9d9] h-[240px] rounded-[8px]">
            <div></div>
            <div>
              <h1>트레이너</h1>
              <p>회원을 관리하고 계획을 세울 수 있어요.</p>
            </div>
          </div>
          <div className="border border-[#d9d9d9] h-[240px] rounded-[8px]">
            <div></div>
            <div>
              <h1>트레이니</h1>
              <p>나의 운동과 식단을 기록할래요.</p>
            </div>
          </div>
        </div>
        <button onClick={handleNext}>다음</button>
      </main>
    </div>
  );
}
