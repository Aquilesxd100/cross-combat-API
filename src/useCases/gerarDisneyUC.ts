import checkDisneyIMG from "../helpers/checkDisneyIMG";
import comprimirNome from "../helpers/comprimirNome";

export default async function gerarDisneyUC
(nomesRegistrados : Array<string>, quantidadeCardsDisney : number) {
    const cardsGerados : Array<any> = [];
    let erroAPI : number = -1;

    while(cardsGerados.length !== quantidadeCardsDisney && erroAPI < 40) {
        const idAleatorio : number = Math.trunc(Math.random() * 7438);
        let checkIMG : any = false;
        const infosPersoDisney : any = await fetch(`https://api.disneyapi.dev/character/${idAleatorio}`, {
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
            .then((data : any) => data.data)
            .then(async (data : any) => {
                if(data && data.imageUrl && data.name) {
                    checkIMG = await checkDisneyIMG(data.imageUrl);
                    data.name = data.name.length > 18 ? comprimirNome(data.name) : data.name;
                };
                return data;
            })
            .catch((error : any) => console.log(error));
        if(checkIMG && infosPersoDisney.name && !nomesRegistrados.some(nome => nome === infosPersoDisney.name)) {
            cardsGerados.push(infosPersoDisney);
            nomesRegistrados.push(infosPersoDisney.name);
        } else {
            erroAPI += 1;
        };
    };
    
    return cardsGerados;
};