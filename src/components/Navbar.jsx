import { CgProfile } from "react-icons/cg";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
    const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem("username");
    document.cookie = "acc_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";

        navigate("/sign-in")
  }
  const user = sessionStorage.getItem("username")
  return (
    <div className="border  flex items-center justify-between h-[10vh] lg:w-[70vw] px-2">
      <h1 className="text-lg lg:text-2xl">Payments</h1>
      <div className="flex  w-[50vw] justify-around  lg:w-[30vw]">
        {" "}
        <h1 className="flex items-center">
          <CgProfile /> {user}
        </h1>
        <button onClick={handleLogout}>
          {" "}
          <IoLogOutOutline />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
