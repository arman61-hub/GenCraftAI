import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import Skeleton from '@mui/material/Skeleton';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Community = () => {
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const { user } = useUser();
  const { getToken } = useAuth();

  const fetchCreations = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/api/user/get-published-creations', {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      if (data.success) {
        setCreations(data.creations);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  const imageLikeToggle = async (id) => {
    try {
      const { data } = await axios.post(
        '/api/user/toggle-like-creation',
        { id },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );
      if (data.success) {
        toast.success(data.message);
        await fetchCreations();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCreations();
    }
  }, [user]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = creations.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(creations.length / itemsPerPage);

  return (
    <div className='flex-1 h-full flex flex-col gap-4 p-6'>
      <h2 className='text-xl font-semibold'>Creations</h2>
      <div className='bg-white h-full w-full rounded-xl overflow-y-scroll p-4'>
        {!loading ? (
          currentItems.map((creation, index) => (
            <div
              key={index}
              className='relative group inline-block pl-3 pt-3 w-full sm:max-w-1/2 lg:max-w-1/3'
            >
              <img
                src={creation.content}
                alt=''
                className='w-full h-full object-cover rounded-lg'
              />

              <div className='absolute bottom-0 top-0 right-0 left-3 flex gap-2 items-end justify-end group-hover:justify-between p-3 group-hover:bg-gradient-to-b from-transparent to-black/80 text-white rounded-lg'>
                <p className='text-sm hidden group-hover:block'>{creation.prompt}</p>
                <div className='flex gap-1 items-center'>
                  <p>{creation.likes.length}</p>
                  <Heart
                    onClick={() => imageLikeToggle(creation.id)}
                    className={`min-w-5 h-5 hover:scale-110 cursor-pointer ${
                      creation.likes.includes(user.id)
                        ? 'fill-red-500 text-red-600'
                        : 'text-white'
                    }`}
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          [...Array(itemsPerPage)].map((_, i) => (
            <div
              key={i}
              className='inline-block pl-3 pt-3 w-full sm:max-w-1/2 lg:max-w-1/3'
            >
              <Skeleton
                variant='rectangular'
                animation='wave'
                width='100%'
                height={200}
                className='rounded-lg'
              />
              <Skeleton width='60%' />
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {!loading && creations.length > itemsPerPage && (
        <div className='flex justify-center items-center gap-2 mt-4'>
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`p-2 border rounded-lg ${
              currentPage === 1
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-gray-100'
            }`}
          >
            <ChevronLeft size={18} />
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-8 h-8 text-sm rounded-md ${
                currentPage === i + 1
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'hover:bg-gray-100'
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`p-2 border rounded-lg ${
              currentPage === totalPages
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-gray-100'
            }`}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Community;
