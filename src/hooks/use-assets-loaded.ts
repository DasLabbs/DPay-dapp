import { useEffect, useState } from 'react';

export function useAssetsLoaded(imageUrls: string[]) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const waitForFonts = document.fonts.ready;

    const waitForImages = Promise.all(
      imageUrls.map(
        (src) =>
          new Promise((resolve) => {
            const img = new Image();
            img.src = src;
            img.onload = resolve;
            img.onerror = resolve; // tránh treo app
          })
      )
    );

    const fallbackTimeout = new Promise((resolve) => setTimeout(resolve, 1500));

    Promise.race([Promise.all([waitForFonts, waitForImages]), fallbackTimeout]).then(() => {
      setLoaded(true);
    });
  }, [imageUrls]);

  return loaded;
}
