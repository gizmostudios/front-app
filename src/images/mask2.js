const layers = [];
const layerCount = 24;
// const hiddenLayers = [];
const hiddenLayers = [3, 13, 14, 15];
const originalLayers = [2];
// const originalLayers = [2, 13, 14, 15];
const spinLayers = [];

for (let i = 0; i < layerCount; i++) {
  layers.push({
    file: require(`./mask2/mask2-${i}.png`),
    hidden: hiddenLayers.includes(i),
    spin: spinLayers.includes(i),
    original: originalLayers.includes(i),
  })
}

export default layers;