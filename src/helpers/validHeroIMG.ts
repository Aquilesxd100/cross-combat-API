export default async function validHeroIMG(url : string) {
    let validation = false;
    const checkIMG = await fetch(url)
    .then((res) => {validation = true})
    console.log(checkIMG)
    return validation;
};