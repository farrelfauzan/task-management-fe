import { SubmitHandler, useForm } from "react-hook-form";
import { UpdateUserDto } from "../../../swagger/api";
import { sessionData } from "../../../lib/features/session/session";
import { useSelector } from "react-redux";

const SettingsForm = () => {
  const session = useSelector(sessionData);
  console.log(session);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserDto>({
    defaultValues: {
      username: session.user?.username,
      email: session.user?.email,
      firstName: session.user?.firstName,
      lastName: session.user?.lastName,
    },
  });

  const onSubmit: SubmitHandler<UpdateUserDto> = async (data) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
      <div className=" flex-col gap-4 grid grid-cols-2">
        <div className="w-ful l">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            {...register("username", { required: true })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
          />
          {errors.username && (
            <span className="text-red-500 text-sm">username is required</span>
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
            type="email"
            id="email"
            {...register("email", { required: true })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">Email is required</span>
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
            type="text"
            id="firstName"
            {...register("firstName", { required: true })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
          />
          {errors.firstName && (
            <span className="text-red-500 text-sm">First Name is required</span>
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
            type="text"
            id="lastName"
            {...register("lastName", { required: true })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
          />
          {errors.lastName && (
            <span className="text-red-500 text-sm">Last Name is required</span>
          )}
        </div>
        <button
          type="submit"
          className="w-full mt-3 rounded-md h-9 bg-orange-400 text-blue-50 font-medium col-start-2"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default SettingsForm;
