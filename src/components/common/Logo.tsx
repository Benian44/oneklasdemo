import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  showTagline?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = '', showTagline = false }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 2000);
    }
  };

  return (
    <Link 
      to="/" 
      className={`inline-block relative cursor-pointer ${className}`}
      onClick={handleClick}
    >
      <div className={`relative transition-transform duration-300 ${isAnimating ? 'scale-95' : 'scale-100'}`}>
        <img 
          src="/oneklas-logo.png" 
          alt="OneKlas Logo" 
          className="w-auto h-12 md:h-16"
        />
        {showTagline && (
          <p className="text-sm text-gray-600 mt-1">
            Une seule classe, des milliers de réussites.
          </p>
        )}
      </div>
      
      {isAnimating && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-lg" />
          <div className="relative">
            <div className="w-12 h-12 border-4 border-blue-800 border-t-transparent rounded-full animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src="/oneklas-logo.png" 
                alt="OneKlas Logo" 
                className="w-8 h-8 animate-pulse"
              />
            </div>
          </div>
        </div>
      )}
    </Link>
  );
};

export default Logo;