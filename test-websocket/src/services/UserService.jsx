import BaseApi from '@/api/BaseApi.jsx';

export const join = async (files) => {
  // DTO 객체 - DTO 클래스 필드에 맞춰 작성
  const dto = {
    email: "test@test.com",
    password: "testtest",
    passwordCheck: "testtest",
    organizationName: "testOrganization",
    organizationPhoneNumber: "010-1234-5678"
  };

  // FormData 생성
  const formData = new FormData();

  // dto -> JSON -> Blob 변환 후 append
  formData.append(
    "dto",
    new Blob([JSON.stringify(dto)], { type: "application/json" })
  );

  // 파일이 있으면 certifications로 append
  if (files) {
    Array.from(files).forEach((file) => {
      formData.append("certifications", file);
    });
  }

  // axios 요청
  return await BaseApi.post("/auth/join/organization", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
    .then((response) => {
      console.log("기관 회원가입 성공", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("기관 회원가입 실패", error);
      throw error;
    });
};

export const login = async () => {
    await BaseApi.post("/auth/login/organization", {
        email: "test@test.com",
        password: "testtest"
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


