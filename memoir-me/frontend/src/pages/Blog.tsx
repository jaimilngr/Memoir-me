import { MainBlog } from "../components/MainBlog";
import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";
import Lottie from "lottie-react";
import load from "../assets/images/Loading.json";
import { Appbar } from "../components/Appbar";

export const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({
    id: id || "",
  });
  if (loading) {
    return (
      <div>
        <Appbar />
        <div className=" flex flex-col justify-center">
          <div className="flex justify-center ">
            <Lottie animationData={load} loop={true}  />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <MainBlog //@ts-ignore
        blog={blog}
      />
    </div>
  );
};
