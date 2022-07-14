import { useEffect, useState } from "react";
import Modal from "react-modal";
import ReactStars from "react-stars";
import useInputState from "../hooks/useInputState";
import toast, { Toaster } from "react-hot-toast";
import api from "../utils/api.service";
import { IShow } from "../utils/types";
import Loading from "./Loading";

interface Props {
  closeHandler: () => void;
  open: boolean;
  show?: IShow;
  handleAddItem: (show: IShow) => void;
  handleEditItem: (newShow: IShow) => void;
}

export default function AddShow({
  closeHandler,
  open,
  show,
  handleAddItem,
  handleEditItem,
}: Props) {
  const edit = !!show;
  const title = useInputState();
  const app = useInputState();
  const review = useInputState();
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (show) {
      title.handleSet(show?.title);
      app.handleSet(show?.app);
      review.handleSet(show?.review);
      setRating(show?.rating);
    } else {
      title.handleReset();
      app.handleReset();
      review.handleReset();
      setRating(0);
    }
  }, [show]);

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

    if (title.value.length > 15) return toast.error("Title too long");

    try {
      let res;
      setLoading(true);
      if (edit) {
        res = await api.put(`/shows/edit/${show?.id}`, {
          title: title.value,
          app: app.value,
          review: review.value,
          rating,
        });
        handleEditItem(res.show);
      } else {
        res = await api.post("/shows/add", {
          title: title.value,
          app: app.value,
          review: review.value,
          rating,
        });
        handleAddItem(res.show);
      }

      setLoading(false);
      handleClose();
      toast.success(res.message, { duration: 1700 });
    } catch (err: any) {
      toast.error(err.response.data.message);
      setLoading(false);
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
        {!loading && (
          <>
            <h1>{edit ? "Edit Show" : "Add Show"}</h1>
            <section className="top">
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
            <section className="bottom">
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
                half={false}
              />
            </div>
            <button onClick={handleSubmit} className="btn">
              {edit ? "Update" : "Add"}
            </button>
          </>
        )}
        {loading && (
          <div className="loading">
            <Loading />
          </div>
        )}
      </Modal>
    </>
  );
}
