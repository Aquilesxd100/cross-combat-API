const express = require('express');
import fetch from "node-fetch";
import { Request, Response, NextFunction } from "express";

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
        const heroisGerados : Array<any> = [];
        if(typeof quantidadeHerois !== `number`) {
            res.status(400).send({ message: "Parametro Informado Incorreto!" })
        };
        const gerarHerois = async function(){
            while(heroisGerados.length !== quantidadeHerois) {
                const idAleatorio : number = Math.trunc(Math.random() * 732);
                const infosHeroi : any = await fetch(`https://superheroapi.com/api/2613840595440470/${idAleatorio}`)
                .then((res) => res.json())
                .then((data) => data)
                .catch(error => console.log(error));
                if(infosHeroi && infosHeroi.image.url !== undefined && infosHeroi.image.url !== null) {
                    heroisGerados.push(infosHeroi);
                }
            };
        };
        await gerarHerois();
        res.status(200).send(heroisGerados);
        console.log(heroisGerados)
        }
    catch(error) {
       res.status(400).send({ message: "ERRO"}); 
    }
});
