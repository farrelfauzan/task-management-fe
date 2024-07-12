import React from "react";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onClickDelete: () => void;
}

const ConfirmDeleteModal = ({
  isOpen,
  onClose,
  setOpen,
  onClickDelete,
}: ConfirmDeleteModalProps) => {
  function closeModal() {
    setOpen(false);
    onClose();
  }
  return (
    <div
      className={`w-screen h-screen place-items-center fixed top-0 left-0 ${
        isOpen ? "grid" : "hidden"
      }`}
      style={{ zIndex: 1000 }}
    >
      <div
        className="w-full h-full bg-black opacity-70 absolute left-0 top-0 "
        onClick={closeModal}
      ></div>
      <div className="bg-white w-1/3 h-1/4 z-30 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Confirm Delete</h1>
        <p className="mb-4">Are you sure you want to delete this data?</p>
        <div className="flex justify-end">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
            onClick={() => {
              setOpen(false);
              onClose();
            }}
          >
            Cancel
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md"
            onClick={() => {
              setOpen(false);
              onClose();
              onClickDelete();
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
