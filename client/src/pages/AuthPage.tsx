import { useState } from "react";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#121212]">
      <div className="w-full max-w-md mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-[#00b37e]">
          Welcome
        </h1>
        <p className="text-[#9e9e9e] mt-2">
          {isLogin ? "Sign in to access your account" : "Join us by creating a new account"}
        </p>
      </div>

      <div className="w-full max-w-md">
        {isLogin ? (
          <LoginForm onSwitchToRegister={() => setIsLogin(false)} />
        ) : (
          <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
        )}
      </div>

      <div className="mt-12 text-center text-sm text-[#9e9e9e]">
        <p>
          &copy; {new Date().getFullYear()} SnapAuth. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Auth;
