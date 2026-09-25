import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { loginWithEmail, loginWithGoogle } from "../../store/authSlice";

import { AuthHeader } from "../AuthPage/AuthHeader";
import { AuthHero } from "../AuthPage/AuthHero";
import { LoginForm } from "../AuthPage/LoginForm";
import { AuthFooter } from "../AuthPage/AuthFooter";

import styles from "../AuthPage/AuthPage.module.css";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.auth);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const result = await dispatch(loginWithEmail({ email, password }));

    if (loginWithEmail.fulfilled.match(result)) {
      navigate("/");
    }
  };

  const handleGoogleLogin = () => {
    dispatch(loginWithGoogle());
  };

  return (
    <main className="min-h-screen w-full bg-[#0d071e] text-slate-200 flex flex-col justify-between p-6 lg:p-10 relative overflow-hidden font-sans">
      <div className={`${styles.blobPurple} absolute top-1/4 left-1/6 w-96 h-96 bg-[#6f4bf2] rounded-full blur-[130px] pointer-events-none`} />      
      <div className="absolute bottom-1/4 right-1/6 w-96 h-96 bg-[#cdf27e]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className={`${styles.blobLime} absolute bottom-1/4 right-1/6 w-96 h-96 bg-[#cdf27e] rounded-full blur-[130px] pointer-events-none`} />
      <AuthHeader />

      <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center my-auto py-8 z-10">
        <AuthHero />

        <div className="lg:col-span-6 flex justify-center lg:justify-end">
          <LoginForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            loading={loading}
            error={error}
            handleSubmit={handleSubmit}
            handleGoogleLogin={handleGoogleLogin}
          />
        </div>
      </div>

      <AuthFooter />
    </main>
  );
}