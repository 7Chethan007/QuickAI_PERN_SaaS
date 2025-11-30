import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets.js'
import { X } from 'lucide-react'

const Hero = () => {
    const navigate = useNavigate()
    const [showVideo, setShowVideo] = useState(false)

    return (
        <div className='px-4 sm:px-20 xl:px-32 relative inline-flex flex-col 
    w-full justify-center bg-[url(/gradientBackground.png)] bg-cover bg-no-repeat min-h-screen'>

            <div className='text-center mb-6'>
                <h1 className='text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl
            font-semibold mx-auto leading-[1.2]'>Create amazing content <br /> with
                    <span className='text-primary'>AI tools</span></h1>
                <p className='mt-4 max-w-xs sm:max-w-lg 2xl:max-w-xl m-auto
            max-sm:text-xs text-gray-600'>Transform your content creation with our
                    suite of premium AI tools. Write articles, generate images, and enhance
                    your workflow.</p>
            </div>

            <div className='flex flex-wrap justify-center gap-4 text-sm max-sm:text-xs'>
                <button onClick={() => navigate('/ai')} className='bg-primary text-white px-10 py-3
            rounded-lg hover:scale-102 active:scale-95 transition
            cursor-pointer'>
                    Start creating now
                </button>
                <button onClick={() => setShowVideo(true)} className='bg-white px-10 py-3 rounded-lg border
            border-gray-300 hover:scale-102 active:scale-95 transition
            cursor-pointer'
                >Watch demo
                </button>
            </div>

            <div className='flex items-center gap-4 mt-8 mx-auto text-gray-600'>
                <img src={assets.user_group} alt="" className='h-8' />
                <p>Trusted by 10k+ people</p>
            </div>

            {showVideo && (
                <div
                    className="fixed inset-0 bg-blue-900/30 backdrop-blur-sm flex justify-center items-center z-50 transition-opacity duration-300"
                    onClick={() => setShowVideo(false)}
                >
                    <div
                        className="relative bg-white p-2 rounded-lg shadow-2xl w-11/12 max-w-4xl transform transition-transform duration-300 scale-95"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setShowVideo(false)}
                            className="absolute -top-3 -right-3 bg-primary text-white rounded-full p-1.5 z-10 hover:scale-110 transition-transform"
                        >
                            <X size={20} />
                        </button>
                        <div className="w-full">
                            <iframe
                                className="w-full aspect-video rounded-md"
                                src="https://www.youtube.com/embed/FEkIvPEdFd0?si=-N-FIyukX463O78o&autoplay=1"
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default Hero
