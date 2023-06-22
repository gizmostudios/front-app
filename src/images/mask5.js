const layers = [];
const layerCount = 19;
const hiddenLayers = [];
const spinLayers = [];

for (let i = 0; i < layerCount; i++) {
  layers.push({
    file: require(`./mask5/lion-${i}.png`),
    hidden: hiddenLayers.includes(i),
    spin: spinLayers.includes(i),
  })
}

export default layers;