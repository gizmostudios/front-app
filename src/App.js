import styles from './App.module.scss';
import mask1 from './images/mask1';
import mask2 from './images/mask2';
import mask3 from './images/mask3';
import { cx, css } from '@emotion/css';

function App() {

  // const currentMaskIndex = 3;
  // const currentMask = currentMaskIndex === 3 ? mask1 : mask2;

  return (
    <div className={styles.images}>
      {mask2.map((image, index) => {
        
        const imageStyles = {
          WebkitMaskImage: `url(${image.file})`,
          animationDuration: `${15}s`,
          animationDelay: `-${Math.random() * 10}s`
        }

        return (
          <div
            id={`layer_${index}`}
            key={image.file}
            className={cx(
              styles.imageWrapper,
              {
                [styles.spin] : image.spin,
                [styles.hidden] : image.hidden
              }
            )}
          >
            <div
              className={styles.image}
              style={imageStyles}
            >
              <div
                className={styles.ring}
                style={{
                  animationDuration: `${15}s`,
                  animationDelay: `-${index * 2500}ms`
                }}
              />
            </div>
          </div>
        )
      })}
    </div>
  );
}

export default App;
