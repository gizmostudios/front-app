const layers = [];
const layerCount = 30;
const hiddenLayers = [];
const spinLayers = [];

for (let i = 0; i < layerCount; i++) {
  layers.push({
    file: require(`./mask6/databee-elephant-lines-${i + 1}.png`),
    hidden: hiddenLayers.includes(i),
    spin: spinLayers.includes(i),
  })
}

export default layers;