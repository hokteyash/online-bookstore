import { useDispatch } from "react-redux";
import type { AppDispatch } from "../app/store";
import { logoutSuccess } from "../app/authSlice";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const handleLogout = () => {
    dispatch(logoutSuccess());
  };
  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
