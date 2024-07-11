import { SubmitHandler, useForm } from "react-hook-form";
import { UpdateTaskDto, User } from "../../swagger/api";
import {
  deleteTask,
  taskDetail,
  updateTask,
} from "../../lib/features/task/task";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useState } from "react";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { userData } from "../../lib/features/user/user";
import ConfirmDeleteModal from "./confirm-delete";

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  taskId: string;
}

const DetailModal = ({
  isOpen,
  onClose,
  setOpen,
  taskId,
}: DetailModalProps) => {
  const dispatch = useDispatch();

  const task = useSelector(taskDetail);
  const users = useSelector(userData);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  function onCloseDeleteModal() {
    setOpenDeleteModal(false);
  }

  const closeModal = () => {
    setOpen(false);
    onClose();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateTaskDto>({
    defaultValues: {
      title: task.title,
      description: task.description,
      status: task.status,
      dueDate: dayjs(task.dueDate).format("YYYY-MM-DD"),
      userId: task.userId,
    },
  });

  const onSubmit: SubmitHandler<UpdateTaskDto> = async (data) => {
    try {
      const payload = {
        ...data,
        dueDate: dayjs(data.dueDate).format("YYYY-MM-DD"),
      };
      const response = await dispatch(
        updateTask({
          id: taskId,
          data: payload,
        })
      );
      if (response.error) {
        throw new Error("Failed to update task");
      }
      toast.success(`Task updated`, {
        autoClose: 1500,
      });
      closeModal();
    } catch (error) {
      toast.error("Failed to update task", {
        autoClose: 1500,
      });
      console.log(error);
    }
  };

  async function onClickDelete() {
    try {
      const response = await dispatch(deleteTask(taskId));
      if (response.error) {
        throw new Error("Failed to delete task");
      }
      toast.success("Task deleted", {
        autoClose: 1500,
      });

      // window.location.reload();
      closeModal();
    } catch (error) {
      toast.error("Failed to delete task", {
        autoClose: 1500,
      });
    }
  }
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
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 md:w-[30vw] w-[90%] bg-white rounded-lg shadow-md z-50 flex flex-col items-center gap-3 px-5 py-6"
      >
        <div className="w-full">
          <h5 className="text-xl font-medium text-gray-900 text-center capitalize">
            Task Detail
          </h5>
          <button
            onClick={() => {
              setOpenDeleteModal(true);
            }}
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-gray-100 hover:bg-red-500/90  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
          >
            Delete Task
          </button>

          <div className="mt-2">
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
            <div className="w-full mt-2">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Description
              </label>
              <input
                {...register("description", { required: true })}
                type="text"
                id="title"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                placeholder="Title"
              />
            </div>
            <div className="w-full mt-2">
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700"
              >
                Status
              </label>
              <select
                {...register("status")}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
              >
                <option value="backlog">Backlog</option>
                <option value="todo">To Do</option>
                <option value="pending">Pending</option>
                <option value="inprogress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
            <div className="w-full mt-2">
              <label
                htmlFor="dueDate"
                className="block text-sm font-medium text-gray-700"
              >
                Due Date
              </label>
              <input
                type="date"
                {...register("dueDate")}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
              />
            </div>
            <div className="w-full mt-2">
              <label
                htmlFor="userId"
                className="block text-sm font-medium text-gray-700"
              >
                Assign To
              </label>
              <select
                {...register("userId")}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
              >
                {users.map((user: User) => (
                  <option value={user.id}>
                    {user.firstName} {user.lastName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="submit"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Save
          </button>
          <button
            onClick={closeModal}
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Cancel
          </button>
        </div>
      </form>
      {openDeleteModal && (
        <ConfirmDeleteModal
          taskId={taskId}
          isOpen={openDeleteModal}
          onClose={onCloseDeleteModal}
          setOpen={setOpenDeleteModal}
          onClickDelete={onClickDelete}
        />
      )}
    </div>
  );
};

export default DetailModal;
