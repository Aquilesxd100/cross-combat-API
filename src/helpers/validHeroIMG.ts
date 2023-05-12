export default async function validHeroIMG(url : string) {
    return await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
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