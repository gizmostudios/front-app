const layers = [];
const layerCount = 26;
const hiddenLayers = [1,2,3,7,12,16,19,20,21];
const spinLayers = [1,2,3,4,5,6];

for(let i = 1; i <= layerCount; i++){
  layers.push({
    file: require(`./mask1/mask1-${i}.png`),
    hidden: hiddenLayers.includes(i),
    spin: spinLayers.includes(i),
  })
}

export default layers;