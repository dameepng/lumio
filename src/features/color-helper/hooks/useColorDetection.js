import { useCamera } from '../../rupiah-scanner/hooks/useCamera';
import { detectColors } from '../lib/detectColors';
import { useState, useCallback } from 'react';

export function useColorDetection() {
  const { videoRef, isReady, error, captureFrame } = useCamera();
  const [result, setResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  const scanColors = useCallback(async () => {
    if (isScanning || !isReady) return;
    setIsScanning(true);
    setResult(null);
    setCapturedImage(null);

    try {
      const base64 = captureFrame();
      if (!base64) throw new Error('Capture failed');
      setCapturedImage(base64);
      const data = await detectColors(base64);
      setResult(data);
    } catch (err) {
      console.error('Scan error:', err);
      setResult(null);
    } finally {
      setIsScanning(false);
    }
  }, [isScanning, isReady, captureFrame]);

  const resetScan = useCallback(() => {
    setResult(null);
    setCapturedImage(null);
  }, []);

  return { videoRef, isReady, error, result, isScanning, capturedImage, scanColors, resetScan };
}
