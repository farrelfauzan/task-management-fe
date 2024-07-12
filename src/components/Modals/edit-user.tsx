import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { UpdateUserDto } from "../../swagger/api";
import { toast } from "react-toastify";
import { updateUser, userForm } from "../../lib/features/user/user";
import { useSelector } from "react-redux";

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string;
}

const EditUserModal = ({
  isOpen,
  onClose,
  setOpen,
  userId,
}: AddUserModalProps) => {
  const dispatch = useDispatch();

  const formUser = useSelector(userForm);
  const closeModal = () => {
    setOpen(false);
    onClose();
  };

  const { register, handleSubmit } = useForm<UpdateUserDto>({
    defaultValues: {
      username: formUser.username,
      email: formUser.email,
      firstName: formUser.firstName,
      lastName: formUser.lastName,
    },
  });

  const onSubmit: SubmitHandler<UpdateUserDto> = async (data) => {
    try {
      const response = await dispatch(
        updateUser({
          id: userId,
          data: data,
        })
      );
      if (response.error) {
        throw new Error(response.error.message);
      }

      toast.success("User created successfully", {
        autoClose: 1500,
      });

      closeModal();
    } catch (error: any) {
      toast.error(error.message, {
        autoClose: 1500,
      });
    }
  };

  return (
    <div
      className={`w-screen h-screen place-items-center fixed top-0 left-0 ${
        isOpen ? "grid" : "hidden"
      }`}
    >
      <div
        className="w-full h-full bg-black opacity-70 absolute left-0 top-0 z-20"
        onClick={closeModal}
      ></div>
      <form
        className="space-y-4 md:w-[30vw] w-[90%] bg-white rounded-lg shadow-md z-50 flex flex-col items-center gap-3 px-5 py-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full">
          <h5 className="text-xl font-medium text-gray-900 text-center capitalize">
            Edit User
          </h5>
          <div className="w-full">
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
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Email
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              id="email"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
            />
          </div>
          <div className="w-full">
            <label
              className="block mb-2 text-sm font-medium text-gray-900"
              htmlFor="firstName"
            >
              First Name
            </label>
            <input
              {...register("firstName", { required: true })}
              type="text"
              id="firstName"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
            />
          </div>
          <div className="w-full">
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
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditUserModal;
