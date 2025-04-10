"use client";

import React from "react";

export function ScrollIndicator() {
  const handleClick = () => {
    const element = document.getElementById('about');
    if (element) {
      const headerHeight = 64; // 헤더바 높이 (h-16 = 4rem = 64px)
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="absolute bottom-8 w-full flex justify-center animate-bounce">
      <div 
        className="flex flex-col items-center cursor-pointer"
        onClick={handleClick}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="32" 
          height="32" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="text-white"
        >
          <path d="M12 5v14M19 12l-7 7-7-7"/>
        </svg>
      </div>
    </div>
  );
} 