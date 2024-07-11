/* eslint-disable @typescript-eslint/no-explicit-any */
import { TimeOutline } from "react-ionicons";
import { TaskT } from "../../types";
import dayjs from "dayjs";

interface TaskProps {
  task: TaskT;
  provided: any;
}

const Task = ({ task, provided }: TaskProps) => {
  const { title, description, dueDate, id, status } = task;

  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className="w-full cursor-grab bg-[#fff] flex flex-col justify-between gap-3 items-start shadow-sm rounded-xl px-3 py-4"
    >
      <div className="w-full flex items-start flex-col gap-0">
        <span className="text-[15.5px] font-medium text-[#555]">{title}</span>
        <span className="text-[13.5px] text-gray-500">{description}</span>
      </div>
      <div className="w-full border border-dashed"></div>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-1">
          <TimeOutline color={"#666"} width="19px" height="19px" />
          <span className="text-[13px] text-gray-700">
            {dayjs(dueDate).format("DD-MM-YYYY")}
          </span>
        </div>
        <div
          className={`w-[60px] rounded-full h-[5px] ${
            status === "pending"
              ? "bg-red-500"
              : status === "backlog"
                ? "bg-orange-500"
                : "bg-blue-500"
          }`}
        ></div>
      </div>
    </div>
  );
};

export default Task;
