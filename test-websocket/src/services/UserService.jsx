import BaseApi from '@/api/BaseApi.jsx';

export const join = async (files) => {
  // DTO 만들기
  const dto = {
    email: "user@gmail.com",
    password: "useruser",
    passwordCheck: "useruser"
  };

  // FormData 생성
  const formData = new FormData();
  formData.append(
    "dto",
    new Blob([JSON.stringify(dto)], { type: "application/json" })
  );

  // 파일이 있다면 certifications에 추가
  if (files) {
    Array.from(files).forEach((file) => {
      formData.append("certifications", file);
    });
  }

  // 요청 보내기
  return await BaseApi.post("/auth/join/organization", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
    .then((response) => {
      console.log("회원가입 성공", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("회원가입 실패", error);
      throw error;
    });
};

export const login = async () => {
    await BaseApi.post("/auth/login/organization", {
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
        // window.location.href = "https://www.dshelper.kro.kr/oauth/kakao/login-url";
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

export const logout = async () => {
    try {
        // window.location.href = "https://www.dshelper.kro.kr/oauth/kakao/login-url";
        const response = await BaseApi.get("/logout");
        console.log("로그아웃 성공", response.data);
        return response.data;
    } catch (error) {
        console.error("로그인 실패", error);
        throw error;
    }
};


