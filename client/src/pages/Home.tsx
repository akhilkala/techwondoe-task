import { useEffect, useState } from "react";
import AddShow from "../components/AddShow";
import Show from "../components/Show";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api.service";
import { IShow } from "../utils/types";
import { FiSearch } from "react-icons/fi";
import useInputState from "../hooks/useInputState";

function Home() {
  const [addShowOpen, setAddShowOpen] = useState(false);
  const auth = useAuth();
  const [shows, setShows] = useState<IShow[]>([]);
  const search = useInputState();

  useEffect(() => {
    api.get("/shows/all").then((res) => setShows(res.shows));
    console.log(shows);
    // .catch((err)=>)
  }, []);

  const handleDeleteItem = (id: string) => {
    setShows((prev) => prev.filter((show) => show.id !== id));
  };

  const handleAddItem = (show: IShow) => {
    setShows((prev) => [...prev, show]);
  };

  const getFilteredShows = () => {
    return shows.filter((show) => {
      const searchTerm = `${show.title} ${show.app}`;
      return searchTerm.toLowerCase().includes(search.value.toLowerCase());
    });
  };

  return (
    <>
      <AddShow
        show={shows[0]}
        handleAddItem={handleAddItem}
        open={addShowOpen}
        closeHandler={() => setAddShowOpen(false)}
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
          <div className="search">
            <FiSearch />
            <input type="text" placeholder="Search" {...search.inputProps} />
          </div>
          <div className="shows">
            {getFilteredShows().map((show) => (
              <Show
                show={show}
                handleDeleteItem={() => handleDeleteItem(show.id)}
              />
            ))}
          </div>
        </main>
      </div>
    </>
  );
}

export default Home;
