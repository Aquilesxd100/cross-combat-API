import { Request, Response, NextFunction } from "express";
import comprimirNome from "./helpers/comprimirNome";
import validHeroIMG from "./helpers/validHeroIMG";
import checkDisneyIMG from "./helpers/checkDisneyIMG";

const express = require('express');
const cors = require("cors");
const fetch = require("node-fetch");

const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors({
    origin: "*",
    methods: []
}));
app.use(express.json());
app.listen(
    PORT, () => console.log(`ouvindo porta ${PORT}.`)
);

app.use((req : Request, res : Response, next : NextFunction) => {
    res.header(`Acess-Control-Allow-Origin`, `*`);
    next();
});

const validInfosMiddleware = ((req : Request, res : Response, next : NextFunction) => {
    const quantidadeHerois : number = Number(req.params.quantidade);
    const nomesRegistrados : Array<string> = req.body.nomesAtuais;
    if(isNaN(quantidadeHerois)) {
        return res.status(400).send({ message: "Parâmetro de quantidade de cards incorreto!" })
    };
    if(quantidadeHerois <= 0 || quantidadeHerois > 3) {
        return res.status(400).send({ message: "Parâmetro de quantidade de cards deve ser de no minimo um e no maximo três!" })
    };
    if(!Array.isArray(nomesRegistrados) || nomesRegistrados.find(nome => typeof nome !== 'string')) {
        return res.status(400).send({ message: "Nomes de cards utilizados invalidos!" });
    };
    next();
});

app.post('/gerarHerois/:quantidade', validInfosMiddleware, async (req : Request, res : Response) => {
    try {
        const quantidadeHerois : number = Number(req.params.quantidade);
        const nomesRegistrados : Array<string> = req.body.nomesAtuais;
        const heroisGerados : Array<any> = [];
        let erroAPI : number = -1;
        const gerarHerois = async function(){
            while(heroisGerados.length !== quantidadeHerois && erroAPI < 18) {
                const idAleatorio : number = Math.trunc(Math.random() * 732);
                const infosHeroi : any = await fetch(`https://superheroapi.com/api/2613840595440470/${idAleatorio}`)
                    .then((res : any) => res.json())
                    .then((data : any) => data)
                    .then((data : any) => {
                        if(data && data.name) {
                            data.name = data.name.length > 18 ? comprimirNome(data.name) : data.name;
                        }
                        return data;
                    })
                    .catch((error : any) => console.log(error));
            
                if(infosHeroi && infosHeroi.image.url) {
                    const validationIMG = await validHeroIMG(infosHeroi.image.url);
                    if(!nomesRegistrados.some((nome : string) => nome === infosHeroi.name) && validationIMG) {
                        heroisGerados.push(infosHeroi);
                        nomesRegistrados.push(infosHeroi.name);
                    }
                } else {
                    erroAPI += 1;
                };
            };
        };
        await gerarHerois();
        if (!heroisGerados.length) {
            return res.status(500).send(false);
        };
        return res.status(200).send(heroisGerados);
    }
    catch(error) {
        console.log(error)
        return res.status(400).send({ message: "ERRO"}); 
    }
});

app.post('/gerarPersonagensDisney/:quantidade', validInfosMiddleware, async (req : Request, res : Response) => {
    try {
        const quantidadeCardsDisney : number = Number(req.params.quantidade);
        const nomesRegistrados : Array<string> = req.body.nomesAtuais;
        const cardsGerados : Array<any> = [];
        let erroAPI : number = -1;
        const gerarPersonagensDisney = async function(){
            while(cardsGerados.length !== quantidadeCardsDisney && erroAPI < 40) {
                const idAleatorio : number = Math.trunc(Math.random() * 7438);
                let checkIMG : any = false;
                const infosPersoDisney : any = await fetch(`https://api.disneyapi.dev/character/${idAleatorio}`)
                    .then((res : any) => res.json())
                    .then((data : any) => data.data)
                    .then(async (data : any) => {
                        if(data && data.imageUrl && data.name) {
                            checkIMG = await checkDisneyIMG(data.imageUrl);
                            data.name = data.name.length > 18 ? comprimirNome(data.name) : data.name;
                        };
                        return data;
                    })
                    .catch((error : any) => console.log(error));
                if(checkIMG && !nomesRegistrados.some(nome => nome === infosPersoDisney.name)) {
                    cardsGerados.push(infosPersoDisney);
                    nomesRegistrados.push(infosPersoDisney.name);
                } else {
                    erroAPI += 1;
                };
            };
        };
        await gerarPersonagensDisney();
        if (!cardsGerados.length) {
            return res.status(500).send(false);
        };
        return res.status(200).send(cardsGerados);
    }
    catch(error) {
        console.log(error)
        return res.status(400).send({ message: "ERRO"}); 
    }
});

app.post('/gerarPersonagensAnimes/:quantidade', validInfosMiddleware, async (req : Request, res : Response) => {
    try {
        const quantidadeCardsAnimes : number = Number(req.params.quantidade);
        const nomesRegistrados : Array<string> = req.body.nomesAtuais;
        const cardsGerados : Array<any> = [];
        let erroAPI : number = -1;
        const gerarPersonagensAnimes = async function(){
            while(cardsGerados.length !== quantidadeCardsAnimes && erroAPI < 20) {
                const idAleatorio : number = Math.trunc(Math.random() * 99153);
                const infosPersoAnime : any = await fetch(`https://kitsu.io/api/edge/characters/${idAleatorio}`)
                    .then((res : any) => res.json())
                    .then((data : any) => {
                        if(data.data) {
                            return data.data;
                        };
                        return data;
                    })
                    .then(async (data : any) => {
                        if(data && data.canonicalName) {
                            data.canonicalName = data.canonicalName.length > 18 ? comprimirNome(data.canonicalName) : data.canonicalName;
                        };
                        return data;
                    })
                    .catch((error : any) => console.log(error));

                if (infosPersoAnime.image.original && !nomesRegistrados.some(nome => nome === infosPersoAnime.canonicalName)) {
                    cardsGerados.push(infosPersoAnime);
                    nomesRegistrados.push(infosPersoAnime.canonicalName);
                } else {
                    erroAPI += 1;
                };
            };
        };
        await gerarPersonagensAnimes();
        if (!cardsGerados.length) {
            return res.status(500).send(false);
        };
        return res.status(200).send(cardsGerados);
    }
    catch(error) {
        console.log(error)
        return res.status(400).send({ message: "ERRO"}); 
    }
});
