export default async function validHeroIMG(url : string) {
    const checkIMG = await fetch(url)
    .then((res) => true)
    .catch((err) => false);
    console.log(checkIMG)
    return checkIMG;
};