import { Request, Response, NextFunction } from "express";
import testarConexaoController from "./controllers/testarConexaoController";
import gerarHeroisController from "./controllers/gerarHeroisController";
import gerarDisneyController from "./controllers/gerarDisneyController";
import gerarAnimesController from "./controllers/gerarAnimesController";

const express = require('express');
const cors = require("cors");

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

app.post('/gerarPersonagensAnimes/:quantidade', validInfosMiddleware, gerarAnimesController);

app.post('/testarconexao', testarConexaoController);