import React from 'react';
import { Gift, Instagram } from 'lucide-react';

interface HeroProps {
  heroImage: string;
}

// Ícone do TikTok SVG inline para garantir compatibilidade
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className} 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

export const Hero: React.FC<HeroProps> = ({ heroImage }) => {
  
  const handleVipClick = () => {
    // Rastreamento de cliques
    const currentClicks = parseInt(localStorage.getItem('vip_click_count') || '0');
    const newCount = currentClicks + 1;
    localStorage.setItem('vip_click_count', newCount.toString());
    
    console.log(`📊 Botão VIP clicado! Total acumulado neste dispositivo: ${newCount}`);
    
    // Redirecionamento
    window.open("https://go.tribopay.com.br/zp79c09xnw", "_blank");
  };

  return (
    <div className="relative h-[80vh] min-h-[600px] w-full overflow-hidden flex items-center justify-center group bg-neutral-900">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Premium Background" 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-10 animate-fade-in">
        <span className="inline-block py-1 px-3 rounded-full bg-brand-600/20 border border-brand-500/50 text-brand-500 text-xs font-bold tracking-wider mb-6 backdrop-blur-sm">
          NOVA COLEÇÃO DISPONÍVEL
        </span>
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight drop-shadow-lg">
          Conteúdos porno da Paula, <br />
          <span className="text-2xl md:text-4xl block mt-4 font-light text-gray-200">
            venha me conhecer, que garanto te dar <span className="italic text-brand-500 font-bold">PRAZER</span>
          </span>
        </h1>
        
        {/* Botão Principal VIP */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10 mb-8">
          <button 
            onClick={handleVipClick}
            className="group flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-brand-600 to-red-600 hover:from-brand-500 hover:to-red-500 text-white rounded-full font-bold text-xl shadow-[0_0_30px_rgba(220,38,38,0.6)] transition-all transform hover:scale-105 hover:shadow-[0_0_50px_rgba(220,38,38,0.8)] border border-brand-500/50"
          >
            <Gift size={28} className="animate-bounce" />
            LIBERAR VIP
          </button>
        </div>

        {/* Botões Redes Sociais */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 items-center">
          {/* TikTok */}
          <a 
            href="https://www.tiktok.com/@Paulinhaa_.silvaa" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-6 py-3 rounded-full bg-black/60 border border-white/20 hover:bg-black/80 hover:border-brand-500 transition-all group min-w-[200px] justify-center backdrop-blur-md"
          >
            <TikTokIcon className="w-5 h-5 text-white group-hover:text-brand-500 transition-colors" />
            <div className="flex flex-col items-start">
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">TikTok</span>
              <span className="text-sm font-medium text-white group-hover:text-brand-500">@Paulinhaa_.silvaa</span>
            </div>
          </a>

          {/* Instagram */}
          <a 
            href="https://www.instagram.com/Paulinhaa_.silvaa" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-6 py-3 rounded-full bg-black/60 border border-white/20 hover:bg-black/80 hover:border-pink-500 transition-all group min-w-[200px] justify-center backdrop-blur-md"
          >
            <Instagram className="w-5 h-5 text-white group-hover:text-pink-500 transition-colors" />
            <div className="flex flex-col items-start">
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Instagram</span>
              <span className="text-sm font-medium text-white group-hover:text-pink-500">@Paulinhaa_.silvaa</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};