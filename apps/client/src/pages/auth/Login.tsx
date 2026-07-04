import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, type LoginPayload } from "../../validations/auth.schema";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../services/auth/auth.service";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";
import { saveAccessToken, saveUser } from "../../utils/auth.utils";

export default function Login() {
  const navigate = useNavigate();

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPayload>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      rememberMe: false,
    },
  });

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data, variables) => {
      saveAccessToken(data.accessToken, !!variables.rememberMe);
      saveUser(data.user);
      toast.success("Logged in successfully!");

      // Navigate to dashboard according to the instructions (or specific role paths)
      // The instructions say:
      // ADMIN -> /dashboard
      // EMPLOYEE -> /dashboard
      // But we have AdminRoute and EmployeeRoute. Let's just go to /dashboard as requested.
      navigate("/dashboard");
    },
  });

  const onSubmit = (data: LoginPayload) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Log in to your account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              {...formRegister("email")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              {...formRegister("password")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex items-center">
            <input
              id="rememberMe"
              type="checkbox"
              {...formRegister("rememberMe")}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="rememberMe"
              className="ml-2 block text-sm text-gray-900"
            >
              Remember me
            </label>
          </div>

          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {mutation.isPending ? "Logging in..." : "Log in"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
