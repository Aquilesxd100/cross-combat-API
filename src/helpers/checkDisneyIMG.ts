const axios = require('axios');
const sizeOf = require('image-size');

async function checkDisneyIMG(url : string) {
    if (!url) {
        return false;
    }
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        const buffer = Buffer.from(response.data, 'binary');
        const dimensions = sizeOf(buffer);
        const width = dimensions.width;
        const height = dimensions.height;
        if ((width === 200 && height === 114) || (width === 200 && height === 200)) {
          return false;
        }
        return true;
      } catch (error) {
        console.error('Erro ao carregar a imagem:', error);
        return false;
      }
};
export default checkDisneyIMG;