import baseApi from "api/BaseApi.jsx";



export default function dshelper() {

    const join = () => {
        baseApi.post('/join', {
            "email": "user1@gmail.com",
            "password": "useruser",
            "passwordCheck": "useruser"
        }.then(res => {
            console.log('회원가입 성공', res);
        }).catch(err => {
            console.error('회원가입 실패', err);
        }));
    };

      const login = () => {
        baseApi.post('/login', {
            "email": "user1@gmail.com",
            "password": "useruser"
        }.then(res => {
            console.log('로그인 성공', res);
        }).catch(err => {
            console.error('로그인 실패', err);
        }));
    };

    return (
        <div>
            <h1>DS Helper</h1>
            <button onClick={join} >회원가입</button>
            <button onClick={login} >로그인</button>
        </div>
    );
}
