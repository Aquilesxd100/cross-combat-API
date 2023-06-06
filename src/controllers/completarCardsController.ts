import { Request, Response } from "express";
import gerarHeroisUC from "../useCases/gerarHeroisUC";
import gerarDisneyUC from "../useCases/gerarDisneyUC";
import gerarAnimesUC from "../useCases/gerarAnimesUC";

export default async function completarCardsController
(req: Request, res: Response) {
    try {
        let { cardsHeroi, cardsDisney, cardsAnime, arrayNomes } = req.body;
        const resposta : any = {
            cardsAnime: [],
            cardsDisney: [],
            cardsHeroi: []
        };

        while (cardsHeroi) {
            const cardHeroi : any = await gerarHeroisUC(arrayNomes, 1);
            resposta.cardsHeroi.push(cardHeroi);
            cardsHeroi -= 1;
            arrayNomes.push(cardHeroi.name);
        };

        while (cardsDisney) {
            const cardDisney : any = await gerarDisneyUC(arrayNomes, 1);
            resposta.cardsDisney.push(cardDisney);
            cardsDisney -= 1;
            arrayNomes.push(cardDisney.name);
        };

        while (cardsAnime) {
            const cardAnime : any = await gerarAnimesUC(arrayNomes, 1);
            resposta.cardsDisney.push(cardAnime);
            cardsAnime -= 1;
            arrayNomes.push(cardAnime.attributes.canonicalName);
        };

        return res.status(200).send(resposta);

    } catch (error) {
        return res.status(400).send({
            message: "ERRO!"
        });
    };
};
