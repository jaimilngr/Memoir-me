import { Appbar } from "./Appbar";
import { Blog } from "../hooks";
import { Avatar } from "./Blogcard";

export const MainBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-10">
          <div className="grid col-span-8">
            <div className="text-5xl font-extrabold ">{blog.title}</div>
            <div className="text-slate-500 pt-2">Posted on 18th july 2024</div>
            <div className="pt-4">{blog.content}</div>
          </div>
          <div className=" col-span-4 ml-5">
            <div className="text-slate-600 text-lg">
            Author
            </div>
            <div className="flex w-full">
              <div className="pr-4 flex flex-col justify-center">
                <Avatar size="big" name={blog.author.name || "Anonmyous"} />
              </div>
              <div>
                <div className="text-xl font-bold">
                  {blog.author.name || "Anonmyous"}
                </div>
                <div className="pt-2 text-lg text-slate-500">
                  "Unleashing Imagination, One Word at a Time."
                </div>
              </div>    
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
