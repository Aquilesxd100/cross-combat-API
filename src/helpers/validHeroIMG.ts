const fetch = require("node-fetch");
export default async function validHeroIMG(url : string) {
    return await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((res : any) => res.json())
    .then((data : any) => {
        if(data.status < 300) {
            return true;
        }
        return false;
    })
    .catch((err : any) => {
        console.log(err)
        return false
    })
};