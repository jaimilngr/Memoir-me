import logo from "../assets/images/memoir-me_logo.png";
import {  Dropdown, Navbar} from "flowbite-react";
import {Avatar} from "../components/Blogcard"


export const Appbar = () =>{
    return <div className="mx-5"> 
   <Navbar fluid rounded>
      <Navbar.Brand href="http://localhost:5173/blogs">
        <span className="  text-3xl font-extrabold font-serif pt-2 text-nowrap	" > Memoir me</span>
        <img src={logo} className="mr-3 h-14 sm:h-20" alt="Flowbite React Logo" />

        </Navbar.Brand>
      <div className="flex md:order-2 text-2xl w-10" >
        <Dropdown 
          arrowIcon={false}
          inline
          label={
            <Avatar  name="J" size={10}/>
          }
        > 
        <div className="mx-5">
          <Dropdown.Header >
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">name@flowbite.com</span>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
        </div>
        </Dropdown>
      </div>
    </Navbar>
</div>
}


