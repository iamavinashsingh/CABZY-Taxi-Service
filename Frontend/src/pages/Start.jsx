import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import logo from '../assets/Cabzy-Logo.png'
import heroBg from '../assets/taxi-hero-bg.png' // Ensure this path points to the newly copied image
import { GlassButton } from '../components/ui/apple-tahoe-liquid-glass-button'

const Start = () => {
  const navigate = useNavigate();

  return (
    <div className='relative h-screen w-full overflow-hidden bg-[#050B14] selection:bg-[#00D261]/30 font-sans'>
      
      {/* Background Image Setup */}
      <div className='absolute inset-0 z-0 w-full h-full'>
        <div 
          className='w-full h-full bg-cover bg-right md:bg-center lg:bg-[center_right_-10%]'
          style={{ backgroundImage: `url(${heroBg})` }}
        ></div>
        {/* Gradient Overlay for text readability - very dark on left, fading to transparent on right */}
        <div className='absolute inset-0 bg-gradient-to-r from-[#050B14] via-[#050B14]/90 to-transparent w-full md:w-2/3'></div>
        {/* Bottom gradient for smooth footer transition */}
        <div className='absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-[#050B14] to-transparent'></div>
      </div>

      {/* Main Content Container */}
      <div className='relative z-10 flex flex-col justify-between h-full px-6 md:px-12 lg:px-24 py-8 lg:py-12 max-w-[1440px] mx-auto w-full'>
        
        {/* Top Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className='w-full flex flex-col items-start gap-4'
        >
          {/* Main Logo */}
          <img src={logo} alt="Cabzy" className='h-8 md:h-10 lg:h-12 w-auto object-contain' />
          
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-black/40 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-[#00D261] shadow-[0_0_8px_#00D261]"></span>
            <span className="text-white/80 text-[11px] md:text-xs font-medium tracking-wider uppercase">Next Gen Mobility</span>
          </div>
        </motion.div>

        {/* Hero Content (Center Left) */}
        <div className='flex-1 flex flex-col justify-center items-start w-full lg:w-1/2'>
          
          {/* Main Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className='text-white font-bold tracking-tight leading-[1.05] text-[3.5rem] md:text-[5rem] lg:text-[6.5rem] xl:text-[8rem] whitespace-nowrap'
          >
            Move with <br/>
            <span className='text-[#00D261]'>
              intention.
            </span>
          </motion.h1>

          {/* Subheadline description */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className='text-white/70 text-lg md:text-xl lg:text-2xl mt-6 lg:mt-8 max-w-[450px] leading-snug font-normal'
          >
            Premium rides. Effortless booking.<br />
            Real-time tracking. Always reliable.
          </motion.p>
          
           {/* Begin Journey Button - Hidden on mobile, shown on larger screens next to text if desired, 
               but based on the image, the button isn't explicitly visible in the screenshot. 
               Since you specifically requested the liquid glass button for 'begin', I will place it beautifully here. */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
             className='mt-10 lg:mt-14'
           >
             <GlassButton 
              size="lg"
              onClick={() => navigate('/login')}
              contentClassName="flex items-center gap-3 text-white text-lg px-8 py-3 font-medium"
              glassColor="rgba(0, 210, 97, 0.15)" // Using the Cabzy green color with low opacity for the glass
              className="border border-[#00D261]/30 hover:border-[#00D261]/60"
            >
              <span>Begin Journey</span>
              <ArrowRight className="w-5 h-5 text-[#00D261]" />
            </GlassButton>
           </motion.div>
        </div>

        {/* Bottom Footer Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className='w-full flex items-center justify-between pb-2 md:pb-6'
        >
          {/* Left Footer Text */}
          <p className='text-white/50 text-[10px] md:text-xs tracking-[0.15em] uppercase font-medium'>
            Available Worldwide
          </p>

          {/* Right Footer Text */}
          <p className='text-white/50 text-[10px] md:text-xs tracking-[0.15em] uppercase font-medium'>
            © 2026 Cabzy Inc.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default Start