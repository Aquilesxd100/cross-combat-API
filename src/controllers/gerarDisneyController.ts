import { Response, Request } from "express";
import gerarDisneyUC from "../useCases/gerarDisneyUC";

export default async function gerarDisneyController
(req: Request, res: Response) {
    try {
        const quantidadeCardsDisney : number = Number(req.params.quantidade);
        const nomesRegistrados : Array<string> = req.body.nomesAtuais;

        const cardsGerados : Array<any> = await gerarDisneyUC(nomesRegistrados, quantidadeCardsDisney);

        if (!cardsGerados.length || cardsGerados.length !== quantidadeCardsDisney) {
            return res.status(500).send(false);
        };
        
        return res.status(200).send(cardsGerados);

    }
    catch(error) {
        console.log(error)
        return res.status(400).send({ message: "ERRO"}); 
    }
};