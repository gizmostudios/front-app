import { useEffect, useRef, useState } from 'react';
import styles from './App.module.scss';
import { cx } from '@emotion/css';
import { useMicrophone } from './audioAnalyzer';

import mask1 from './images/mask1';
import mask2 from './images/mask2';
import mask3 from './images/mask3';
import mask4 from './images/mask4';
import mask5 from './images/mask5';
import mask6 from './images/mask6';

function App() {

  const [currentMaskId, setCurrentMaskId] = useState(0);

  // TODO: animate image layers instead of wrapper
  let imageRefs = [];

  const masks = [mask1, mask2, mask3, mask4, mask5, mask6];
  const imagesRef = useRef(null);
  const volumeRef = useRef(null);

  const handleMaskChange = (newId) => {
    setCurrentMaskId(newId);
  }

  const minVol = .2;
  const maxVol = 1;

  useMicrophone(volume => {
    let vol = volume / 70;
    let scale = 1;


    if (vol < minVol) {
      scale = .5;
    }
    else if (vol >= maxVol) {
      scale = 1;
    } else {
      scale = .5 + vol / 2;
    }


    // volumeRef.current.innerText = vol;
    imagesRef.current.style.scale = scale;
  });

  const handleKeyPress = (event) => {
    const keyCode = event.keyCode;

    // Out of range
    if (keyCode < 49 || keyCode > 54) {
      return;
    }

    const keyPressMaskId = keyCode - 49;
    setCurrentMaskId(keyPressMaskId);
  }

  useEffect(() => {
    document.addEventListener('keyup', handleKeyPress);

    return () => {
      document.removeEventListener('keyup', handleKeyPress);
    }
  }, [])

  return (
    <div className={styles.Root}>
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
              Mask {i + 1}
            </button>
          ))}
        </div>
      </div>

      <div style={{ position: 'absolute', background: 'white' }} ref={volumeRef}></div>

      <div className={styles.images} ref={imagesRef}>
        {masks[currentMaskId].map((image, index) => {

          const imageStyles = {
            backgroundImage: image.original ? `url(${image.file})` : null,
            WebkitMaskImage: image.original ? null : `url(${image.file})`,
            animationDuration: `${Math.random() * 2 + 3}s`,
            animationDelay: `-${Math.random() * 3}s`
          }

          return (
            <div
              key={image.file}
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
