import {join, login, kakaoLogin, logout} from '@/services/UserService.jsx';


export default function dshelper() {

    return (
        <div>
            <h1> DS Helper </h1>
            <button onClick={join} > 회원가입 </button>
            <button onClick={login} > 로그인 </button>
            <button onClick={kakaoLogin} > 카카오로그인 </button>
            <button onClick={logout} > 로그아웃 </button>
        </div>
    );
}
