const layers = [];
const layerCount = 26;
const hiddenLayers = [1, 2, 3, 7, 12, 19, 20, 21];
const originalLayers = [16];
const spinLayers = [4, 6];
const spinReverseLayers = [5];

for (let i = 0; i < layerCount; i++) {
  layers.push({
    file: require(`./mask1/mask1-${i}.png`),
    hidden: hiddenLayers.includes(i),
    spin: spinLayers.includes(i),
    spinReverse: spinReverseLayers.includes(i),
    original: originalLayers.includes(i),
  })
}

export default layers;