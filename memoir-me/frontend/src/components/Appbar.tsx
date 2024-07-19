import logo from "../assets/images/memoir-me_logo.png";
import {  Dropdown, Navbar} from "flowbite-react";
import {Avatar} from "../components/Blogcard"
import { Link } from "react-router-dom";
import { useSignOut  } from "./Signout";


export const Appbar = () =>{
  const handleSignOut = useSignOut(); 
    return <div className="mx-5 justify-between "> 
    {/* <div className="w-48 md:w-auto"> */}

   <Navbar fluid rounded>
  <Link to={`/blogs`}>
      <Navbar.Brand>
        <span className="  text-xl font-extrabold font-serif pt-2 text-nowrap sm:text-3xl	" > Memoir me</span>
        <img src={logo} className="mr-3 h-10 sm:h-20" alt="Memoirme Logo" />

        </Navbar.Brand>
        </Link>
        <div className="flex flex-row justify-center ml-6 md:w-max z-10">
        <Link to={`/blogs/publish`}>
        <div className="pt-1 md:pt-0">
        <button type="button" className=" mr-4 text-white bg-green-700 hover:bg-green-800  font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 ml-2 leading-4	md:leading-5 ">Create</button>
        </div>

        </Link>

      <div className="flex md:order-2 text-2xl w-10 " >
     
        <Dropdown 
          arrowIcon={false}
          inline
          label={
          
            <Avatar  name="J" size="big"/>
          }
        > 
        <div className="mx-5 bg-white ">
          <Link to={`/blogs`}>
          <Dropdown.Item>Dashboard</Dropdown.Item> 
          </Link>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Divider /> 
          <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
        </div>
        </Dropdown>
        </div>
      </div>
    </Navbar>
    <hr className="h-px  bg-gray-200 border-0 dark:bg-gray-700"/>
    </div>
}


