"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const fetch = require("node-fetch");
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.listen(PORT, () => console.log(`ouvindo porta ${PORT}.`));
app.use((req, res, next) => {
    res.header(`Acess-Control-Allow-Origin`, `*`);
    next();
});
app.get('/gerarHerois/:quantidade', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("inicio try");
        const quantidadeHerois = Number(req.params.quantidade);
        const heroisGerados = [];
        if (typeof quantidadeHerois !== `number`) {
            res.status(400).send({ message: "Parametro Informado Incorreto!" });
        }
        ;
        const gerarHerois = function () {
            return __awaiter(this, void 0, void 0, function* () {
                console.log("funcao async");
                while (heroisGerados.length !== quantidadeHerois) {
                    const idAleatorio = Math.trunc(Math.random() * 732);
                    const infosHeroi = yield fetch(`https://superheroapi.com/api/2613840595440470/${idAleatorio}`)
                        .then((res) => res.json())
                        .then((data) => data)
                        .catch((error) => console.log(error));
                    console.log("teste");
                    if (infosHeroi && infosHeroi.image.url !== undefined && infosHeroi.image.url !== null) {
                        heroisGerados.push(infosHeroi);
                    }
                }
                ;
            });
        };
        yield gerarHerois();
        console.log("pos funcao");
        res.status(200).send(heroisGerados);
    }
    catch (error) {
        res.status(400).send({ message: "ERRO" });
    }
}));
