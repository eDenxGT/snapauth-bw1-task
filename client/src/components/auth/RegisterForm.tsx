import { useState } from "react";
import { useFormik } from "formik";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { userAuthSchema } from "@/utils/validators/authValidator.schema";
import { registerUser } from "@/services/authService";
import { AxiosError } from "axios";

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

const RegisterForm = ({ onSwitchToLogin }: RegisterFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (values: {
    email: string;
    password: string;
  }) => {
    try {
      setLoading(true);
      const data = await registerUser(values);
      if (data.success) {
        toast.success(data.message);
        onSwitchToLogin();
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Something went wrong");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: userAuthSchema,
    onSubmit: (values) => {
      handleRegister(values);
    },
  });

  return (
    <Card className="w-full max-w-md mx-auto bg-[#1e1e1e] border-[#333333]">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-white">
          Create an account
        </CardTitle>
        <CardDescription className="text-[#9e9e9e]">
          Enter your email and password to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-white">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              {...formik.getFieldProps("email")}
              className="bg-[#333333] text-white border-[#444444]"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-sm mt-1 text-[#ff4d4f]">
                {formik.errors.email}
              </div>
            )}
          </div>
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-white"
            >
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...formik.getFieldProps("password")}
                className="bg-[#333333] text-white border-[#444444] pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9e9e9e]"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <div className="text-sm mt-1 text-[#ff4d4f]">
                {formik.errors.password}
              </div>
            )}
          </div>
          <Button
            type="submit"
            className="w-full bg-[#00b37e] text-white hover:bg-[#00a070]"
            disabled={Object.keys(formik.errors).length > 0 || loading}
          >
            {loading ? "Creating account..." : "Create Account"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center border-t border-[#333333] pt-4">
        <p className="text-sm text-[#9e9e9e]">
          Already have an account?{" "}
          <Button
            variant="link"
            className="p-0 text-[#00b37e]  cursor-pointer hover:text-[#00a070]"
            onClick={onSwitchToLogin}
          >
            Sign in
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
};

export default RegisterForm;
