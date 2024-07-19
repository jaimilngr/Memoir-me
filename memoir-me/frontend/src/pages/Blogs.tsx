import { Blogcard } from "../components/Blogcard";
import { Appbar } from "../components/Appbar";
import { useBlogs } from "../hooks";
import { BlogSkeleton } from "../components/BlogSkeleton";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();

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
  return (
    <div className="">
      <Appbar />
      <div className="flex justify-center">
        <div>
          {blogs.map((post) => (
            <Blogcard
              id={post.id}
              authorName={post.author.name || "Anonymous"}
              title={post.title}
              content={post.content}
              published_date={post.published_date}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
