import { Request, Response, NextFunction } from "express";
import comprimirNome from "./helpers/comprimirNome";
import validHeroIMG from "./helpers/validHeroIMG";
import checkDisneyIMG from "./helpers/checkDisneyIMG";
import testarConexaoController from "./controllers/testarConexaoController";
import gerarHeroisController from "./controllers/gerarHeroisController";
import gerarDisneyController from "./controllers/gerarDisneyController";

const express = require('express');
const cors = require("cors");
const fetch = require("node-fetch");

const PORT = process.env.PORT || 4000;
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

app.post('/gerarHerois/:quantidade', validInfosMiddleware, gerarHeroisController);

app.post('/gerarPersonagensDisney/:quantidade', validInfosMiddleware, gerarDisneyController);

app.post('/gerarPersonagensAnimes/:quantidade', validInfosMiddleware, async (req : Request, res : Response) => {
    try {
        const quantidadeCardsAnimes : number = Number(req.params.quantidade);
        const nomesRegistrados : Array<string> = req.body.nomesAtuais;
        const cardsGerados : Array<any> = [];
        let erroAPI : number = -1;
        const gerarPersonagensAnimes = async function(){
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
        };
        await gerarPersonagensAnimes();
        if (!cardsGerados.length || cardsGerados.length !== quantidadeCardsAnimes) {
            return res.status(500).send(false);
        };
        return res.status(200).send(cardsGerados);
    }
    catch(error) {
        console.log(error)
        return res.status(400).send({ message: "ERRO"}); 
    }
});

app.post('/testarconexao', testarConexaoController);