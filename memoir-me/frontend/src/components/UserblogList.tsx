import { Appbar } from "../components/Appbar";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { PopUp } from "../components/PopUp";
import { useUserBlogs } from "../hooks";
import { MainBlog } from "./MainBlog";

export const UserblogList = () => {
  const { loading, blogs, error } = useUserBlogs();

  if (error) return <PopUp issue={error} />;

  if (loading) {
    return (
      <div>
        <Appbar />
        <div className="flex justify-center">
          <div>
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
          </div>
        </div>
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div>
        <Appbar />
        <p className="text-center">You have not written any blogs yet.</p>
      </div>
    );
  }

  return (
    <div>
      <Appbar />
      <div className="flex flex-col items-center">
        {blogs.map((blog) => (
          <MainBlog key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};
