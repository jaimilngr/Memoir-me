import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Appbar } from './Appbar';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { useNavigate } from 'react-router-dom';
import { PopUp } from './PopUp';

export const Publish = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState(''); 
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Login to Publish an Blog ");
    }
  }, [navigate]);


  if (error) return <PopUp></PopUp>;

  const handleSubmit = async () => {
  
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
        title,
        content,
      }, {
        headers:{
          Authorization: localStorage.getItem("token")
        }
      });
      navigate(`/blog/${response.data.id}`)
    } catch (error) {
      console.error('Error posting blog:', error);
    }
  };

  return (
    <div>
      <Appbar />
      <div className='flex justify-center w-full pt-8 px-6 xl:w-auto'>
        <div className='max-w-screen-lg w-full'>
          <input 
            type="text" 
            placeholder="Title..." 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            className="w-full mb-4 p-2 border border-gray-300 rounded"
          />
          <TextEditor content={content} setContent={setContent} />
          <button 
            type="button" 
            onClick={handleSubmit} 
            className=" text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

const TextEditor = ({ content, setContent }: {content :string , setContent:(value:string)=> void }) => {
  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['link'],
  
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction
  
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
  
    ['clean'],                                        // remove formatting button
  ];

  const modules = {
    toolbar: toolbarOptions,
  };

  return (
    <ReactQuill 
      modules={modules} 
      theme='snow' 
      value={content} 
      onChange={setContent} 
      placeholder='Compose an epic...'
      className='mb-4' 
    />
  );
};
