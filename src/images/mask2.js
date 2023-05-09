const layers = [];
const layerCount = 24;
const hiddenLayers = [];
const spinLayers = [];

for(let i = 1; i <= layerCount; i++){
  layers.push({
    file: require(`./mask2/mask2-${i}.png`),
    hidden: hiddenLayers.includes(i),
    spin: spinLayers.includes(i),
  })
}

export default layers;