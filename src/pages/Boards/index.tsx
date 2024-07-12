/* eslint-disable @typescript-eslint/no-explicit-any */
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import { Columns } from "../../types";
import { AddOutline } from "react-ionicons";
import AddModal from "../../components/Modals/AddModal";
import Task from "../../components/Task";
import { useDispatch } from "react-redux";
import {
  getTasks,
  setData,
  setTask,
  taskData,
  updateTask,
} from "../../lib/features/task/task";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import DetailModal from "../../components/Modals/DetailModal";

const Home = () => {
  const dispatch = useDispatch();
  const task = useSelector(taskData);

  const [_columns, _setColumns] = useState<Columns>(task);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState("");
  const [taskId, setTaskId] = useState("");

  const [modalDetailOpen, setModalDetailOpen] = useState(false);

  const openModal = (columnId: any) => {
    setSelectedColumn(columnId);
    setModalOpen(true);
  };

  const onCloseModalDetail = () => {
    setModalDetailOpen(false);
  };

  const closeModal = () => {
    setModalOpen(false);
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

  async function onDragEnd(result: any) {
    dispatch(
      setData({
        ...task,
        [result.destination.droppableId]: {
          ...task[result.destination.droppableId],
          items:
            result.destination.droppableId === result.source.droppableId
              ? task[result.destination.droppableId].items
              : [
                  ...task[result.source.droppableId].items.filter(
                    (_item: any, index: any) => index !== result.source.index
                  ),
                  task[result.source.droppableId].items[result.source.index],
                ],
        },
        [result.source.droppableId]: {
          ...task[result.source.droppableId],
          items:
            result.destination.droppableId === result.source.droppableId
              ? task[result.source.droppableId].items
              : task[result.source.droppableId].items.filter(
                  (_item: any, index: any) => index !== result.source.index
                ),
        },
        [result.destination.droppableId]: {
          ...task[result.destination.droppableId],
          items: [
            ...task[result.destination.droppableId].items,
            task[result.source.droppableId].items[result.source.index],
          ],
        },
      })
    );
    try {
      const payload = {
        status: result.destination.droppableId,
      };
      const response = await dispatch(
        updateTask({
          id: task[result.source.droppableId].items[result.source.index].id,
          data: payload,
        })
      );
      if (response.payload) {
        toast.success(
          `Task updated to ${result.destination.droppableId.charAt(0).toUpperCase() + result.destination.droppableId.slice(1).toLowerCase()}`,
          {
            autoClose: 1500,
          }
        );
      }

      if (response.error) {
        throw new Error("Failed to update task");
      }
    } catch (error) {
      toast.error("Failed to update task", {
        autoClose: 1500,
      });
    }
  }
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
          onDragEnd={(result: any) => {
            onDragEnd(result);
          }}
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
                                <Task
                                  provided={provided}
                                  task={task}
                                  onClickDetail={(id) => {
                                    dispatch(setTask(task));
                                    setTaskId(id);
                                    setModalDetailOpen(true);
                                  }}
                                />
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
      {modalDetailOpen && (
        <DetailModal
          isOpen={modalDetailOpen}
          onClose={onCloseModalDetail}
          setOpen={setModalDetailOpen}
          taskId={taskId}
        />
      )}
    </>
  );
};

export default Home;
