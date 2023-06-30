const layers = [];
const layerCount = 19;
const hiddenLayers = [];
const spinLayers = [];

for (let i = 0; i < layerCount; i++) {
  layers.push({
    file: require(`./mask5/lion-${i % layerCount}.png`),
    hidden: hiddenLayers.includes(i),
    spin: spinLayers.includes(i),
  })
}

// Extra layers
layers.push({
  file: require('./mask1/mask1-5.png'),
  spinReverse: true
})

// Extra layers
layers.push({
  file: require('./mask1/mask1-6.png'),
  spin: true
})

// Extra layers
layers.push({
  file: require('./mask1/mask1-11.png'),
})


export default layers;