import React, { useState } from 'react';
import { Eraser, Sparkles, Download } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveBackground = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setContent('');

      const formData = new FormData();
      formData.append('image', input);

      const { data } = await axios.post(
        '/api/ai/remove-image-background',
        formData,
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      if (data.success) {
        setContent(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(content);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = 'image-without-bg.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast.error("Failed to download image.");
    }
  };

  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
      {/* Left column */}
      <form
        onSubmit={onSubmitHandler}
        className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'
      >
        <div className='flex items-center gap-3'>
          <Sparkles className='w-6 text-[#FF4938]' />
          <h1 className='text-xl font-semibold'>Background Removal</h1>
        </div>
        <p className='mt-6 text-sm font-medium'>Upload Image</p>
        <input
          onChange={(e) => setInput(e.target.files[0])}
          type='file'
          accept='image/*'
          className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 text-gray-600'
          required
        />
        <p className='text-xs text-gray-500 font-light mt-1'>
          Supports JPG, PNG, and more
        </p>
        <button
          disabled={loading}
          className='w-full flex items-center justify-center gap-2 mt-6 bg-gradient-to-r from-[#F6AB41] to-[#FF4938] text-white px-4 py-2 rounded-lg cursor-pointer'
          type='submit'
        >
          {loading ? (
            <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span>
          ) : (
            <Eraser className='w-5' />
          )}
          Remove Background
        </button>
      </form>

      {/* Right column */}
      <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96'>
        <div className='flex items-center gap-3'>
          <Eraser className='w-5 h-5 text-[#FF4938]' />
          <h1 className='text-xl font-semibold'>Processed Image</h1>
        </div>

        {loading ? (
          <div className='mt-4 space-y-4'>
            <Box>
              <Skeleton variant='rectangular' width='100%' height={280} />
            </Box>
            <Box>
              <Skeleton width='40%' height={30} />
            </Box>
          </div>
        ) : !content ? (
          <div className='flex-1 flex justify-center items-center'>
            <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
              <Eraser className='w-9 h-9' />
              <p>
                Upload an image and click{" "}
                <strong className='text-gray-500'>"Remove Background"</strong> to get started
              </p>
            </div>
          </div>
        ) : (
          <>
            <img
              src={content}
              alt='Result'
              className='mt-3 w-full h-full object-contain rounded-md'
            />
            <button
              onClick={handleDownload}
              className='mt-4 flex items-center justify-center gap-2 text-white bg-[#FF4938] px-4 py-2 text-sm rounded-lg hover:bg-[#e64533] transition'
            >
              <Download className='w-4 h-4' />
              Download Image
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default RemoveBackground;
