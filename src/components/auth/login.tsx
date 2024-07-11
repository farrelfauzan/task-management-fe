import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  errorMessage,
  loadingAuth,
  login,
  setErrorMessageAuth,
} from "../../lib/features/auth/auth";
import { useSelector } from "react-redux";
import { setSession } from "../../lib/features/session/session";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const dispatch = useDispatch();
  const loginErrorMessage = useSelector(errorMessage);
  const loading = useSelector(loadingAuth);

  const [_cookies, setCookie] = useCookies(["_auth_token"]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await dispatch(login(data));
      if (response.error) {
        throw new Error(response.error.message);
      }
      setCookie("_auth_token", response.payload.bearerToken, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      });
      dispatch(
        setSession({
          user: response.payload.user,
          role: response.payload.user.role,
          isLoggedIn: true,
        })
      );
      toast.success("Login successful", {
        autoClose: 1500,
      });
    } catch (error: any) {
      toast.error(error.message, {
        autoClose: 1500,
      });
    }
  };

  useEffect(() => {
    dispatch(setErrorMessageAuth(""));
  }, [dispatch]);

  return (
    <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 ">
      <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
        <h5 className="text-xl font-medium text-gray-900 text-center ">
          Welcome to{" "}
          <span className="text-orange-400 font-semibold text-2xl md:block hidden">
            EZ<span className="text-blue-400 font-semibold text-2xl">Task</span>
          </span>
        </h5>
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Email
          </label>
          <input
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            type="email"
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="name@company.com"
          />
          {errors.email && (
            <span className="text-red-500 text-sm font-medium ">
              Email is required
            </span>
          )}
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Password
          </label>
          <input
            {...register("password", { required: true })}
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
          {errors.password && (
            <span className="text-red-500 text-sm font-medium ">
              Password is required
            </span>
          )}
        </div>
        <button
          type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          Login to your account
        </button>
        <div className="flex items-center justify-center">
          {loginErrorMessage && (
            <span className="text-red-500 text-sm font-medium text-center">
              {loginErrorMessage}
            </span>
          )}
        </div>
        <div className="text-sm font-medium text-gray-500 ">
          Not registered?{" "}
          <Link className="text-blue-700 hover:underline" to="/register">
            Create account
          </Link>
        </div>
      </form>
      <div className="mt-8">
        <p className="text-center text-gray-500 text-sm font-medium ">
          &copy; 2024 EZTask. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
