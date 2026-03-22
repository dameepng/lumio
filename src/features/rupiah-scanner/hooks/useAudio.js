import { useRef, useCallback } from 'react';

export function useAudio() {
  const audioRef = useRef(new Audio());

  const play = useCallback(async (nominalKey) => {
    return new Promise((resolve) => {
      audioRef.current.src = `/audio/${nominalKey}.mp3`;
      audioRef.current.play().then(resolve).catch((err) => {
        // silent fail when audio not found
        console.warn(`Silenced audio play error for ${nominalKey}:`, err.message);
        resolve();
      });
    });
  }, []);

  const playSequence = useCallback(async (keys, delayMs = 500) => {
    for (const key of keys) {
      await play(key);
      await new Promise(r => setTimeout(r, delayMs));
    }
  }, [play]);

  return { play, playSequence };
}
