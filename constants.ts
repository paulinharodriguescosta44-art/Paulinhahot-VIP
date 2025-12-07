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
    description: 'me segue no insta @Paulinhaa_.silvaa',
    // Usando API de thumbnail do Google Drive para garantir carregamento rápido da capa
    thumbnailUrl: 'https://drive.google.com/thumbnail?id=10gFJo_72ZoO3B1x6Bap-2AHHrF-qJjeF&sz=w800', 
    // Link formatado para player do Vimeo
    previewUrl: 'https://player.vimeo.com/video/1144201363', 
    price: 0,
    duration: '00:15',
    tags: ['Gratuitos', 'Prévias'],
    isExclusive: false, 
    views: 0
  }
];