import { IShow } from "../utils/types";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import api from "../utils/api.service";
import toast, { Toaster } from "react-hot-toast";

interface Props {
  show: IShow;
  handleDeleteItem: () => void;
}

export default function Show({ show, handleDeleteItem }: Props) {
  const handleDelete = async () => {
    try {
      const res = await api.deleteCall(`/shows/delete/${show.id}`);
      handleDeleteItem();
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  };

  const confirmDelete = () => {
    toast((t) => (
      <span className="show-toast-delete">
        Are you sure?
        <button
          onClick={() => {
            handleDelete();
            toast.dismiss(t.id);
          }}
        >
          Delete
        </button>
      </span>
    ));
  };

  return (
    <>
      <Toaster />
      <div className="show">
        <div className="actions">
          <div className="edit">
            <AiFillEdit />
          </div>
          <div className="delete" onClick={confirmDelete}>
            <AiFillDelete />
          </div>
        </div>
        <h2>{show.title}</h2>
      </div>
    </>
  );
}
