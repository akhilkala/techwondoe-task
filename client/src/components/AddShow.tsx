import { useState } from "react";
import Modal from "react-modal";
import ReactStars from "react-stars";
import useInputState from "../hooks/useInputState";
import toast, { Toaster } from "react-hot-toast";
import api from "../utils/api.service";
import { IShow } from "../utils/types";

interface Props {
  closeHandler: () => void;
  open: boolean;
  edit?: boolean;
  show?: IShow;
}

export default function AddShow({ closeHandler, open, edit, show }: Props) {
  const title = useInputState(edit ? show?.title : "");
  const app = useInputState(edit ? show?.app : "");
  const review = useInputState(edit ? show?.review : "");
  const [rating, setRating] = useState(edit ? show?.rating : 0);

  const handleClose = () => {
    setRating(0);
    title.handleReset();
    app.handleReset();
    review.handleReset();
    closeHandler();
  };

  const handleSubmit = async () => {
    if (!title.value || !app.value || !review.value || !rating)
      return toast.error("All fields are required");

    try {
      let res;
      if (edit) {
        res = await api.put(`/shows/edit/${show?.id}`, {
          title: title.value,
          app: app.value,
          review: review.value,
          rating,
        });
      } else {
        res = await api.post("/shows/add", {
          title: title.value,
          app: app.value,
          review: review.value,
          rating,
        });
      }

      handleClose();
      toast.success(res.message);
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <>
      <Toaster />
      <Modal
        onRequestClose={handleClose}
        className="add-show"
        overlayClassName="add-show__overlay"
        isOpen={open}
      >
        <h1>{edit ? "Edit Show" : "Add Show"}</h1>
        <section>
          <input
            {...title.inputProps}
            type="text"
            placeholder="Title"
            className="input"
          />
          <input
            {...app.inputProps}
            type="text"
            placeholder="Streaming app"
            className="input"
          />
        </section>
        <section>
          <textarea
            {...review.inputProps}
            placeholder="Review"
            className="input"
          />
        </section>
        <div className="rating">
          <span className="label">Rating: </span>
          <ReactStars
            count={5}
            value={rating}
            onChange={(val) => setRating(val)}
            size={30}
            color2={"#f7b32d"}
          />
        </div>
        <button onClick={handleSubmit} className="btn">
          Add
        </button>
      </Modal>
    </>
  );
}
