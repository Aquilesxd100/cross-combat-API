import { Response, Request } from "express";
import gerarDisneyUC from "../useCases/gerarDisneyUC";
import gerarHeroisUC from "../useCases/gerarHeroisUC";
import gerarAnimesUC from "../useCases/gerarAnimesUC";

export default async function testarConexaoController
(req: Request, res: Response) {
    try {
    
        let cardDisney : any = [];
        let cardHeroi : any = [];
        let cardAnimes : any = [];   


        const promiseDisney = new Promise(async (resolve, reject) => {
            cardDisney = await gerarDisneyUC([], 1)
            resolve(true)
        });

        const promiseHerois = new Promise(async (resolve, reject) => {
            cardHeroi = await gerarHeroisUC([], 1)
            resolve(true)
        });

        const promiseAnimes = new Promise(async (resolve, reject) => {
            cardAnimes = await gerarAnimesUC([], 1)
            resolve(true)
        });


        await Promise.all([
            promiseDisney,
            promiseHerois,
            promiseAnimes
        ]);
        
        if (cardDisney.length && cardHeroi.length && cardAnimes.length) {
            return res.status(200).send({
                message: "Conectado!"
            });   
        } else {
            throw new Error("Falhou!");
        };

    } catch(error) {
        console.log(error);
        return res.status(400).send({
            message: "ERRO"
        })
    };
};