import { useEffect, useState } from 'react';
import styles from './App.module.scss';
import { cx } from '@emotion/css';
// import useMediaAnalyzer from './audioAnalyzer';

import mask1 from './images/mask1';
import mask2 from './images/mask2';
import mask3 from './images/mask3';
import mask4 from './images/mask4';
import mask5 from './images/mask5';
import mask6 from './images/mask6';

function App() {

  const [currentMaskId, setCurrentMaskId] = useState(0);
  // const masks = [mask6];
  const masks = [mask1, mask2, mask3, mask4, mask5, mask6];

  // const mediaAnalyzer = useMediaAnalyzer();
  // mediaAnalyzer.setRunning(true);
  // console.log(mediaAnalyzer);

  const handleMaskChange = (newId) => {
    setCurrentMaskId(newId);
  }

  useEffect(() => {

  }, [])

  const handleKeyPress = (event) => {
    console.log(event);
  }

  return (
    <div className={styles.Root} onKeyUp={handleKeyPress}>
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

      <div className={styles.images}>
        {masks[currentMaskId].map((image, index) => {

          const imageStyles = {
            backgroundImage: image.original ? `url(${image.file})` : null,
            WebkitMaskImage: image.original ? null : `url(${image.file})`,
            animationDuration: `${Math.random() * 2 + 3}s`,
            animationDelay: `-${Math.random() * 3}s`
          }

          return (
            <div
              key={Math.random()}
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
