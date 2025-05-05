import React, { useEffect, useState } from "react";
import { logout } from "../services/authService";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router";

const NavbarComponent = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/signin");
  };

  return (
    <nav className="flex w-full justify-between items-center bg-lime-100 shadow-md py-3 px-10 fixed top-0 left-0 z-10">
      <div className="flex gap-1 justify-center items-center cursor-pointer">
        <p className="text-lg font-semibold text-lime-600 hover:text-lime-700 transition ease-in-out">
          ToDo
        </p>
      </div>

      {/* Navigation Menu */}
      <div className="flex gap-6 justify-center items-center text-lime-900 font-semibold">
        <a href="#" className="text-sm">
          My ToDo
        </a>
        {user ? (
          <div className="flex items-center gap-3">
            {user.photoURL ? (
              <img
                src={user?.photoURL}
                alt="profile"
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-lime-800 text-white flex items-center justify-center font-semibold">
                {user.email.charAt(0).toUpperCase()}
              </div>
            )}
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white text-sm py-2 px-4 rounded-md hover:bg-red-500 transition ease-in-out"
            >
              Logout
            </button>
          </div>
        ) : (
          <a
            href="/signin"
            className="bg-lime-800 text-white text-sm py-2 px-6 rounded-md hover:bg-lime-700 transition ease-in-out"
          >
            Login
          </a>
        )}
      </div>
    </nav>
  );
};

export default NavbarComponent;
