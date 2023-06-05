import comprimirNome from "../helpers/comprimirNome";
import validHeroIMG from "../helpers/validHeroIMG";

export default async function gerarHeroisUC
(nomesRegistrados : Array<string>, quantidadeHerois : number) {
    let erroAPI : number = -1;
    const heroisGerados : Array<any> = [];


    while(heroisGerados.length !== quantidadeHerois && erroAPI < 18) {
        const idAleatorio : number = Math.trunc(Math.random() * 732);
        const infosHeroi : any = await fetch(`https://superheroapi.com/api/2613840595440470/${idAleatorio}`, {
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
        .then((data : any) => data)
        .then((data : any) => {
            if(data && data.name) {
                data.name = data.name.length > 18 ? comprimirNome(data.name) : data.name;
            }
            return data;
            })
        .catch((error : any) => console.log(error));
            
        if(infosHeroi && infosHeroi.image && infosHeroi.image.url) {
            const validationIMG = await validHeroIMG(infosHeroi.image.url);
            if(!nomesRegistrados.some((nome : string) => nome === infosHeroi.name) && validationIMG) {
                heroisGerados.push(infosHeroi);
                nomesRegistrados.push(infosHeroi.name);
            }
        } else {
            erroAPI += 1;
        };
    };
    return heroisGerados;
};