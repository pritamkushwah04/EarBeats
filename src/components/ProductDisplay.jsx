import React from 'react'
import DisplayCanvas from './DisplayCanvas'
import { useEffect, useState } from 'react';
import { Progress } from "@material-tailwind/react";
import './ProductDisplay.css';

// import 'heroicons/css/heroicons.css';
function ProductDisplay() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  function enterFullscreen() {
    const Display = document.getElementById("productDisplay"); // Get the HTML element
    if (Display.requestFullscreen) {
      Display.requestFullscreen(); // Standard API
    } else if (Display.mozRequestFullScreen) {
      Display.mozRequestFullScreen(); // Firefox
    } else if (Display.webkitRequestFullscreen) {
      Display.webkitRequestFullscreen(); // Chrome, Safari, and Opera
    } else if (Display.msRequestFullscreen) {
      Display.msRequestFullscreen(); // IE/Edge
    }
  };

  function exitFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  };

  function toggleFullscreen() {
    if (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement ||
      document.msFullscreenElement) {
      exitFullscreen();
    } else {
      enterFullscreen();
    }
  }

  useEffect(() => {
    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };
    var btn = document.getElementById('buttons');
    if (window.innerWidth > 550) {
      btn.className = 'flex justify-between bg-white'
    } else {
      btn.className = 'fixed inset-x-0 bottom-0  flex justify-between bg-white'
    }
    window.addEventListener('resize', updateWindowWidth);
    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', updateWindowWidth);
    };
  }, [windowWidth]);


  return (
    <div className='basis-full md:basis-2/5 flex-shrink '>
      <div className='w-full  sm:w-fit sm:m-auto lg:mx-4 lg:fixed   '>
        <div id='productDisplay' className=' w-full h-96 sm:mt-4 sm:w-96 sm:h-96 rounded bg-red-200 relative'>
          <DisplayCanvas />
          {/* <Progress id='progressbar' className='absolute top-44 bottom-4 z-1' value={50} mx-12 color='amber' /> */}
          <div id='progress-container' className='absolute top-44 z-1 w-full animate-pulse'>
            <div className='flex items-center justify-center'>
               <label for="file" className='text-white align'>Loading Model...</label>
            </div>
            <progress  id='progressbar'  value='0' max='100' color='amber'></progress>
          </div>
          <div id='fullScreenIcon' onClick={toggleFullscreen} className='absolute bottom-0 right-0'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
          </svg>
          </div>
        </div>
        <div id='buttons' className='flex justify-between bg-white'>
          <button className='basis-1/2 mr-2  bg-amber-400 hover:bg-amber-500  text-white font-bold py-3 px-4 border border-amber-500 rounded'>BUY NOW</button>
          <button className='basis-1/2 ml-2  bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-4 border border-amber-600 rounded'>ADD TO CART</button>
        </div>
      </div>

    </div>
  )
}

export default ProductDisplay
