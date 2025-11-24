import React, { useState } from 'react'
import { Sparkles, Edit, Hash } from 'lucide-react'
import axios from 'axios'
import Markdown from 'react-markdown';
import toast from 'react-hot-toast';
import { useAuth } from '@clerk/clerk-react';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL || 'http://localhost:3000';


const BlogTitles = () => {

  const blogCategories = [
    'General', 'Technology', 'Health', 'Business', 'Travel', 'Lifestyle', 'Education', 'Food', 'Entertainment', 'Sports'
  ]

  const [selectedCategory, setSelectedCategory] = useState(blogCategories[0])
  const [input, setInput] = useState('')

  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const prompt = `Generate blog titles about ${input} in the category of ${selectedCategory}. Provide a list of 5 catchy and engaging titles.`;

      const { data } = await axios.post('/api/ai/generate-blog-title', { prompt },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`
          }
        }
      );
      if (data.success) {
        setContent(data.article);
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
          <Sparkles className='w-6 text-[#8e37eb]' />
          <h1 className='text-xl font-semibold'>AI Title Generator</h1>
        </div>
        <p className='mt-6 text-sm font-medium'>Keyword</p>

        <input type="text"
          onChange={(e) => setInput(e.target.value)}
          className='w-full p-2 px-3 mt-2 outline-none text-sm
      rounded-md border border-gray-300'
          placeholder='The future of artificial intelligence is...' required />

        <p className='mt-4 text-sm font-medium'>Category</p>

        <div className='mt-3 flex gap-3 flex-wrap sm:max-w-9/11'>
          {blogCategories.map((item) => (
            <span onClick={() => setSelectedCategory(item)}
              className={`text-xs px-4 py-1 border rounded-full cursor-pointer 
                ${selectedCategory === item ? 'bg-blue-50 text-blue-700' :
                  'text-gray-500 border-gray-300'}`}
              key={item}>
              {item}
            </span>
          ))}
        </div>

        <br />

        <button disabled={loading}
          className='w-full flex justify-center items-center gap-2
          bg-gradient-to-r from-[#c341f6] to-[#8e37eb] text-white px-4 py-2 mt-6
          text-sm rounded-lg cursor-pointer'>
          <Hash className='w-5' />
          {
            loading ? 'Generating...' : 'Generate article'
          }

        </button>

      </form>


      {/* Right col */}
      <div className='w-full max-w-lg p-4 bg-white rounded-lg 
      flex flex-col border border-gray-200 min-h-96 '>

        <div className='flex items-center gap-3'>
          <Hash className='w-5 h-5 text-[#8e37eb]' />
          <h1 className='text-xl font-semibold'>Generated Titles</h1>
        </div>

        {
          !content ? (
            <div className='flex-1 flex justify-center items-center'>
              <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
                <Hash className='w-9 h-9' />
                <p>Enter a topic and click “Generate article ” to get started</p>
              </div>
            </div>
          ) : (
            <div className='overflow-y-scroll text-sm p-2 mt-3 h-full border text-slate-600'>
              <div className='reset-tw'>
                <Markdown>
                  {content}
                </Markdown>
              </div>
            </div>
          )
        }

      </div>

    </div>
  )
}

export default BlogTitles
