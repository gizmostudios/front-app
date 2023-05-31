import Meyda from 'meyda';
import {useEffect, useState} from 'react';

const getMedia = async () => {
  try {
    return await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    })
  } catch (err) {
    console.log('Error:', err)
  }
}

const useMediaAnalyser = () => {
  const [analyser, setAnalyser] = useState(null)
  const [running, setRunning] = useState(false)
  const [features, setFeatures] = useState(null)

  useEffect(() => {
    const audioContext = new AudioContext()

    let newAnalyser
    getMedia().then(stream => {
      if (audioContext.state === 'closed') {
        return
      }
      const source = audioContext.createMediaStreamSource(stream)
      newAnalyser = Meyda.createMeydaAnalyzer({
        audioContext: audioContext,
        source: source,
        bufferSize: 1024,
        featureExtractors: ['amplitudeSpectrum', 'mfcc', 'rms'],
        callback: features => {
          console.log(features)
          setFeatures(features)
        },
      })
      setAnalyser(newAnalyser)
    })
    return () => {
      if (newAnalyser) {
        newAnalyser.stop()
      }
      if (audioContext) {
        audioContext.close()
      }
    }
  }, [])

  useEffect(() => {
    if (analyser) {
      if (running) {
        analyser.start()
      } else {
        analyser.stop()
      }
    }
  }, [running, analyser])

  return [running, setRunning, features]
}

export default useMediaAnalyser;