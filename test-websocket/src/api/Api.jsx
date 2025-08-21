// src/api/api.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080", // .env에 정의
  withCredentials: true, // 쿠키 인증 사용 시
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken"); // JWT 토큰 저장된 경우
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 401 Unauthorized → 토큰 만료 시 처리
    if (error.response?.status === 401) {
      console.warn("토큰 만료됨, 로그아웃 처리 필요");
      // 예: refresh 토큰 요청 or 로그인 페이지 이동
    }
    return Promise.reject(error);
  }
);

export default api;