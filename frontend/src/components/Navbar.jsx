import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="bg-white shadow p-4 flex justify-between">
      <h1 className="font-bold text-lg">MERN Notes</h1>
      <div className="space-x-4">
        {token ? (
          <button onClick={logout} className="text-red-600">
            Logout
          </button>
        ) : (
          <>
            <Link to="/">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
