import React, { useState } from 'react'
import { Sparkles, Edit, Hash, Eraser } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast';
import { useAuth } from '@clerk/clerk-react';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL || 'http://localhost:3000';

const RemoveBackground = () => {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')

  const { getToken } = useAuth()

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('image', input);

      const { data } = await axios.post('/api/ai/remove-image-background', formData,
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );
      if (data.success) {
        setContent(data.content);
      } else {
        toast.error(data.message || 'Failed to generate titles');
      }

      setLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong. Please try again.');
    }
    setLoading(false);

  }

  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4
  text-slate-700'>
      {/* left col */}
      <form onSubmit={onSubmitHandler}
        className='w-full max-w-lg p-4 bg-white rounded-lg border
    border-gray-200'>
        <div className='flex items-center gap-3'>
          <Sparkles className='w-6 text-[#ff4938]' />
          <h1 className='text-xl font-semibold'>Background Removal</h1>
        </div>
        <p className='mt-6 text-sm font-medium'>Upload Image</p>

    
        <input type="file" accept='image/*'
          onChange={(e) => setInput(e.target.files[0])}
          className='w-full p-2 px-3 mt-2 outline-none text-sm
      rounded-md border border-gray-300 text-gray-300' required/>

        <p> Support JPG, PNG and other image formates</p>




        <button disabled={loading} className='w-full flex justify-center items-center gap-2
          bg-gradient-to-r from-[#f6ab41] to-[#ff4938] text-white px-4 py-2 mt-6
          text-sm rounded-lg cursor-pointer'>
          <Hash className='w-5' />
          {
            loading ? 'Processing...' : 'Remove Background'
          }
          
        </button>

      </form>

      {/* Right col */}
      <div className='w-full max-w-lg p-4 bg-white rounded-lg 
      flex flex-col border border-gray-200 min-h-96 '>

        <div className='flex items-center gap-3'>
          <Eraser className='w-5 h-5 text-[#ff4938]' />
          <h1 className='text-xl font-semibold'>Processed Image</h1>
        </div>

        {
          !content ? (
        <div className='flex-1 flex justify-center items-center'>
          <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
            <Eraser className='w-9 h-9' />
            <p>Upload an image and click "Remove Background" to get started</p>
          </div>
        </div>
          ) : (
            <div>
              <img src={content} alt="Image" className='mt-4 w-full h-full'/>
            </div>
          )
        }

      </div>

    </div>
  )
}

export default RemoveBackground
