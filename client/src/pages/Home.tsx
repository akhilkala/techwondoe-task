import { useEffect, useState } from "react";
import AddShow from "../components/AddShow";
import Show from "../components/Show";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api.service";
import { IShow } from "../utils/types";
import { FiSearch } from "react-icons/fi";
import useInputState from "../hooks/useInputState";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../components/Loading";

function Home() {
  const [addShowOpen, setAddShowOpen] = useState(false);
  const auth = useAuth();
  const [shows, setShows] = useState<IShow[]>([]);
  const [editShowId, setEditShowId] = useState("");
  const search = useInputState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/shows/all")
      .then((res) => setShows(res.shows))
      .catch((err: any) => toast.error(err.response.data.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!addShowOpen) setEditShowId("");
  }, [addShowOpen]);

  const handleDeleteItem = (id: string) => {
    setShows((prev) => prev.filter((show) => show.id !== id));
  };

  const handleAddItem = (show: IShow) => {
    setShows((prev) => [...prev, show]);
  };

  const handleOpenEdit = (id: string) => {
    setEditShowId(id);
    setAddShowOpen(true);
  };

  const handleEditItem = (newShow: IShow) => {
    setShows((prev) =>
      prev.map((show) => (show.id === newShow.id ? newShow : show))
    );
  };

  const getFilteredShows = () => {
    return shows.filter((show) => {
      const searchTerm = `${show.title} ${show.app}`;
      return searchTerm.toLowerCase().includes(search.value.toLowerCase());
    });
  };

  return (
    <>
      <Toaster />
      <AddShow
        handleAddItem={handleAddItem}
        handleEditItem={handleEditItem}
        open={addShowOpen}
        closeHandler={() => setAddShowOpen(false)}
        show={shows.find((show) => show.id === editShowId)}
      />
      <div className="home">
        <header className="top">
          <h1>Your TV Shows</h1>
          <aside>
            <button onClick={() => setAddShowOpen(true)} className="btn">
              Add Show
            </button>
            <button onClick={auth?.logout} className="logout">
              Logout
            </button>
          </aside>
        </header>
        <main>
          {!!shows.length && (
            <div className="search">
              <FiSearch />
              <input type="text" placeholder="Search" {...search.inputProps} />
            </div>
          )}
          {!!shows.length && (
            <div className="shows">
              {getFilteredShows().map((show) => (
                <Show
                  show={show}
                  handleDeleteItem={() => handleDeleteItem(show.id)}
                  handleOpenEdit={() => handleOpenEdit(show.id)}
                />
              ))}
            </div>
          )}
          {!shows.length && !loading && (
            <div className="empty">TV shows you add will show up here</div>
          )}
          {!getFilteredShows().length && !!shows.length && (
            <div className="empty">Your search returned no results</div>
          )}
          {loading && (
            <div className="loading">
              <Loading />
            </div>
          )}
        </main>
      </div>
    </>
  );
}

export default Home;
