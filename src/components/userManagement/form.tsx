import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  getUsers,
  setFormUser,
  userData,
} from "../../lib/features/user/user";
import { User } from "../../swagger/api";
import ConfirmDeleteModal from "../modals/confirm-delete";
import AddUserModal from "../modals/add-user";
import EditUserModal from "../modals/edit-user";

const UserItem = ({
  user,
  deleteUser,
  editUser,
}: {
  user: User;
  deleteUser: (id: string) => void;
  editUser: () => void;
}) => {
  const dispatch = useDispatch();

  function onClickItem() {
    dispatch(setFormUser(user));
    editUser();
  }
  return (
    <a
      className="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100"
      key={user.id}
    >
      <div className="grid grid-cols-4">
        <h2 className="text-lg font-semibold">{user.username}</h2>
        <p className="text-gray-500">{user.email}</p>
        <span
          className={`px-3 py-1 w-20 text-center items-center rounded-full text-xs font-medium ${user.role === "Admin" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}`}
        >
          {user.role}
        </span>
        <div className="flex justify-between px-24">
          <button
            className="text-red-500 rounded-lg bg-red-300 px-4 py-1 hover:bg-red-300/80"
            onClick={() => deleteUser(user.id)}
          >
            Delete
          </button>
          <button
            className="text-blue-500 rounded-lg bg-blue-300 px-4 py-1 hover:bg-blue-300/80"
            onClick={onClickItem}
          >
            Edit
          </button>
        </div>
      </div>
    </a>
  );
};

const ListUsers = () => {
  const dispatch = useDispatch();
  const users = useSelector(userData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [id, setId] = useState("");

  const [openModalAdd, setOpenModalAdd] = useState(false);

  const [openModalEdit, setOpenModalEdit] = useState(false);

  function closeModalEdit() {
    setOpenModalEdit(false);
  }

  function closeModalAdd() {
    setOpenModalAdd(false);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getUsers());
      } catch (error) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  async function onClickDeleteUser(id: string) {
    try {
      await dispatch(deleteUser(id));
    } catch (error) {
      setError("Failed to delete user");
    } finally {
      setLoading(false);
    }
  }

  function onClose() {
    setOpenModalDelete(false);
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <section className="bg-white h-full p-8 m-8 rounded-lg">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <button
        className="bg-blue-500 text-white rounded-lg p-2 my-4"
        onClick={() => setOpenModalAdd(true)}
      >
        Add User
      </button>
      <div className="space-y-4">
        {users.map((user: User) => (
          <>
            <UserItem
              user={user}
              key={user.id}
              deleteUser={() => {
                setOpenModalDelete(true);
                setId(user.id);
              }}
              editUser={() => {
                setOpenModalEdit(true);
                setId(user.id);
              }}
            />
          </>
        ))}
        <ConfirmDeleteModal
          isOpen={openModalDelete}
          onClose={onClose}
          setOpen={setOpenModalDelete}
          onClickDelete={() => onClickDeleteUser(id)}
        />
        <AddUserModal
          isOpen={openModalAdd}
          onClose={closeModalAdd}
          setOpen={setOpenModalAdd}
        />
        {openModalEdit && (
          <EditUserModal
            isOpen={openModalEdit}
            onClose={closeModalEdit}
            setOpen={setOpenModalEdit}
            userId={id}
          />
        )}
      </div>
    </section>
  );
};

export default ListUsers;
