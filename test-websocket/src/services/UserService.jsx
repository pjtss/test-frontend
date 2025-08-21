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
