import { useState } from "react";
import AddShow from "../components/AddShow";
import Show from "../components/Show";
import { useAuth } from "../context/AuthContext";

function Home() {
  const [addShowOpen, setAddShowOpen] = useState(false);
  const auth = useAuth();

  return (
    <>
      <AddShow open={addShowOpen} closeHandler={() => setAddShowOpen(false)} />
      <div className="home">
        <header className="top">
          <h1>Your Shows</h1>
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
          <div className="shows">
            <Show />
            <Show />
            <Show />
            <Show />
            <Show />
          </div>
        </main>
      </div>
    </>
  );
}

export default Home;
