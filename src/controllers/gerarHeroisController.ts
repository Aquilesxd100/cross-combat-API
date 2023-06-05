import { Response, Request } from "express";
import gerarHeroisUC from "../useCases/gerarHeroisUC";

export default async function gerarHeroisController
(req: Request, res: Response) {
    try {       
        const quantidadeHerois : number = Number(req.params.quantidade);
        const nomesRegistrados : Array<string> = req.body.nomesAtuais;

        const heroisGerados : Array<any> = await gerarHeroisUC(nomesRegistrados, quantidadeHerois);

        if (!heroisGerados.length || heroisGerados.length !== quantidadeHerois) {
            return res.status(500).send(false);
        };

        return res.status(200).send(heroisGerados);

    } catch(error) {
        console.log(error);
        return res.status(400).send({
            message: "ERRO"
        })
    };
};
