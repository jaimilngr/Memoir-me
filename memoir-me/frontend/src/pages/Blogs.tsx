import { Blogcard } from "../components/Blogcard";
import { Appbar } from "../components/Appbar";
import { useBlogs } from "../hooks";

export const Blogs = () => {
    const {loading, blogs} = useBlogs();
    
    if(loading) {
        return <div>
            Loadings..
        </div>
    }
  return (
    <div className="">
        <Appbar/>
        <div className="flex justify-center">
        <div >
        { blogs.map(post =>  <Blogcard 
          id ={post.id}
          authorName={post.author.name || "Anonymous"}
          title={post.title}
          content={post.content}
          publishedDate={"22 feb 2003"}
        /> )}
      </div>
      </div>
    </div>
  );
};
