import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { VideoCard } from './components/VideoCard';
import { VipCodeModal } from './components/VipCodeModal';
import { MOCK_VIDEOS } from './constants';
import { Video, UserState } from './types';
import { Lock, X } from 'lucide-react';

// Player Atualizado para suportar Embeds (Drive/Vimeo)
const VideoPlayer: React.FC<{ video: Video; onClose: () => void }> = ({ video, onClose }) => {
  // Verifica se é um link que precisa de iframe (Vimeo, Drive, Youtube, etc)
  const isEmbed = video.previewUrl?.includes('drive.google.com') || 
                  video.previewUrl?.includes('vimeo.com') || 
                  video.previewUrl?.includes('youtube.com');

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-fade-in">
      <div className="relative w-full max-w-5xl bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10">
        <div className="flex justify-between items-center p-4 absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
          <h3 className="text-white font-serif text-lg truncate pr-8 pointer-events-auto">{video.title}</h3>
          <button onClick={onClose} className="bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors pointer-events-auto">
            <X size={24} />
          </button>
        </div>
        <div className="aspect-video bg-neutral-900 flex items-center justify-center relative">
          {video.previewUrl ? (
            isEmbed ? (
              <iframe 
                src={video.previewUrl} 
                className="w-full h-full" 
                frameBorder="0" 
                allow="autoplay; fullscreen; picture-in-picture" 
                allowFullScreen
                title={video.title}
              ></iframe>
            ) : (
              <video 
                src={video.previewUrl} 
                controls 
                autoPlay 
                className="w-full h-full object-contain"
              />
            )
          ) : (
            <div className="text-center p-8">
               <p className="text-gray-400">Vídeo indisponível no momento.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  // Carrega estado do usuário (VIP, favoritos, etc)
  const loadUserState = (): UserState => {
    try {
      const saved = localStorage.getItem('paulinha_state');
      return saved ? JSON.parse(saved) : { 
        isAgeVerified: true, 
        unlockedVideos: [], 
        favorites: [],
        isVipUnlocked: false
      };
    } catch (e) {
      return { isAgeVerified: true, unlockedVideos: [], favorites: [], isVipUnlocked: false };
    }
  };

  const [userState, setUserState] = useState<UserState>(loadUserState);
  // Vídeos agora vêm direto do código (constants.ts)
  const [videos] = useState<Video[]>(MOCK_VIDEOS);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [isVipModalOpen, setIsVipModalOpen] = useState(false);
  const [playingVideo, setPlayingVideo] = useState<Video | null>(null);

  // Salva estado do usuário ao alterar
  useEffect(() => {
    localStorage.setItem('paulinha_state', JSON.stringify(userState));
  }, [userState]);

  const handleVideoClick = (video: Video) => {
    const isUnlocked = userState.unlockedVideos.includes(video.id);
    const isGlobalVip = userState.isVipUnlocked;

    // Se o vídeo é grátis OU já foi liberado OU o usuário tem a senha VIP
    if (!video.isExclusive || isUnlocked || isGlobalVip) {
       setPlayingVideo(video); 
    } else {
      // Bloqueado
      const confirmPurchase = window.confirm(`🔒 CONTEÚDO VIP\n\nEste conteúdo é exclusivo da Paulinha.\nDeseja liberar o acesso completo agora?`);
      if (confirmPurchase) {
        window.open("https://go.tribopay.com.br/zp79c09xnw", "_blank");
      }
    }
  };

  const handleVipSuccess = () => {
    setUserState(prev => ({ ...prev, isVipUnlocked: true }));
    setIsVipModalOpen(false);
    alert("🔥 SENHA CORRETA!\n\nVocê agora tem acesso TOTAL e ILIMITADO a todos os vídeos. Aproveite!");
  };

  const categories = ['Todos', 'Premium', 'Gratuitos'];

  const filteredVideos = videos.filter(v => {
    if (selectedCategory === 'Todos') return true;
    if (selectedCategory === 'Premium') return v.isExclusive;
    if (selectedCategory === 'Gratuitos') return !v.isExclusive;
    return v.tags.includes(selectedCategory);
  });

  return (
    <div className="min-h-screen bg-neutral-950 font-sans text-gray-100 selection:bg-brand-600 selection:text-white pb-20 relative">
      
      <Navbar 
        onOpenVipModal={() => setIsVipModalOpen(true)}
      />

      <main>
        {/* Usando o link de Thumbnail sz=w1920 que é mais confiável para embeds do que o link de export=view */}
        <Hero 
          heroImage="https://drive.google.com/thumbnail?id=1rDVrqJeTlYGmnaeDLXg_FHaObUEv5oOZ&sz=w1920" 
        />

        {/* Filters */}
        <div className="sticky top-16 z-30 bg-neutral-950/80 backdrop-blur-lg border-b border-white/5 py-4">
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all ${
                    selectedCategory === cat 
                      ? 'bg-white text-black' 
                      : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* VIP Active Banner */}
        {userState.isVipUnlocked && (
          <div className="bg-green-900/20 border-b border-green-900/50 py-2 text-center animate-fade-in-down">
            <p className="text-green-400 text-sm font-bold flex items-center justify-center gap-2">
               <Lock size={14} className="text-green-400" /> ACESSO VIP ATIVO
            </p>
          </div>
        )}

        {/* Grid */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <div className="h-8 w-1 bg-brand-600 rounded-full"></div>
              <h2 className="text-2xl font-serif font-bold text-white">Conteúdo da Paula🔞</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map(video => (
              <VideoCard
                key={video.id}
                video={video}
                isUnlocked={userState.unlockedVideos.includes(video.id) || userState.isVipUnlocked}
                onClick={handleVideoClick}
              />
            ))}
          </div>

          {filteredVideos.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-gray-500 border border-dashed border-white/10 rounded-xl bg-white/5">
              <p className="text-xl mb-2 font-serif">O catálogo está vazio.</p>
              <p className="text-sm">Edite o arquivo constants.ts para adicionar vídeos.</p>
            </div>
          )}
        </div>

        {/* Value Prop */}
        <div className="bg-brand-900/30 border-y border-brand-900/50 py-16 mt-8">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <Lock className="mx-auto text-brand-500 mb-4" size={40} />
            <h2 className="text-3xl font-serif text-white mb-4">Total Privacidade e Segurança</h2>
            <p className="text-gray-400 mb-8">
              Suas compras são processadas com criptografia de ponta a ponta. 
              No extrato bancário, aparecerá apenas como "PAY-DIGITAL-SVS".
            </p>
            <div className="flex flex-wrap justify-center gap-8 opacity-50 grayscale">
              <span className="text-xl font-bold tracking-widest text-white">VISA</span>
              <span className="text-xl font-bold tracking-widest text-white">MASTERCARD</span>
              <span className="text-xl font-bold tracking-widest text-white">PIX</span>
            </div>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-black py-12 border-t border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 text-center relative">
          <p className="text-2xl font-serif italic font-bold text-brand-600 mb-4">Paulinha Hot</p>
          <div className="flex justify-center gap-6 text-sm text-gray-500 mb-8">
            <a href="#" className="hover:text-white">Termos de Uso</a>
            <a href="#" className="hover:text-white">Privacidade</a>
            <a href="#" className="hover:text-white">Suporte</a>
          </div>
          <p className="text-xs text-gray-700">
            © 2024 Paulinha Hot. Todos os direitos reservados. 18+ Apenas.
          </p>
        </div>
      </footer>

      {/* Vip Code Modal */}
      {isVipModalOpen && (
        <VipCodeModal 
          onClose={() => setIsVipModalOpen(false)}
          onSuccess={handleVipSuccess}
        />
      )}

      {/* Video Player Overlay */}
      {playingVideo && (
        <VideoPlayer 
          video={playingVideo} 
          onClose={() => setPlayingVideo(null)} 
        />
      )}
    </div>
  );
};

export default App;