import logo from "../assets/images/memoir-me_logo.png";
import { Dropdown, Navbar } from "flowbite-react";
import { Avatar } from "../components/Blogcard";
import { Link } from "react-router-dom";
import { useSignOut } from "./Signout";
import { useEffect, useState } from "react";
import { PopUp } from "./PopUp";

export const Appbar = () => {
  const [showPopup, setShowPopup] = useState(false);
  const Name = localStorage.getItem("username");
  const handleSignOut = useSignOut();

  const handleClick = () => {
    if (Name === null) {
      setShowPopup(true);
    }
  };

  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showPopup]);

  return (
    <div className="px-4 sm:px-8 bg-white border-b shadow-md">
      <Navbar fluid rounded>
        <Link to={`/`}>
          <Navbar.Brand>
            <img src={logo} className="h-10 sm:h-14" alt="Memoir Logo" />
            <span className="text-xl font-extrabold font-serif text-gray-800 sm:text-2xl ml-2">
              Memoir Me
            </span>
          </Navbar.Brand>
        </Link>
        <div className="flex items-center space-x-4 ml-auto">
          <Link to={Name === null ? "#" : "/blogs/publish"}>
            <button
              type="button"
              onClick={handleClick}
              className="px-5 py-2.5 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 rounded-full shadow-md transition duration-200"
            >
              Create
            </button>
          </Link>

          {showPopup && (
            <div
              className="fixed inset-0 m-0 p-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
              style={{ margin: 0, padding: 0 }}
            >
              <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-sm md:max-w-md">
                <button
                  className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                  onClick={() => setShowPopup(false)}
                >
                  ❌
                </button>
                <PopUp issue="Please Sign in to post blogs" bar={false} />
              </div>
            </div>
          )}

          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar name={Name} size="big" />}
            disabled={Name === null}
            className="relative"
          >
            {Name ? (
              <div className="bg-white rounded-lg shadow-lg mt-2 w-48">
                <Dropdown.Item className="hover:bg-gray-100 transition duration-200">
                  Settings
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  className="hover:bg-red-100 text-red-600 transition duration-200"
                  onClick={handleSignOut}
                >
                  Sign out
                </Dropdown.Item>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-lg mt-2 w-48 text-gray-400">
                <Dropdown.Item className="cursor-not-allowed">
                  Settings
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item className="cursor-not-allowed">
                  Sign out
                </Dropdown.Item>
              </div>
            )}
          </Dropdown>
        </div>
      </Navbar>
    </div>
  );
};
