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
    } else if (!finalUrl.includes('autoplay=1')) {
      finalUrl += '&autoplay=1';
    }
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col animate-in fade-in duration-300">
      
      {/* Container Principal Fullscreen (Ocupa 100% da tela) */}
      <div className="relative w-full h-full bg-black flex flex-col">
        
        {/* Header Flutuante (Aparece sobre o vídeo com gradiente) */}
        <div className="flex justify-between items-center p-4 bg-gradient-to-b from-black/90 via-black/50 to-transparent absolute top-0 left-0 right-0 z-20">
          <div>
            <h3 className="text-white font-serif text-lg font-bold drop-shadow-md flex items-center gap-2">
              <Play size={16} className="text-brand-500 fill-brand-500" />
              {video.title}
            </h3>
          </div>
          <button 
            onClick={onClose} 
            className="bg-black/40 hover:bg-brand-600 text-white rounded-full p-2 transition-all backdrop-blur-md border border-white/10 hover:border-brand-500"
          >
            <X size={24} />
          </button>
        </div>

        {/* Área do Vídeo (Flex Grow para ocupar todo o espaço) */}
        <div className="flex-1 w-full h-full bg-black relative flex items-center justify-center">
          
          {/* Loading State - Z-Index 20 para garantir que apareça sobre o iframe enquanto carrega */}
          {isLoading && isEmbed && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-brand-500 z-20 bg-neutral-900 pointer-events-none">
              <Loader2 size={48} className="animate-spin mb-4" />
              <p className="text-gray-400 text-sm animate-pulse">Carregando conteúdo premium...</p>
            </div>
          )}

          {finalUrl ? (
            isEmbed ? (
              <iframe 
                src={finalUrl} 
                className="w-full h-full absolute inset-0 z-10" 
                frameBorder="0" 
                // Permissões completas para compatibilidade máxima com Google Drive
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" 
                allowFullScreen
                // Sandbox vital para scripts do Drive funcionarem em alguns navegadores
                sandbox="allow-same-origin allow-scripts allow-popups allow-presentation allow-forms"
                referrerPolicy="no-referrer" 
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
            <div className="text-center p-8 z-10 text-gray-400">
               <p>Vídeo indisponível no momento.</p>
            </div>
          )}
        </div>

        {/* Footer Minimalista (Sobreposto na parte inferior) */}
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 flex justify-end pointer-events-none">
           {/* Botão de Abrir Externamente - Interativo */}
           <a 
             href={finalUrl} 
             target="_blank" 
             rel="noreferrer"
             className="pointer-events-auto flex items-center gap-2 text-xs font-medium text-gray-300 hover:text-white transition-colors px-4 py-2 rounded-lg bg-black/40 hover:bg-white/10 border border-white/10"
           >
             <ExternalLink size={14} />
             Abrir externo (Caso não carregue)
           </a>
        </div>
      </div>
    </div>
  );
};