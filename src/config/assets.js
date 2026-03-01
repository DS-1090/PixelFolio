const fallbackAssets = {
  resumePdfUrl: "/assets/resume.pdf",
  paintingImageUrl: "/assets/painting.png",
};

export const ASSET_URLS = {
  resumePdfUrl: import.meta.env.VITE_RESUME_PDF_URL || fallbackAssets.resumePdfUrl,
  paintingImageUrl:
    import.meta.env.VITE_PAINTING_IMAGE_URL || fallbackAssets.paintingImageUrl,
};

