import { NextFunction, Request, Response } from "express";

export default function validFillInfosMiddleware
(req: Request, res: Response, next : NextFunction) {
    const { cardsHeroi, cardsDisney, cardsAnime, nomesAtuais } = req.body;
    const arrayInfos = [cardsHeroi, cardsDisney, cardsAnime];

    if (!Array.isArray(nomesAtuais) || nomesAtuais.length > 5 || nomesAtuais.some((nome) => typeof nome !== "string")) {
        return res.status(400).send({
            message: "Array de nomes invalido."
        })
    };

    if (arrayInfos.some((info) => typeof info !== "number")) {
        return res.status(400).send({
            message: "Tipo de uma ou mais informações invalida."
        });
    };

    if (arrayInfos.some((info) => info < 0 || info > 5)) {
        return res.status(400).send({
            message: "O valor de cada tipo de card a ser gerado não pode ultrapassar 5 ou ser menor que 0."
        });
    };

    next();
};