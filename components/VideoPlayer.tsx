import React, { useState } from 'react';
import { X, ExternalLink, Loader2, Play } from 'lucide-react';
import { Video } from '../types';

interface VideoPlayerProps {
  video: Video;
  onClose: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);

  // Verifica se é um embed (Vimeo, Drive, Youtube)
  const isEmbed = video.previewUrl?.includes('drive.google.com') || 
                  video.previewUrl?.includes('vimeo.com') || 
                  video.previewUrl?.includes('youtube.com');

  // Otimiza URL do Vimeo para remover distrações e ativar autoplay
  let finalUrl = video.previewUrl || '';
  if (finalUrl.includes('vimeo.com')) {
    if (!finalUrl.includes('?')) {
      finalUrl += '?autoplay=1&title=0&byline=0&portrait=0&badge=0';
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 animate-in fade-in duration-300">
      
      {/* Container Principal */}
      <div className="relative w-full max-w-6xl bg-neutral-900/50 rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex flex-col animate-in zoom-in-95 duration-300">
        
        {/* Header do Player */}
        <div className="flex justify-between items-center p-4 bg-gradient-to-b from-black/90 to-black/0 absolute top-0 left-0 right-0 z-20 pointer-events-none">
          <div className="pointer-events-auto">
            <h3 className="text-white font-serif text-lg font-bold drop-shadow-md flex items-center gap-2">
              <Play size={16} className="text-brand-500 fill-brand-500" />
              {video.title}
            </h3>
          </div>
          <button 
            onClick={onClose} 
            className="bg-black/40 hover:bg-brand-600 text-white rounded-full p-2 transition-all backdrop-blur-md pointer-events-auto border border-white/10 hover:border-brand-500"
          >
            <X size={24} />
          </button>
        </div>

        {/* Área do Vídeo */}
        <div className="aspect-video bg-black relative flex items-center justify-center w-full">
          
          {/* Loading State */}
          {isLoading && isEmbed && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-brand-500 z-0">
              <Loader2 size={48} className="animate-spin mb-4" />
              <p className="text-gray-400 text-sm animate-pulse">Carregando conteúdo premium...</p>
            </div>
          )}

          {finalUrl ? (
            isEmbed ? (
              <iframe 
                src={finalUrl} 
                className="w-full h-full relative z-10" 
                frameBorder="0" 
                allow="autoplay; fullscreen; picture-in-picture" 
                allowFullScreen
                title={video.title}
                onLoad={() => setIsLoading(false)}
              ></iframe>
            ) : (
              <video 
                src={finalUrl} 
                controls 
                autoPlay 
                className="w-full h-full object-contain relative z-10"
              />
            )
          ) : (
            <div className="text-center p-8 z-10">
               <p className="text-gray-400">Vídeo indisponível no momento.</p>
            </div>
          )}
        </div>

        {/* Footer / Controles Extras */}
        <div className="bg-neutral-900 border-t border-white/5 p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
           <div className="text-sm text-gray-400 hidden sm:block">
             <span className="text-brand-500 font-bold">Dica:</span> Use fones de ouvido para melhor experiência 🎧
           </div>
           
           {/* Botão de Abrir Externamente (Útil para mobile/Drive) */}
           <a 
             href={finalUrl} 
             target="_blank" 
             rel="noreferrer"
             className="flex items-center gap-2 text-xs font-medium text-gray-500 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10"
           >
             <ExternalLink size={14} />
             Abrir player externo (caso não carregue)
           </a>
        </div>
      </div>
    </div>
  );
};