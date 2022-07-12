import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="screen-center">
      <h1>Page not found</h1>
      <Link style={{ marginTop: "2rem" }} className="btn" to="/">
        Go Home
      </Link>
    </div>
  );
}
