const layers = [];
const layerCount = 19;
const hiddenLayers = [];
const spinLayers = [];

for (let i = 0; i < layerCount * 2; i++) {
  layers.push({
    file: require(`./mask5/lion-${i % layerCount + 1}.png`),
    hidden: hiddenLayers.includes(i),
    spin: spinLayers.includes(i),
  })
}

export default layers;