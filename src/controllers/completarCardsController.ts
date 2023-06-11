import { Request, Response } from "express";
import gerarHeroisUC from "../useCases/gerarHeroisUC";
import gerarDisneyUC from "../useCases/gerarDisneyUC";
import gerarAnimesUC from "../useCases/gerarAnimesUC";
import { APIDefaultError } from "../helpers/errors/APIDefaultError";

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
            if(!cardHeroi) throw new APIDefaultError("API de Heróis com defeito.");
            nomesAtuais.push(cardHeroi.name);
        };

        while (cardsDisney) {
            const cardDisney : any = (await gerarDisneyUC(nomesAtuais, 1))[0];
            resposta.cardsDisney.push(cardDisney);
            cardsDisney -= 1;
            if(!cardDisney) throw new APIDefaultError("API da Disney com defeito.");
            nomesAtuais.push(cardDisney.name);
        };

        while (cardsAnime) {
            const cardAnime : any = (await gerarAnimesUC(nomesAtuais, 1))[0];
            resposta.cardsAnime.push(cardAnime);
            cardsAnime -= 1;
            if(!cardAnime) throw new APIDefaultError("API de Animes com defeito.");
            nomesAtuais.push(cardAnime.canonicalName);
        };

        return res.status(200).send(resposta);

    } catch (error) {
        console.log(error)
        if (error instanceof APIDefaultError) {
            return res.status(500).send({
                message: error.message
            });
        };
        return res.status(400).send({
            message: "ERRO!"
        });
    };
};
