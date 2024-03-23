import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const route = useLocation();
  const [isAuth, setIsAuth] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [route?.pathname]);
  return (
    <nav className="bg-gray-100 px-2">
      <div className="max-w-[1100px] mx-auto flex justify-between items-center">
        <div>
          <h1 className="py-2 text-lg font-semibold text-gray-600">
            <Link to={"/"}>INVENTARY SHOP</Link>
          </h1>
        </div>
        <div>
          <ul className="flex items-center gap-4 py-2">
            <li>{isAuth && <Link to={"/products"}>Product</Link>}</li>
            <li>
              {isAuth && (
                <button
                  onClick={logout}
                  className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg"
                >
                  Logout
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
