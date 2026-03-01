const fallbackAssets = {
  resumePdfUrl: "assets/resume.pdf",
  paintingImageUrl: "assets/painting.png",
};

function resolveAssetUrl(input) {
  if (!input) return input;

  // Keep absolute URLs untouched; resolve local assets against Vite base path.
  if (/^(https?:)?\/\//i.test(input) || input.startsWith("data:")) return input;

  const normalized = input.startsWith("/") ? input.slice(1) : input;
  return `${import.meta.env.BASE_URL}${normalized}`;
}

export const ASSET_URLS = {
  resumePdfUrl: resolveAssetUrl(
    import.meta.env.VITE_RESUME_PDF_URL || fallbackAssets.resumePdfUrl,
  ),
  paintingImageUrl: resolveAssetUrl(
    import.meta.env.VITE_PAINTING_IMAGE_URL || fallbackAssets.paintingImageUrl,
  ),
};
