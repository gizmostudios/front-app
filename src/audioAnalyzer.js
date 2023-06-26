import { useEffect } from 'react';
// import { useState, useEffect } from 'react';

const useMicrophone = (getVolume) => {

  // const [volume, setVolume] = useState(0);

  useEffect(() => {
    if (navigator.mediaDevices.getUserMedia === null) {
      console.error('Web Media API not supported')
      return;
    }

    const getStream = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: false,
        audio: true,
      });

      // Construct audio pipeline
      const audioCtx = new AudioContext();
      const analyser = audioCtx.createAnalyser();
      const sampleSize = 2048;
      analyser.fftSize = sampleSize;
      const audioSrc = audioCtx.createMediaStreamSource(stream);
      audioSrc.connect(analyser);

      // Compile data object
      const data = new Uint8Array(analyser.frequencyBinCount);

      const loopingFunction = () => {
        analyser.getByteFrequencyData(data);
        const peak = data.reduce((a, b) => a + b, 0) / sampleSize;

        // Callback (TODO: state hook, but without the rerenders (?))
        if (getVolume) {
          getVolume(peak);
        }

        requestAnimationFrame(loopingFunction);
      };

      requestAnimationFrame(loopingFunction);
    }

    getStream();
  }, [getVolume])

  // return volume;
}

export {
  useMicrophone,
}