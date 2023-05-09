const layers = [];
const layerCount = 4;
const hiddenLayers = [];
const spinLayers = [];

for(let i = 1; i <= layerCount; i++){
  layers.push({
    file: require(`./mask3/mask3-${i}.png`),
    hidden: hiddenLayers.includes(i),
    spin: spinLayers.includes(i),
  })
}

export default layers;