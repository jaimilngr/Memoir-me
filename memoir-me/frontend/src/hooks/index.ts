import axios from "axios";
import { useState, useEffect } from "react";
import { BACKEND_URL } from "../config";

export interface Blog {
  content: string;
  title: string;
  id: string;
  published_date: string;
  author: {
    name: string;
  };
  message: string;
}

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
          headers: {
            Authorization: localStorage.getItem("token") || "",
          },
        });

        if (response.status === 200) {
          setBlog(response.data.post);
          setError(null);
        } else {
          setError("Failed to fetch the blog post");
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          if (error.response.status === 401) {
            setError("You are Unauthorized to access the content");
          } else {
            setError(error.response.data.message || "Failed to fetch the blog post");
          }
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  return {
    loading,
    blog,
    error,
  };
};

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
          headers: {
            Authorization: localStorage.getItem("token") || "",
          },
        });

        if (response.status === 200) {
          setBlogs(response.data.posts);
          setError(null);
        } 
      } 
      catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          if (error.response.status === 401) {
            setError("You are Unauthorized to access the content ");
          } else {
            setError(error.response.data.message || "Failed to fetch the blog posts");
          }
        } 
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return {
    loading,
    blogs,
    error,
  };
};


export const useUserInfo = () => {
  const [name, setName] = useState<string>("");

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    setName(storedName || "Anonymous");
  }, []);

  return { name };
};

export const useUserBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/blog/userblogs`, {
          headers: {
            Authorization: localStorage.getItem("token") || "",
          },
        });

        if (response.status === 200) {
          setBlogs(response.data.posts);
          setError(null);
        } 
      } 
      catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          if (error.response.status === 401) {
            setError("You are Unauthorized to access the content ");
          } else {
            setError(error.response.data.message || "Failed to fetch the blog posts");
          }
        } 
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

return {
  loading,
  blogs,
  error,
};
};
