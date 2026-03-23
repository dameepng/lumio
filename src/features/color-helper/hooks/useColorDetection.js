import { useState, useCallback } from 'react';
import { useCamera } from '../../rupiah-scanner/hooks/useCamera';
import { detectColors } from '../lib/detectColors';

export function useColorDetection() {
  const { videoRef, isReady, error, captureFrame } = useCamera();
  const [colors, setColors] = useState([]);
  const [isScanning, setIsScanning] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  const scanColors = useCallback(async () => {
    if (isScanning || !isReady) return;
    setIsScanning(true);
    setColors([]);
    setCapturedImage(null);

    try {
      const base64 = captureFrame();
      if (!base64) throw new Error('Capture failed');

      setCapturedImage(base64);
      const result = await detectColors(base64);
      setColors(result);
    } catch (err) {
      console.error('Color detection error:', err);
      setColors([]);
    } finally {
      setIsScanning(false);
    }
  }, [isScanning, isReady, captureFrame]);

  const resetScan = useCallback(() => {
    setColors([]);
    setCapturedImage(null);
  }, []);

  return { videoRef, isReady, error, colors, isScanning, capturedImage, scanColors, resetScan };
}
