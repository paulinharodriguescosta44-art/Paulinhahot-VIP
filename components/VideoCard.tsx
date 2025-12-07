import React, { useState } from 'react';
import { Play, Lock, Unlock, Image as ImageIcon, Heart, Eye } from 'lucide-react';
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
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  
  // Logic: 
  // Free video -> Always Unlocked (Show Play)
  // Exclusive (VIP) -> Show Lock (unless user bought it)
  const showLock = video.isExclusive && !isUnlocked;

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evita abrir o vídeo ao clicar no curtir
    setIsLiked(!isLiked);
  };

  return (
    <div 
      className="group relative bg-neutral-900 rounded-xl overflow-hidden border transition-all duration-300 cursor-pointer border-white/5 hover:border-brand-600/50 hover:shadow-xl hover:shadow-brand-900/20"
      onClick={() => onClick(video)}
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-800">
        
        {/* Skeleton Loader (Pulsing background while loading) */}
        {!isImageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center animate-pulse bg-neutral-800 z-0">
             <ImageIcon className="text-neutral-700 w-12 h-12" />
          </div>
        )}

        <img 
          src={video.thumbnailUrl} 
          alt={video.title} 
          loading="lazy"
          referrerPolicy="no-referrer"
          onLoad={() => setIsImageLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
        
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2 z-10">
          {video.isExclusive ? (
            <span className="bg-brand-gold text-black text-xs font-bold px-2 py-1 rounded bg-yellow-500 shadow-md">
              PREMIUM
            </span>
          ) : (
            <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded shadow-md">
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
        
        <span className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-xs px-2 py-1 rounded border border-white/10">
          {video.duration}
        </span>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col h-[140px]">
        <div className="mb-1">
          <h3 className="text-lg font-medium text-white group-hover:text-brand-500 transition-colors line-clamp-1">
            {video.title}
          </h3>
        </div>
        
        <p className="text-gray-400 text-sm line-clamp-2 mb-2 flex-grow">
          {video.description}
        </p>

        {/* Footer Actions */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/10">
          
          <div className="flex items-center gap-4">
            {/* Visualizações Dinâmicas */}
            <div className="flex items-center gap-1.5 text-gray-400 text-xs font-medium" title="Visualizações">
              <Eye size={14} className="text-gray-500" />
              <span>{video.views ? video.views.toLocaleString('pt-BR') : '15.347'}</span>
            </div>

            {/* Botão de Curtir */}
            <button 
              onClick={handleLike}
              className="group/like flex items-center justify-center transition-transform active:scale-90"
              title="Curtir"
            >
              <Heart 
                size={18} 
                className={`transition-all duration-300 ${isLiked ? 'fill-brand-500 text-brand-500' : 'text-gray-500 group-hover/like:text-white'}`} 
              />
            </button>
          </div>
          
          {/* Status de Acesso */}
          {!showLock ? (
            <span className="text-green-400 font-bold text-xs flex items-center gap-1 bg-green-900/10 px-2 py-1 rounded-full border border-green-900/20">
              <Unlock size={10} />
              Liberado
            </span>
          ) : (
            <span className="text-gray-500 text-xs flex items-center gap-1">
              <Lock size={12} />
              Bloqueado
            </span>
          )}
        </div>
      </div>
    </div>
  );
};