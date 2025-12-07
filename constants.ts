import { Video } from './types';

export const APP_NAME = "Paulinha Hot";
export const CURRENCY = "R$";

// Função para gerar visualizações aleatórias entre 15.000 e 20.000
const getRandomViews = () => {
  return Math.floor(Math.random() * (20000 - 15000 + 1)) + 15000;
};

// --- CONFIGURAÇÃO DE IMAGENS ---
// O Google Drive não serve bem para imagens de site (dá erro 403/tela preta).
// RECOMENDAÇÃO:
// 1. Entre em https://postimages.org/
// 2. Envie sua foto.
// 3. Copie o "Link Direto" (Direct Link).
// 4. Cole o link nas 'thumbnailUrl' abaixo.

export const MOCK_VIDEOS: Video[] = [
  {
    id: 'vid_preview_01',
    title: '🔥PRÉVIAS🔥', 
    description: '',
    thumbnailUrl: 'https://i.postimg.cc/zBXj5Prf/foto-previa-1.jpg', 
    previewUrl: 'https://player.vimeo.com/video/1144201363',
    price: 0,
    duration: '00:15',
    tags: ['Gratuitos', 'Prévias'],
    isExclusive: false, 
    views: 23894
  },
  {
    id: 'vid_premium_05',
    title: 'Tenho a maior buceta do BRASIL!!!',
    description: '',
    thumbnailUrl: 'https://i.postimg.cc/MZfsGNBx/foto-5.jpg',
    previewUrl: 'https://player.vimeo.com/video/1144203466',
    price: 29.90,
    duration: '00:27',
    tags: ['Premium', 'Close-up'],
    isExclusive: true, 
    views: getRandomViews()
  },
  {
    id: 'vid_premium_01',
    title: 'Dei a buceta de quatro para meu marido',
    description: '',
    thumbnailUrl: 'https://i.postimg.cc/BQxMTFNp/foto-1-(2).jpg',
    previewUrl: 'https://player.vimeo.com/video/1144202822',
    price: 29.90,
    duration: '00:50',
    tags: ['Premium', 'Casal'],
    isExclusive: true, 
    views: getRandomViews()
  },
  {
    id: 'vid_premium_04',
    title: 'Meu amante me comeu escondido!!!',
    description: '',
    thumbnailUrl: 'https://i.postimg.cc/zXmxH7wj/foto-4.jpg',
    previewUrl: 'https://vimeo.com/1144210481?share=copy&fl=sv&fe=ci',
    price: 29.90,
    duration: '00:54',
    tags: ['Premium', 'Amador'],
    isExclusive: true, 
    views: getRandomViews()
  },
  {
    id: 'vid_premium_03',
    title: 'Sentada gostosa, até gozar!!',
    description: '',
    thumbnailUrl: 'https://i.postimg.cc/15xvVB0C/foto-3.jpg',
    previewUrl: 'https://player.vimeo.com/video/1144203453',
    price: 29.90,
    duration: '00:34',
    tags: ['Premium', 'Solo'],
    isExclusive: true, 
    views: getRandomViews()
  },
  {
    id: 'vid_premium_02',
    title: 'Meu marido me socou com força!',
    description: '',
    thumbnailUrl: 'https://i.postimg.cc/7Ygm3zX3/foto-2-(2).jpg',
    previewUrl: 'https://player.vimeo.com/video/1144203457',
    price: 29.90,
    duration: '01:17',
    tags: ['Premium', 'Hardcore'],
    isExclusive: true, 
    views: getRandomViews()
  }
];