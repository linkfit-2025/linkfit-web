"use client";
import Header from "@/components/common/header";
import { useRouter } from "next/navigation";
export default function SignupInfoPage() {
  const router = useRouter();

  const handleNext = () => {
    // 여기에 다음 단계로 넘어가는 로직을 추가하세요.
    // 예를 들어, 입력된 정보를 검증하고 다음 페이지로 이동할 수 있습니다.
    router.push("/signup/info/step2");
  };
  return (
    <div>
      <Header />
      <main className="px-[20px]">
        <h1 className="mb-4">본인 확인을 위해 정보를 입력해 주세요.</h1>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <label htmlFor="name">이름</label>
            <input
              className="border border-[#d9d9d9] rounded-[8px] h-[45px]"
              type="text"
              id="name"
              name="name"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">이메일</label>
            <input
              className="border border-[#d9d9d9] rounded-[8px] h-[45px]"
              type="email"
              id="email"
              name="email"
              required
            />
          </div>
        </div>
        <button onClick={handleNext}>다음</button>
      </main>
    </div>
  );
}
