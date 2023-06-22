const layers = [];
const layerCount = 21;
const hiddenLayers = [];
const originalLayers = [19, 20];
const spinLayers = [];

for (let i = 0; i < layerCount; i++) {
  layers.push({
    file: require(`./mask4/databee-mask-lines-${i}.png`),
    hidden: hiddenLayers.includes(i),
    spin: spinLayers.includes(i),
    original: originalLayers.includes(i),
  })
}

export default layers;