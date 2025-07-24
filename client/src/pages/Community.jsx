import React, { useEffect, useState } from 'react';
import { useUser , useAuth } from '@clerk/clerk-react';
import { Heart } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Skeleton from '@mui/material/Skeleton';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Community = () => {
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(true);

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
      setCreations(prev =>
        prev.map(item =>
          item.id === id
            ? {
                ...item,
                likes: item.likes.includes(user.id)
                  ? item.likes.filter(uid => uid !== user.id)
                  : [...item.likes, user.id],
              }
            : item
        )
      );
      const { data } = await axios.post(
        '/api/user/toggle-like-creation',
        { id },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      if (!data.success) {
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

  return (
    <div className='flex-1 h-full flex flex-col gap-4 p-6'>
      <h2 className='text-xl font-semibold'>Creations</h2>
      <div className='bg-white h-full w-full rounded-xl overflow-y-scroll p-4 flex flex-wrap'>
        {!loading ? (
          creations.map((creation, index) => (
            <div
              key={index}
              className='relative group inline-block pl-3 pt-3 w-full sm:max-w-1/2 lg:max-w-1/3'
            >
              <img
                src={creation.content}
                alt='Creation'
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
          [...Array(6)].map((_, i) => (
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
    </div>
  );
};

export default Community;