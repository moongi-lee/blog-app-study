import {Link} from "react-router-dom";
import React, {useState} from "react";
import { app } from "firebaseApp";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {toast} from "react-toastify";
export default function SignupForm() {
  const [error, setError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setpasswordConfirm] = useState<string>("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const auth = getAuth(app);
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("회원가입 성공");
    } catch (error:any) {
      console.log(error);
      toast.error(error?.code);
    }
  }


  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    const {
      target: { name, value },
    } = e;

    if (name === "email") {
      setEmail(value);
      const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      if (!value?.match(validRegex)) {
        setError("이메일 형식이 올바르지 않음.");
      } else {
        setError("");
      }
    }

    if (name === "password") {
      setPassword(value);
      if (value.length < 8) {
        setError("비밀번호는 8자 이상이어야 합니다.");
      } else if (passwordConfirm?.length > 0 && value !== passwordConfirm) {
        setError("비밀번호와 비밀번호 확인값이 다릅니다. 다시 확인해주세요.");
      } else {
        setError("");
      }
    }

    if (name === "password_confirm") {
      setpasswordConfirm(value);
      if (value.length < 8) {
        setError("비밀번호는 8자 이상이어야 합니다.");
      } else if (password !== value) {
        setError("비밀번호와 값이 다릅니다. 다시 확인해주세요");
      } else {
        setError("");
      }
    }
  }

  return (
    <>
      <form onSubmit={onSubmit} className="form form--lg">
        <h1 className="form__title">회원가입</h1>
        <div className="form__block">
          <label htmlFor="email">이메일</label>
          <input type="email" name="email" id="email" required onChange={onChange} />
        </div>
        <div className="form__block">
          <label htmlFor="password">비밀번호</label>
          <input type="password" name="password" id="password" required onChange={onChange} />
        </div>
        <div className="form__block">
          <label htmlFor="password_confirm">비밀번호 홧인</label>
          <input type="password" name="password_confirm" id="password_confirm" required onChange={onChange} />
        </div>

        {error && error?.length > 0 && (
            <div className="form__block">
              <div className="form__error">{error}</div>
            </div>
        )}

        <div className="form__block">
          계정이 이미 있으신가요?
          <Link to="/login" className="form__link">로그인하기</Link>
        </div>
        <div className="form__block">
          <input type="submit" value="회원가입" className="form__btn--submit" disabled={error?.length > 0} />
        </div>
      </form>
    </>
  )
}