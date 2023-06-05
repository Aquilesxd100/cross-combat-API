import { Response, Request } from "express";

export default async function gerarAnimesController
(req: Request, res: Response) {
    try {
        

        return res.status(200).send({
            message: "Conectado!"
        });                    
    } catch(error) {
        console.log(error);
        return res.status(400).send({
            message: "ERRO"
        })
    };
};