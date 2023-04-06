import { Request, Response, NextFunction } from "express";
import comprimirNome from "./helpers/comprimirNome";
const express = require('express');
const fetch = require("node-fetch");

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.listen(
    PORT, () => console.log(`ouvindo porta ${PORT}.`)
);

app.use((req : Request, res : Response, next : NextFunction) => {
    res.header(`Acess-Control-Allow-Origin`, `*`);
    next();
});

app.get('/gerarHerois/:quantidade',  async (req : Request, res : Response) => {
    try {
        const quantidadeHerois : number = Number(req.params.quantidade);
        const nomeRegistrados : Array<string> = req.body.nomesAtuais;
        const heroisGerados : Array<any> = [];
        if(typeof quantidadeHerois !== `number`) {
            res.status(400).setHeader("Access-Control-Allow-Origin", "*").send({ message: "Parametro Informado Incorreto!" })
        };
        const gerarHerois = async function(){
            while(heroisGerados.length !== quantidadeHerois) {
                const idAleatorio : number = Math.trunc(Math.random() * 732);
                const infosHeroi : any = await fetch(`https://superheroapi.com/api/2613840595440470/${idAleatorio}`)
                    .then((res : any) => res.json())
                    .then((data : any) => data)
                    .then((data : any) => {
                        data.name = data.name.length > 18 ? comprimirNome(data.name) : data.name;
                        return data;
                    })
                    .catch((error : any) => console.log(error));
                if(infosHeroi && infosHeroi.image.url !== undefined && infosHeroi.image.url !== null) {
                    if(!nomeRegistrados.some((nome : string) => nome === infosHeroi.name)) {
                        heroisGerados.push(infosHeroi);
                    }
                }
            };
        };
        await gerarHerois();
        res.status(200).setHeader("Access-Control-Allow-Origin", "*").send(heroisGerados);
    }
    catch(error) {
       res.status(400).setHeader("Access-Control-Allow-Origin", "*").send({ message: "ERRO"}); 
    }
});
