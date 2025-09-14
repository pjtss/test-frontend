import BaseApi from '@/api/BaseApi.jsx';

export const join = async () => {
    await BaseApi.post("/join", {
        email: "user@gmail.com",
        password: "useruser",
        passwordCheck: "useruser"
    }).then((response) => {
        console.log("회원가입 성공", response.data);
        return response.data;
    }).catch((error) => {
        console.error("회원가입 실패", error);
        throw error;
    });
};

export const login = async () => {
    await BaseApi.post("/login", {
        email: "user@gmail.com",
        password: "useruser"
    }).then((response) => {
        console.log("로그인 성공", response.data);
        return response.data;
    }).catch((error) => {
        console.error("로그인 실패", error);
        throw error;
    });
};

// kakaoLogin.ts

export const kakaoLogin = async () => {
    try {
        const response = await BaseApi.get("/oauth/kakao/login-url");

        const kakaoRedirectUrl = response.data; // 서버가 반환한 URL (String)

        if (kakaoRedirectUrl) {
            // ✅ 실제 카카오 로그인 페이지로 리디렉션
            window.location.href = kakaoRedirectUrl;
        } else {
            console.error("URL 없음");
        }
    } catch (error) {
        console.error("로그인 실패", error);
        throw error;
    }
};



