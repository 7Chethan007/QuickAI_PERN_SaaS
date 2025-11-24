import React from 'react'
import { useUser, useClerk, Protect } from '@clerk/clerk-react';
import { assets } from '../assets/assets.js'
// ERROR FIX: Added 'House' to the imports from lucide-react
import { Eraser, FileText, Hash, ImageIcon, Scissors, SquarePen, User, House, LogOut } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navItems = [
    { to: '/ai', label: 'Dashboard', Icon: House },
    { to: '/ai/write-article', label: 'Write Article', Icon: SquarePen },
    { to: '/ai/blog-titles', label: 'Blog Titles', Icon: Hash },
    { to: '/ai/generate-images', label: 'Generate Images', Icon: ImageIcon },
    { to: '/ai/remove-background', label: 'Remove Background', Icon: Eraser },
    { to: '/ai/remove-objects', label: 'Remove Objects', Icon: Scissors },
    { to: '/ai/review-resume', label: 'Review Resume', Icon: FileText },
    { to: '/ai/community', label: 'Community', Icon: User }
]

const Sidebar = ({ sidebar, setSidebar }) => {
    const { user } = useUser();
    const { signOut, openUserProfile } = useClerk(); // signOut and openUserProfile are imported but unused in the current render return.

    return (
        <div className={`w-60 h-full bg-white border-r border-gray-200 flex flex-col
        justify-between items-start max-sm:absolute top-14 bottom-0 ${sidebar ?
            'translate-x-0' : 'max-sm:-translate-x-full'} transition-all duration-300
        ease-in-out`}>
            <div className='my-7 w-full'>
                <img src={user.imageUrl} alt="User avatar" className='w-13 rounded-full
        mx-auto'/>
                <h1 className='mt-1 text-center px-2'>{user.fullName}</h1>

                <div className='px-6 mt-5 text-sm text-gray-600 font-medium'>
                    {navItems.map(({ to, label, Icon }) => (
                        // FIX 2: Corrected the child function of NavLink. It was returning a fragment with no parent element or explicit return, and 'lable' was misspelled as 'label'.
                        <NavLink key={to} to={to} end={to === '/ai'}
                        onClick={()=>setSidebar(false)} className={({ isActive }) => `px-4 py-2.5 flex 
                        items-center gap-3 rounded 
                        ${isActive ? 'bg-gradient-to-r from-[#3C81F6] to-[#9234EA] text-white' : ''}`} >

                            {({ isActive })=>{
                                return (
                                <>
                                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : ''}`} />
                                {label} 
                                </>
                                )
                            }}
                        </NavLink>
                    ))}
                </div>
            </div>
            {/* You would typically have a logout button and a user profile link here, using signOut and openUserProfile */}
            <div className='w-full border-t border-gray-200 p-4 px-7 flex items-center justify-between'>
                    <div onClick={openUserProfile}
                     className='flex gap-2 items-center cursor-pointer'>
                        <img src={user.imageUrl} alt="User avatar" className='w-8 rounded-full'/>
                        <div>
                            <h1 className='text-sm font-medium'>{user.fullName}</h1>
                            <p className='text-xs text-gray-500'>
                                <Protect plan = 'premium' fallback='Free'>Premium </Protect>
                                Plan
                            </p>
                        </div>
                    </div>
                    <LogOut onClick={signOut} className='w-4.5 text-gray-400 hover:text-gray-700 transition cursor-pointer' />
            </div>
        </div>
    )
}

export default Sidebar