import { Request, Response, NextFunction } from "express";
import testarConexaoController from "./controllers/testarConexaoController";
import gerarHeroisController from "./controllers/gerarHeroisController";
import gerarDisneyController from "./controllers/gerarDisneyController";
import gerarAnimesController from "./controllers/gerarAnimesController";
import validInfosMiddleware from "./middlewares/validInfosMiddleware";

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

app.post('/gerarHerois/:quantidade', validInfosMiddleware, gerarHeroisController);

app.post('/gerarPersonagensDisney/:quantidade', validInfosMiddleware, gerarDisneyController);

app.post('/gerarPersonagensAnimes/:quantidade', validInfosMiddleware, gerarAnimesController);

app.post('/testarconexao', testarConexaoController);