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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const comprimirNome_1 = __importDefault(require("./helpers/comprimirNome"));
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
        const quantidadeHerois = Number(req.params.quantidade);
        const nomeRegistrados = req.body.nomesAtuais;
        console.log(quantidadeHerois);
        console.log(nomeRegistrados);
        const heroisGerados = [];
        if (typeof quantidadeHerois !== `number`) {
            res.status(400).send({ message: "Parametro Informado Incorreto!" });
        }
        ;
        const gerarHerois = function () {
            return __awaiter(this, void 0, void 0, function* () {
                while (heroisGerados.length !== quantidadeHerois) {
                    const idAleatorio = Math.trunc(Math.random() * 732);
                    const infosHeroi = yield fetch(`https://superheroapi.com/api/2613840595440470/${idAleatorio}`)
                        .then((res) => res.json())
                        .then((data) => data)
                        .then((data) => {
                        data.name = data.name.length > 18 ? (0, comprimirNome_1.default)(data.name) : data.name;
                        return data;
                    })
                        .catch((error) => console.log(error));
                    if (infosHeroi && infosHeroi.image.url !== undefined && infosHeroi.image.url !== null) {
                        if (!nomeRegistrados.some((nome) => nome === infosHeroi.name)) {
                            heroisGerados.push(infosHeroi);
                        }
                    }
                }
                ;
            });
        };
        yield gerarHerois();
        res.status(200).send(heroisGerados);
    }
    catch (error) {
        res.status(400).send({ message: "ERRO" });
    }
}));
