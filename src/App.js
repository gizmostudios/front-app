import styles from './App.module.scss';
import mask1 from './images/mask1';
import { cx, css } from '@emotion/css';

function App() {
  return (
    <div className={styles.images}>
      {mask1.map((image, index) => {
        
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
