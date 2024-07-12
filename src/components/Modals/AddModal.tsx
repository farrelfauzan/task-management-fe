/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CreateTaskDto, User } from "../../swagger/api";
import { useDispatch } from "react-redux";
import { getUsers, setUsers, userData } from "../../lib/features/user/user";
import { useSelector } from "react-redux";
import { createTask } from "../../lib/features/task/task";
import { toast } from "react-toastify";

interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  defaultStatus: string;
}

const AddModal = ({
  isOpen,
  onClose,
  setOpen,
  defaultStatus,
}: AddModalProps) => {
  const dispatch = useDispatch();
  const users = useSelector(userData);

  const closeModal = () => {
    setOpen(false);
    onClose();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateTaskDto>({
    defaultValues: {
      title: "",
      description: "",
      status: defaultStatus,
      dueDate: "",
      userId: "",
    },
  });

  const onSubmit: SubmitHandler<CreateTaskDto> = async (data) => {
    try {
      const response = await dispatch(
        createTask({
          ...data,
          status: defaultStatus,
        })
      );
      if (response.error) {
        throw new Error(response.error.message);
      }
      toast.success("Task created successfully", {
        autoClose: 1500,
      });
      reset();
      closeModal();
    } catch (error: any) {
      toast.error(error.message, {
        autoClose: 1500,
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchUsers = await dispatch(getUsers());
        dispatch(setUsers(fetchUsers.payload));
      } catch (error: any) {
        toast.error(error.message, {
          autoClose: 1500,
        });
      }
    };

    fetchData();
  }, []);

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
            Create {defaultStatus} Task
          </h5>
          <div className="w-full">
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Title
            </label>
            <input
              {...register("title", { required: true })}
              type="text"
              id="title"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
              placeholder="Title"
            />
            {errors.title && (
              <span className="text-red-500">Title is required</span>
            )}
          </div>
          <div className="w-full">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Description
            </label>
            <input
              {...register("description", { required: true })}
              type="text"
              id="description"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
              placeholder="Description"
            />
            {errors.description && (
              <span className="text-red-500">Description is required</span>
            )}
          </div>
          <div className="w-full">
            <label
              htmlFor="dueDate"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Deadline
            </label>
            <input
              {...register("dueDate", { required: true })}
              type="date"
              id="dueDate"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
              placeholder="Deadline"
            />
            {errors.dueDate && (
              <span className="text-red-500">Deadline is required</span>
            )}
          </div>
          <div className="w-full">
            <label
              htmlFor="tags"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Assign To
            </label>
            <select
              {...register("userId", { required: true })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
            >
              {users.map((user: User) => (
                <option value={user.id} key={user.id}>
                  {user.firstName} {user.lastName}
                </option>
              ))}
            </select>
            {errors.userId && (
              <span className="text-red-500">Assignee is required</span>
            )}
          </div>
          <button
            type="submit"
            className="w-full mt-3 rounded-md h-9 bg-orange-400 text-blue-50 font-medium"
          >
            Submit Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddModal;
