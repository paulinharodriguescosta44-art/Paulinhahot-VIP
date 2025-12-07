import { Video } from './types';

export const APP_NAME = "Paulinha Hot";
export const CURRENCY = "R$";

// --- CONFIGURAÇÃO DE VÍDEOS ---
// Adicione seus vídeos aqui manualmente.
// Para Google Drive: Use o link de embed/preview (ex: drive.google.com/file/d/ID/preview)
// Para Vimeo: Use o link do player (ex: player.vimeo.com/video/ID)

export const MOCK_VIDEOS: Video[] = [
  {
    id: 'vid_preview_01',
    title: '🔥PRÉVIAS🔥',
    description: '',
    // Usando API de thumbnail do Google Drive para garantir carregamento rápido da capa
    thumbnailUrl: 'https://drive.google.com/thumbnail?id=10gFJo_72ZoO3B1x6Bap-2AHHrF-qJjeF&sz=w800', 
    // Link formatado para player do Vimeo
    previewUrl: 'https://player.vimeo.com/video/1144201363', 
    price: 0,
    duration: '00:15',
    tags: ['Gratuitos', 'Prévias'],
    isExclusive: false, 
    views: 0
  },
  {
    id: 'vid_premium_05',
    title: 'Tenho a maior buceta do BRASIL!!!',
    description: '',
    thumbnailUrl: 'https://drive.google.com/thumbnail?id=1y2_zpN_wicMvT6j4oBA6VM4wEfUzSMMs&sz=w800',
    previewUrl: 'https://player.vimeo.com/video/1144203466',
    price: 29.90,
    duration: '00:27',
    tags: ['Premium', 'Close-up'],
    isExclusive: true, 
    views: 0
  },
  {
    id: 'vid_premium_04',
    title: 'Meu amante me comeu escondido!!!',
    description: '',
    thumbnailUrl: 'https://drive.google.com/thumbnail?id=1-xH_kke51jbGy8xtJVluExkkdLIaDEEF&sz=w800',
    previewUrl: 'https://player.vimeo.com/video/1144203449',
    price: 29.90,
    duration: '00:54',
    tags: ['Premium', 'Amador'],
    isExclusive: true, 
    views: 0
  },
  {
    id: 'vid_premium_03',
    title: 'Sentada gostosa, até gozar!!',
    description: '',
    thumbnailUrl: 'https://drive.google.com/thumbnail?id=1SzR_Kb-Xy02hoQh19fqZO9mvV3E5m7yN&sz=w800',
    previewUrl: 'https://player.vimeo.com/video/1144203453',
    price: 29.90,
    duration: '00:34',
    tags: ['Premium', 'Solo'],
    isExclusive: true, 
    views: 0
  },
  {
    id: 'vid_premium_02',
    title: 'Meu marido me socou com força!',
    description: '',
    thumbnailUrl: 'https://drive.google.com/thumbnail?id=185mvf5OdfE7dC5ChEC7gOT3QDDtNXHo8&sz=w800',
    previewUrl: 'https://player.vimeo.com/video/1144203457',
    price: 29.90,
    duration: '01:17',
    tags: ['Premium', 'Hardcore'],
    isExclusive: true, 
    views: 0
  },
  {
    id: 'vid_premium_01',
    title: 'Dei a buceta de quatro para meu marido',
    description: '',
    thumbnailUrl: 'https://drive.google.com/thumbnail?id=1iydtKbDu3KUjDQnRFEn7Bb54a2VL8q92&sz=w800',
    previewUrl: 'https://player.vimeo.com/video/1144202822',
    price: 29.90,
    duration: '00:50',
    tags: ['Premium', 'Casal'],
    isExclusive: true, 
    views: 0
  }
];