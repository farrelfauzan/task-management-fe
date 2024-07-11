import { SubmitHandler, useForm } from "react-hook-form";
import { CreateUserDto } from "../../swagger/api";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  CreateUser,
  errorMessage,
  loadingAuth,
} from "../../lib/features/auth/auth";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Register = () => {
  const dispatch = useDispatch();

  const errorRegister = useSelector(errorMessage);

  const loading = useSelector(loadingAuth);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserDto>();

  const onSubmit: SubmitHandler<CreateUserDto> = async (data) => {
    try {
      const response = await dispatch(
        CreateUser({
          ...data,
          role: "admin",
        })
      );
      if (response.error) {
        throw new Error(response.error.message);
      }
      toast.success("User created successfully", {
        autoClose: 1500,
      });
      navigate("/login");
    } catch (error: any) {
      toast.error(error.message, {
        autoClose: 1500,
      });
    }
  };

  return (
    <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 ">
      <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center justify-between mb-4 pr-[100px]">
          <Link to="/login" className="text-blue-400">
            <ArrowLeft />
          </Link>
          <h5 className="text-xl font-medium text-gray-900 text-center ">
            Register to{" "}
            <span className="text-orange-400 font-semibold text-2xl md:block hidden">
              EZ
              <span className="text-blue-400 font-semibold text-2xl">Task</span>
            </span>
          </h5>
        </div>
        <div>
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Username
          </label>
          <input
            {...register("username", { required: true })}
            type="text"
            id="username"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
            placeholder="Username"
          />
          {errors.username && (
            <span className="text-red-500 text-sm font-medium">
              Username is required
            </span>
          )}
        </div>
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Email
          </label>
          <input
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            type="email"
            id="email"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
            placeholder="Email"
          />
          {errors.email && (
            <span className="text-red-500 text-sm font-medium">
              Email is required
            </span>
          )}
        </div>
        <div>
          <label
            htmlFor="firstName"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            First Name
          </label>
          <input
            {...register("firstName", { required: true })}
            type="text"
            id="firstName"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
            placeholder="First Name"
          />
          {errors.firstName && (
            <span className="text-red-500 text-sm font-medium">
              First Name is required
            </span>
          )}
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Last Name
          </label>
          <input
            {...register("lastName", { required: true })}
            type="text"
            id="lastName"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
            placeholder="Last Name"
          />
          {errors.lastName && (
            <span className="text-red-500 text-sm font-medium">
              Last Name is required
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
        {/* <div>
          <label
            htmlFor="role"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Select a role
          </label>
          <select
            {...register("role", { required: true })}
            id="role"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option selected>Choose a role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
          {errors.role && (
            <span className="text-red-500 text-sm font-medium">
              {errors.role.message}
            </span>
          )}
        </div> */}
        <button
          type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          Register
        </button>
        <div className="text-center">
          {errorRegister && (
            <span className="text-red-500 text-sm font-medium text-center">
              {errorRegister}
            </span>
          )}
        </div>
      </form>
    </div>
  );
};

export default Register;
