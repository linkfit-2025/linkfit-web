// app/rest-timer/page.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";

// window.ReactNativeWebView.postMessage를 TypeScript에서 사용하기 위한 타입 정의
declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage: (message: string) => void;
    };
  }
}

export default function RestTimerPage() {
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [inputMinutes, setInputMinutes] = useState("0");
  const [inputSeconds, setInputSeconds] = useState("5");
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // 타이머 시작
  const startTimer = () => {
    const totalInputSeconds =
      parseInt(inputMinutes || "0") * 60 + parseInt(inputSeconds || "0");

    if (totalInputSeconds <= 0) {
      alert("휴식 시간은 0초보다 길게 설정해주세요!");
      return;
    }

    stopTimer(); // 기존 타이머 정리
    setRemainingSeconds(totalInputSeconds);
    setIsRunning(true);

    intervalRef.current = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          // 타이머 종료 조건
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          setIsRunning(false);

          // 알림 한 번만 전송
          sendRestFinishedToRN(
            "휴식 끝! 🤸‍♀️",
            "이제 다음 운동 세트를 시작할 시간이에요! 다시 힘내봐요!"
          );
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // 타이머 정지
  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
  };

  // 타이머 초기화
  const resetTimer = () => {
    stopTimer();
    setRemainingSeconds(0);
    setInputMinutes("0");
    setInputSeconds("5");
  };

  // React Native 메시지 전송
  const sendRestFinishedToRN = (title: string, messageContent: string) => {
    if (
      window.ReactNativeWebView &&
      typeof window.ReactNativeWebView.postMessage === "function"
    ) {
      const message = JSON.stringify({
        type: "TIMER_FINISHED",
        title,
        message: messageContent,
      });
      window.ReactNativeWebView.postMessage(message);
      console.log("✅ React Native WebView로 메시지 전송 완료:", message);
    } else {
      console.warn(
        "⚠️ ReactNativeWebView 객체가 없거나 postMessage가 정의되지 않았습니다."
      );
      alert(`${title}\n${messageContent}`);
    }
  };

  // 언마운트 시 인터벌 정리
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // 남은 시간을 mm:ss로 변환
  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div
      style={{
        padding: "25px",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f0f4f8",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 style={{ color: "#6a0dad", marginBottom: "30px" }}>
        🧘‍♂️ 휴식 시간 타이머 🧘‍♀️
      </h1>

      <div
        style={{
          fontSize: "6em",
          fontWeight: "bold",
          color: "#34495e",
          marginBottom: "40px",
          letterSpacing: "2px",
        }}
      >
        {formatTime(remainingSeconds)}
      </div>

      {!isRunning && remainingSeconds === 0 && (
        <div
          style={{
            marginBottom: "30px",
            display: "flex",
            gap: "15px",
            alignItems: "center",
          }}
        >
          <input
            type="number"
            value={inputMinutes}
            onChange={(e) => {
              const value = e.target.value;
              setInputMinutes(value.startsWith("-") ? "0" : value);
            }}
            placeholder="분"
            min="0"
            style={inputStyle}
          />
          <span
            style={{ fontSize: "1.5em", fontWeight: "bold", color: "#555" }}
          >
            분
          </span>
          <input
            type="number"
            value={inputSeconds}
            onChange={(e) => {
              const value = e.target.value;
              const parsedValue = parseInt(value);
              if (isNaN(parsedValue) || parsedValue < 0) {
                setInputSeconds("0");
              } else if (parsedValue > 59) {
                setInputSeconds("59");
              } else {
                setInputSeconds(value);
              }
            }}
            placeholder="초"
            min="0"
            max="59"
            style={inputStyle}
          />
          <span
            style={{ fontSize: "1.5em", fontWeight: "bold", color: "#555" }}
          >
            초
          </span>
        </div>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginBottom: "25px",
        }}
      >
        <button
          onClick={startTimer}
          disabled={
            isRunning ||
            (parseInt(inputMinutes || "0") === 0 &&
              parseInt(inputSeconds || "0") === 0 &&
              remainingSeconds === 0)
          }
          style={{ ...buttonStyle, backgroundColor: "#28a745" }}
        >
          {isRunning ? "진행 중..." : "휴식 시작 💪"}
        </button>
        <button
          onClick={stopTimer}
          disabled={!isRunning}
          style={{ ...buttonStyle, backgroundColor: "#dc3545" }}
        >
          정지
        </button>
        <button
          onClick={resetTimer}
          style={{ ...buttonStyle, backgroundColor: "#ffc107", color: "#333" }}
        >
          초기화
        </button>
      </div>

      <p style={{ marginTop: "40px", fontSize: "1.1em", color: "#777" }}>
        충분한 휴식은 더 나은 퍼포먼스를 위한 필수 요소입니다. 👍
      </p>
    </div>
  );
}

// 스타일
const inputStyle: React.CSSProperties = {
  padding: "10px 15px",
  fontSize: "1.2em",
  borderRadius: "8px",
  border: "1px solid #ccc",
  width: "80px",
  textAlign: "center",
  outline: "none",
  transition: "border-color 0.3s ease",
};

const buttonStyle: React.CSSProperties = {
  padding: "15px 30px",
  fontSize: "1.3em",
  borderRadius: "10px",
  border: "none",
  cursor: "pointer",
  color: "white",
  fontWeight: "bold",
  transition: "background-color 0.3s ease, transform 0.1s ease",
  boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
};
