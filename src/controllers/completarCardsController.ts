import { Request, Response } from "express";
import gerarHeroisUC from "../useCases/gerarHeroisUC";
import gerarDisneyUC from "../useCases/gerarDisneyUC";
import gerarAnimesUC from "../useCases/gerarAnimesUC";

export default async function completarCardsController
(req: Request, res: Response) {
    try {
        let { cardsHeroi, cardsDisney, cardsAnime, nomesAtuais } = req.body;
        const resposta : any = {
            cardsAnime: [],
            cardsDisney: [],
            cardsHeroi: []
        };

        while (cardsHeroi) {
            const cardHeroi : any = (await gerarHeroisUC(nomesAtuais, 1))[0];
            resposta.cardsHeroi.push(cardHeroi);
            cardsHeroi -= 1;
            if(!cardHeroi) throw new Error;
            nomesAtuais.push(cardHeroi.name);
        };

        while (cardsDisney) {
            const cardDisney : any = (await gerarDisneyUC(nomesAtuais, 1))[0];
            resposta.cardsDisney.push(cardDisney);
            cardsDisney -= 1;
            if(!cardDisney) throw new Error;
            nomesAtuais.push(cardDisney.name);
        };

        while (cardsAnime) {
            const cardAnime : any = (await gerarAnimesUC(nomesAtuais, 1))[0];
            resposta.cardsAnime.push(cardAnime);
            cardsAnime -= 1;
            if(!cardAnime) throw new Error;
            nomesAtuais.push(cardAnime.canonicalName);
        };

        return res.status(200).send(resposta);

    } catch (error) {
        console.log(error)
        return res.status(400).send({
            message: "ERRO!"
        });
    };
};
