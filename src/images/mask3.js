const layers = [];
const layerCount = 4;
const hiddenLayers = [];
const spinLayers = [2,3,4];

for(let i = 0; i < layerCount*2; i++){
  layers.push({
    file: require(`./mask3/mask3-${i%layerCount+1}.png`),
    hidden: hiddenLayers.includes(i),
    spin: spinLayers.includes(i),
  })
}

export default layers;