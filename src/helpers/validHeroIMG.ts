export default async function validHeroIMG(url : string) {
    try {
        const checkIMG = await fetch(url)
        const status = checkIMG.status;
        if(status >= 300)return false;
        return true;
      } catch (error) {
        return false;
    }
};