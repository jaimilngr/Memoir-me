import logo from "../assets/images/memoir-me_logo.png";
import { Dropdown, Navbar } from "flowbite-react";
import { Avatar } from "../components/Blogcard";
import { Link } from "react-router-dom";
import { useSignOut } from "./Signout";
import { useState } from "react";
import { PopUp } from "./PopUp";

export const Appbar = () => {
  const [showPopup, setShowPopup] = useState(false);
  const Name = localStorage.getItem('username');
  const handleSignOut = useSignOut();

  const handleClick = () => {
    if (Name === null) {
      setShowPopup(true);
    }
  };

  return (
    <div className="mx-5 justify-between">
      <Navbar fluid rounded>
        <Link to={`/blogs`}>
          <Navbar.Brand>
            <span className="text-xl font-extrabold font-serif pt-2 text-nowrap sm:text-3xl">Memoir me</span>
            <img src={logo} className="mr-3 h-10 sm:h-20" alt="Memoir Logo" />
          </Navbar.Brand>
        </Link>
        <div className="flex flex-row justify-center ml-6 md:w-max">
          <Link to={Name === null ? "#" : "/blogs/publish"}>
            <div className="pt-1 md:pt-0">
              <button
                type="button"
                onClick={handleClick}
                className="mr-4 text-white bg-green-700 hover:bg-green-800 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 ml-2 leading-4 md:leading-5"
              >
                Create
              </button>
            </div>
          </Link>

          {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="relative bg-white p-6 rounded shadow w-full max-w-sm md:max-w-md">
                <button
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 pt-1"
                  onClick={() => setShowPopup(false)}
                >
                  ❌
                </button>
                <PopUp issue="Please Sign in to post blogs" bar={false} />
              </div>
            </div>
          )}

          <div className="flex md:order-2 text-2xl w-10">
            <Dropdown
              arrowIcon={false}
              inline
              label={<Avatar name={Name} size="big" />}
              disabled={Name === null} 
            >
              {Name ? (
                <div className="mx-5 bg-white">
                  <Link to={`/blogs`}>
                    <Dropdown.Item>Dashboard</Dropdown.Item>
                  </Link>
                  <Dropdown.Item>Settings</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
                </div>
              ) : (
                <div className="mx-5 bg-white text-gray-500 cursor-not-allowed">
                  <Dropdown.Item className="cursor-not-allowed">Dashboard</Dropdown.Item>
                  <Dropdown.Item className="cursor-not-allowed">Settings</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item className="cursor-not-allowed">Sign out</Dropdown.Item>
                </div>
              )}
            </Dropdown>
          </div>
        </div>
      </Navbar>
      <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
    </div>
  );
};
