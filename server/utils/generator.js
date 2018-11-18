const generator = (from, para) => {
  return {
    from,
    para,
    createdAt: new Date().getTime()
  }
}

const generatorlocation = (from, latitude, longitude) => {
  return {
    from,
    url: `https://www.google.com/maps/?q=${latitude},${longitude}`,
    createdAt: new Date().getTime()
  }
}
module.exports = {
  generator,
  generatorlocation
}
