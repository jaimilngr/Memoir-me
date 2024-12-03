import { Blogcard } from "../components/Blogcard";
import { Appbar } from "../components/Appbar";
import { useBlogs } from "../hooks";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { PopUp } from "../components/PopUp";
import { Link } from "react-router-dom";

export const Blogs = () => {
  const { loading, blogs, error } = useBlogs();

  const popularBlogs = blogs.slice(0, 5); 
  if (error) return <PopUp issue="An error occurred while loading blogs." />;

  if (loading) {
    return (
      <div className="bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 min-h-screen">
        <Appbar />
        <div className="flex flex-col items-center py-10">
          {[...Array(5)].map((_, i) => (
            <BlogSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 min-h-screen">
      <Appbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Main Blogs Section */}
        <div className="col-span-1 md:col-span-2 space-y-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-10 text-center md:text-left">
            Latest Blogs
          </h1>
          {blogs.map((post) => (
            <div
              key={post.id}
              className="relative overflow-hidden rounded-lg shadow-lg transition-transform transform hover:scale-105 bg-white border border-gray-200 border-r-4 border-r-teal-500"
            >
              <Blogcard
                id={post.id}
                authorName={post.author.name || "Anonymous"}
                title={post.title}
                content={post.content}
                published_date={post.published_date}
              />
            </div>
          ))}
        </div>

          {/* Popular Blogs Section */}
  <div className="col-span-1 mt-10 md:mt-20">
    <h2 className="text-2xl font-semibold text-gray-700 mb-5">Popular Blogs</h2>
    <div className="bg-teal-500 border border-teal-400 rounded-lg p-4 shadow-md space-y-4">
      {popularBlogs.map((blog) => (
        <Link
          to={`/blogs/${blog.id}`}
          key={blog.id}
          className="block p-3 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 bg-white"
        >
          <h3 className="text-lg font-medium text-gray-800 truncate">{blog.title}</h3>
          <p className="text-sm text-gray-700 mt-1">
            By {blog.author.name || "Anonymous"}
          </p>
        </Link>
      ))}
    </div>
  </div>
      </div>
    </div>
  );
};
