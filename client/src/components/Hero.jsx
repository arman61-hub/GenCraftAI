import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

const Hero = () => {

    const navigate = useNavigate()

  return (
    <div className='px-4 sm:px-20 xl:px-32 relative inline-flex flex-col w-full justify-center bg-[url(/gradientBackground.png)] bg-cover bg-no-repeat min-h-screen pt-30'>

        <div className='text-center mb-6'>
            <h1 className='text-3xl sm:text-5xl md:text-6xl 2xl:text-[76px] font-semibold mx-auto leading-[1.2]'>Create amazing content <br /> with <span className='text-primary'>AI tools</span></h1>
            <p className='mt-4 max-w-xs sm:max-w-lg 2xl:max-w-xl m-auto max-sm:text-xs text-gray-600'>Transform your content creation with our suite of premium AI tools. Write articles, generate images, and enhance your workflow.</p>
        </div>

        <div className='flex flex-wrap justify-center gap-4 text-sm max-sm:text-xs'>
            <button onClick={() => navigate('/ai')} className='bg-primary text-white px-10 py-3 rounded-lg hover:scale-102 active:scale-95 transition cursor-pointer'>Start creating now</button>
            <button className='bg-white px-10 py-3 rounded-lg border border-gray-300 hover:scale-102 active:scale-95 transition cursor-pointer'>Watch demo</button>
        </div>

        <div className='flex items-center gap-4 mt-8 mx-auto text-gray-600'>
            <img src={assets.user_group} alt="user_group" className='h-8' /> Trusted by 10k+ people
        </div>

        <div className="overflow-hidden w-full relative max-w-5xl mx-auto select-none mt-20">
            <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-[#ffffff] to-transparent"></div>

            {/* constrain width */}
            <div className="marquee-inner flex will-change-transform min-w-[200%]" style={{ animationDuration: "30s" }} >
                <img src={assets.slack} alt="Slack" draggable="false" className="w-full h-full object-cover mx-6" />
                <img src={assets.framer} alt="Framer" draggable="false" className="w-full h-full object-cover mx-6" />
                <img src={assets.netflix} alt="Netflix" draggable="false" className="w-full h-full object-cover mx-6" />
                <img src={assets.google} alt="Google" draggable="false" className="w-full h-full object-cover mx-6" />
                <img src={assets.linkedin} alt="LinkedIn" draggable="false" className="w-full h-full object-cover mx-6" />
                <img src={assets.instagram} alt="Instagram" draggable="false" className="w-full h-full object-cover mx-6" />
                <img src={assets.facebook} alt="Facebook" draggable="false" className="w-full h-full object-cover mx-6" />

                {/* Duplicate for seamless loop */}
                <img src={assets.slack} alt="Slack" draggable="false" className="w-full h-full object-cover mx-6" />
                <img src={assets.framer} alt="Framer" draggable="false" className="w-full h-full object-cover mx-6" />
                <img src={assets.netflix} alt="Netflix" draggable="false" className="w-full h-full object-cover mx-6" />
                <img src={assets.google} alt="Google" draggable="false" className="w-full h-full object-cover mx-6" />
                <img src={assets.linkedin} alt="LinkedIn" draggable="false" className="w-full h-full object-cover mx-6" />
                <img src={assets.instagram} alt="Instagram" draggable="false" className="w-full h-full object-cover mx-6" />
                <img src={assets.facebook} alt="Facebook" draggable="false" className="w-full h-full object-cover mx-6" />
            </div>
        </div>

    </div>
  )
}

export default Hero