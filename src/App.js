import { useEffect, useRef, useState } from 'react';
import styles from './App.module.scss';
import { cx } from '@emotion/css';
import { useMicrophone } from './audioAnalyzer';

import mask1 from './images/mask1';
import mask2 from './images/mask2';
import mask3 from './images/mask3';
// import mask4 from './images/mask4';
import mask5 from './images/mask5';
import mask6 from './images/mask6';

function App() {

  const masks = [
    mask1,
    mask2,
    mask3,
    // mask4,
    mask5,
    mask6
  ];
  const [showControls, setShowControls] = useState(false);
  const [currentMaskId, setCurrentMaskId] = useState(0);
  const imagesRef = useRef(null);
  const volumeRef = useRef(null);
  let layersRef = useRef([]);
  const directions = Array.from(Array(30)).map(() => Math.random() > .5 ? -1 : 1);

  const handleMaskChange = (newId) => {
    setCurrentMaskId(newId);
  }

  const minVol = 0;
  const maxVol = 5;
  const minScale = .1;
  const maxScale = 5;
  const baseScale = .5;

  useMicrophone(volume => {
    let vol = volume / 10;
    let scale = baseScale + vol / 2;

    // Min clip
    if (vol < minVol) {
      scale = minScale;
    }

    // Max clip
    if (vol >= maxVol || scale >= maxScale) {
      scale = maxScale;
    }

    // volumeRef.current.innerText = vol;
    layersRef.current.forEach((layer, index) => {

      // TODO: find a way to reset the useRef array. Own comp/rerender on switch?
      if (!layer) return;

      const dir = directions[index];
      layer.style.scale = 1 + (scale * ((index / 25) * dir));
    });
  });

  const handleKeyPress = (event) => {
    const keyPressed = event.key;

    // Cancel when out of range
    if (isNaN(keyPressed) || keyPressed < 1 || keyPressed > masks.length) {
      return;
    }

    handleMaskChange(keyPressed - 1);
  }

  // Bind keypress events
  useEffect(() => {
    document.addEventListener('keyup', handleKeyPress);

    return () => {
      document.removeEventListener('keyup', handleKeyPress);
    }
  }, [])

  return (
    <div className={styles.Root}>

      {/* CONTROLS */}
      {showControls && (
        <>
          <div className={styles.controls}>
            <div className={styles.controlsGroup}>
              {masks.map((m, i) => (
                <button
                  key={`btn-${i}`}
                  type="button"
                  className={cx(styles.controlButton, {
                    [styles.active]: currentMaskId === i
                  })}
                  onClick={() => handleMaskChange(i)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
          <div style={{ position: 'absolute', background: 'white' }} ref={volumeRef}></div>
        </>
      )}

      {/* IMAGES */}
      <div className={styles.images} ref={imagesRef}>
        {masks[currentMaskId] && masks[currentMaskId].map((image, index) => {

          const imageStyles = {
            backgroundImage: image.original ? `url(${image.file})` : null,
            WebkitMaskImage: image.original ? null : `url(${image.file})`,
            animationDuration: `${Math.random() * 2 + 3}s`,
            animationDelay: `-${Math.random() * 3}s`
          }

          return (
            <div
              key={image.file}
              ref={(ref) => (layersRef.current[index] = ref)}
              className={cx(
                styles.imageRoot,
              )}
            >
              <div
                id={`layer_${index}`}
                className={cx(
                  styles.imageWrapper,
                  {
                    [styles.spin]: image.spin,
                    [styles.spinReverse]: image.spinReverse,
                    [styles.hidden]: image.hidden
                  }
                )}
                style={{
                  animationDuration: `${Math.random() * 25 + 15}s`
                }}
              >
                <div
                  data-original={image.original}
                  className={cx(styles.image)}
                  style={imageStyles}
                >
                  {!image.original && (
                    <div
                      className={styles.ring}
                      style={{
                        animationDuration: `${10}s`,
                        animationDelay: `-${index * 1500}ms`
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
