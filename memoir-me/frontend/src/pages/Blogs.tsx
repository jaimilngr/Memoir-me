import { Blogcard } from "../components/Blogcard";
import { Navbar } from "../components/Navbar";

export const Blogs = () => {
  return (
    <div className="">
        <Navbar/>
        <div className="flex justify-center">
      <div className=" justify-center max-w-xl">
        <Blogcard
          authorName={"Jaimil"}
          title={"Welcome to my Blogging platform  "}
          content={"Hope you guys enjoy the time writing some blogs in here , keep writing and reading , thank you "}
          publishedDate={"2nd feb 2024"}
        />
        <Blogcard
          authorName={"Jaimil"}
          title={"Welcome to my Blogging platform  "}
          content={"Hope you guys enjoy the time writing some blogs in here , keep writing and reading , thank you "}
          publishedDate={"2nd feb 2024"}
        />
        <Blogcard
          authorName={"Jaimil"}
          title={"Welcome to my Blogging platform  "}
          content={"Hope you guys enjoy the time writing some blogs in here , keep writing and reading , thank you "}
          publishedDate={"2nd feb 2024"}
        />
      </div>
      </div>
    </div>
  );
};
