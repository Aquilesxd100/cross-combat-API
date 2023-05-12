export default async function validHeroIMG(url : string) {
    return await fetch(url)
    .then((res) => res.json())
    .then((data) => {
        if(data.status < 300) {
            return true;
        }
        return false;
    })
    .catch((err) => {
        console.log(err)
        return false
    })
};