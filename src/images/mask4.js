const layers = [];
const layerCount = 19;
const hiddenLayers = [];
const spinLayers = [];

for (let i = 0; i < layerCount * 2; i++) {
  layers.push({
    file: require(`./mask4/databee-mask-lines-${i % layerCount + 1}.png`),
    // file: require(`./mask3/mask3-${i % layerCount + 1}.png`),
    hidden: hiddenLayers.includes(i),
    spin: spinLayers.includes(i),
  })
}

export default layers;