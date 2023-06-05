import { Response, Request } from "express";
import gerarAnimesUC from "../useCases/gerarAnimesUC";

export default async function gerarAnimesController
(req: Request, res: Response) {
    try {
        const quantidadeCardsAnimes : number = Number(req.params.quantidade);
        const nomesRegistrados : Array<string> = req.body.nomesAtuais;

        const cardsGerados : Array<any> = await gerarAnimesUC(nomesRegistrados, quantidadeCardsAnimes);
        
        if (!cardsGerados.length || cardsGerados.length !== quantidadeCardsAnimes) {
            return res.status(500).send(false);
        };

        return res.status(200).send(cardsGerados);
    }
    catch(error) {
        console.log(error)
        return res.status(400).send({ message: "ERRO"}); 
    }
};