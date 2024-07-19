import { Appbar } from "./Appbar";
import { Blog } from "../hooks";
import { Avatar } from "./Blogcard";
import DOMPurify from 'dompurify';
import { format } from 'date-fns';

export const MainBlog = ({ blog }: { blog: Blog}) => {
  const sanitizedContent = DOMPurify.sanitize(blog.content);
  const formattedDate = format(new Date(blog.published_date), 'd MMMM yyyy');

  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 w-full pt-10 max-w-screen-xl gap-0 md:gap-10">
          <div className="col-span-12 md:col-span-8 order-2 md:order-1 break-words">
            <div className="text-3xl md:text-5xl font-extrabold break-words">{blog.title}</div>
            <div className="text-slate-500 pt-2 break-words">Posted on {formattedDate}</div>
            <div className="pt-4 break-words" dangerouslySetInnerHTML={{ __html: sanitizedContent }}></div>
          </div>
          <div className="col-span-12 md:col-span-4 order-1 md:order-2 md:ml-5 break-words ">
            <div className="text-slate-600 text-md md:text-lg break-words">Author</div>
            <div className="flex w-full">
              <div className="pr-4 flex flex-col justify-center">
                <Avatar size="big" name={blog.author.name || "Anonymous"} />
              </div>
              <div className="break-words">
                <div className="text-lg md:text-xl font-bold break-words">
                  {blog.author.name || "Anonymous"}
                </div>
                <div className="pt-2 text-md md:text-lg text-slate-500 break-words">
                  "Unleashing Imagination, One Word at a Time."
                </div>
              </div>
            </div>
            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700 md:hidden" />

          </div>
        </div>
      </div>
    </div>
  );
};
