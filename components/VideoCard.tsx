import React from 'react';
import { Play, Lock, Unlock } from 'lucide-react';
import { Video } from '../types';

interface VideoCardProps {
  video: Video;
  isUnlocked: boolean;
  onClick: (video: Video) => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({ 
  video, 
  isUnlocked, 
  onClick
}) => {
  // Logic: 
  // Free video -> Always Unlocked (Show Play)
  // Exclusive (VIP) -> Show Lock (unless user bought it)
  const showLock = video.isExclusive && !isUnlocked;

  return (
    <div 
      className="group relative bg-neutral-900 rounded-xl overflow-hidden border transition-all duration-300 cursor-pointer border-white/5 hover:border-brand-600/50"
      onClick={() => onClick(video)}
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={video.thumbnailUrl} 
          alt={video.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2 z-10">
          {video.isExclusive ? (
            <span className="bg-brand-gold text-black text-xs font-bold px-2 py-1 rounded bg-yellow-500">
              PREMIUM
            </span>
          ) : (
            <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">
              GRÁTIS
            </span>
          )}
        </div>

        {/* Center Icon: Lock or Play */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className={`text-white rounded-full p-4 backdrop-blur-sm transform scale-90 group-hover:scale-100 transition-transform shadow-xl ${showLock ? 'bg-neutral-800/90' : 'bg-brand-600/90'}`}>
            {showLock ? (
              <Lock size={24} />
            ) : (
              <Play size={24} fill="currentColor" className="ml-1" />
            )}
          </div>
        </div>
        
        <span className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-xs px-2 py-1 rounded">
          {video.duration}
        </span>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-medium text-white group-hover:text-brand-500 transition-colors line-clamp-1">
            {video.title}
          </h3>
        </div>
        
        <p className="text-gray-400 text-sm line-clamp-2 mb-4 h-10">
          {video.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          {/* Spacer */}
          <div></div> 
          
          {!showLock && (
            <span className="text-green-400 font-bold text-sm flex items-center gap-1">
              <Unlock size={12} />
              Acesso Liberado
            </span>
          )}
        </div>
      </div>
    </div>
  );
};