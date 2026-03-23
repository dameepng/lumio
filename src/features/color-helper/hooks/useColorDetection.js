import { useState, useRef, useCallback } from 'react';
import { useCamera } from '../../rupiah-scanner/hooks/useCamera';
import { detectColors } from '../lib/detectColors';

export function useColorDetection() {
  const { videoRef, isReady, error, captureFrame } = useCamera();
  const [colors, setColors] = useState([]);
  const [isScanning, setIsScanning] = useState(false);
  const [lastScan, setLastScan] = useState(null);
  const intervalRef = useRef(null);
  const scanningRef = useRef(false);

  const startDetection = useCallback(() => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(async () => {
      // Guard against overlapping requests
      if (scanningRef.current) return;

      scanningRef.current = true;
      setIsScanning(true);

      try {
        const base64 = captureFrame();
        if (base64) {
          const detected = await detectColors(base64);
          setColors(detected);
          setLastScan(Date.now());
        }
      } catch (err) {
        console.error('Color detection error:', err);
      } finally {
        scanningRef.current = false;
        setIsScanning(false);
      }
    }, 2000);
  }, [captureFrame]);

  const stopDetection = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    scanningRef.current = false;
    setIsScanning(false);
  }, []);

  return { videoRef, isReady, error, colors, isScanning, startDetection, stopDetection };
}
