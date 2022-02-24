const getImages = (folder) => {
    let images = [];
    let err = null;
    for (let currentImg = 1; err === null; currentImg += 1) {
      try {
        const newImage = require( '../assets/images/' + folder + '/' + currentImg + '.png');
        images.push(newImage);
      }
      catch (e) { err = e }
    }
    return images;
}

export { getImages };
