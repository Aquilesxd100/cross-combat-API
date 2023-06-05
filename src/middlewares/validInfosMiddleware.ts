import { Request, Response, NextFunction} from "express";

export default function validInfosMiiddleware
(req : Request, res: Response, next : NextFunction) {

    const quantidadeHerois : number = Number(req.params.quantidade);
    const nomesRegistrados : Array<string> = req.body.nomesAtuais;
    
    if(isNaN(quantidadeHerois)) {
        return res.status(400).send({ message: "Parâmetro de quantidade de cards incorreto!" })
    };

    if(quantidadeHerois <= 0 || quantidadeHerois > 3) {
        return res.status(400).send({ message: "Parâmetro de quantidade de cards deve ser de no minimo um e no maximo três!" })
    };

    if(!Array.isArray(nomesRegistrados) || nomesRegistrados.find(nome => typeof nome !== 'string')) {
        return res.status(400).send({ message: "Nomes de cards utilizados invalidos!" });
    };

    next();

};