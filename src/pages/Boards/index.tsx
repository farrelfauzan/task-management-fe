/* eslint-disable @typescript-eslint/no-explicit-any */
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
// import { Board } from "../../data/board";
import { Columns } from "../../types";
import { onDragEnd } from "../../helpers/onDragEnd";
import { AddOutline } from "react-ionicons";
import AddModal from "../../components/Modals/AddModal";
import Task from "../../components/Task";
import { useDispatch } from "react-redux";
import { getTasks, taskData } from "../../lib/features/task/task";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Home = () => {
  const dispatch = useDispatch();
  const task = useSelector(taskData);

  const [columns, setColumns] = useState<Columns>(task);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState("");

  const openModal = (columnId: any) => {
    console.log(columnId);
    setSelectedColumn(columnId);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleAddTask = (taskData: any) => {
    const newBoard = { ...columns };
    newBoard[selectedColumn].items.push(taskData);
  };

  const addNewTask = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getTasks());
      } catch (error) {
        toast.error("Failed to fetch data");
      }
    };
    fetchData();
  }, []);

  console.log(columns);

  console.log(task);
  return (
    <>
      {task && Object.keys(task).length === 0 ? (
        <div className="w-full flex flex-col items-center justify-center h-[80vh]">
          <h1 className="text-orange-500 font-medium text-[20px]">
            No task available
          </h1>
          <div
            onClick={() => addNewTask()}
            className="flex cursor-pointer items-center justify-center gap-1 py-[10px] md:w-[20%] w-full opacity-90 bg-white rounded-lg shadow-sm text-[#555] font-medium text-[15px]"
          >
            <AddOutline color={"#555"} />
            Add New Task
          </div>
        </div>
      ) : (
        <DragDropContext
          onDragEnd={(result: any) => onDragEnd(result, columns, setColumns)}
        >
          <div className="w-full flex items-start justify-between px-5 pb-8 md:gap-0 gap-10">
            {task &&
              Object.entries(task).map(([columnId, column]: any) => (
                <div className="w-full flex flex-col gap-0" key={columnId}>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided: any) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="flex flex-col md:w-[290px] w-[250px] gap-3 items-center py-5"
                      >
                        <div className="flex items-center justify-center py-[10px] w-full bg-white rounded-lg shadow-sm text-[#555] font-medium text-[15px]">
                          {column.name}
                        </div>
                        {column.items.map((task: any, index: any) => (
                          <Draggable
                            key={task.id.toString()}
                            draggableId={task.id.toString()}
                            index={index}
                          >
                            {(provided: any) => (
                              <>
                                <Task provided={provided} task={task} />
                              </>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                  <div
                    onClick={() => openModal(columnId)}
                    className="flex cursor-pointer items-center justify-center gap-1 py-[10px] md:w-[90%] w-full opacity-90 bg-white rounded-lg shadow-sm text-[#555] font-medium text-[15px]"
                  >
                    <AddOutline color={"#555"} />
                    Add Task
                  </div>
                </div>
              ))}
          </div>
        </DragDropContext>
      )}
      <AddModal
        isOpen={modalOpen}
        onClose={closeModal}
        setOpen={setModalOpen}
        defaultStatus={selectedColumn}
      />
    </>
  );
};

export default Home;
