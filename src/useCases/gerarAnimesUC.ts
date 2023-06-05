const fetch = require("node-fetch");
import comprimirNome from "../helpers/comprimirNome";

export default async function gerarAnimesUC
(nomesRegistrados : Array<string>, quantidadeCardsAnimes : number) {
    const cardsGerados : Array<any> = [];
    let erroAPI : number = -1;

    while(cardsGerados.length !== quantidadeCardsAnimes && erroAPI < 20) {
        const idAleatorio : number = Math.trunc(Math.random() * 99153);
        const infosPersoAnime : any = await fetch(`https://kitsu.io/api/edge/characters/${idAleatorio}`, {
            method: 'GET',
            headers: {
                "Content-Type" : "application/json"
            }
        })
            .then((res : any) => res.text())
            .then((res : any) => {
                if (res.startsWith('<')) {
                    return res;
                };
                return JSON.parse(res);
            })
            .then((data : any) => {
                if(data.data) {
                    return data.data;
                };
                return data;
            })
            .then(async (data : any) => {
                if(data && data.attributes && data.attributes.canonicalName) {
                    data.attributes.canonicalName = data.attributes.canonicalName.length > 18 ? comprimirNome(data.attributes.canonicalName) : data.attributes.canonicalName;
                };
                return data;
            })
            .catch((error : any) => console.log(error));


        if (infosPersoAnime && infosPersoAnime.attributes && infosPersoAnime.attributes.image && infosPersoAnime.attributes.image.original && infosPersoAnime.attributes.canonicalName && !nomesRegistrados.some(nome => nome === infosPersoAnime.attributes.canonicalName)) {
            cardsGerados.push(infosPersoAnime);
            nomesRegistrados.push(infosPersoAnime.attributes.canonicalName);
        } else {
            erroAPI += 1;
        };
    };

    return cardsGerados;
};