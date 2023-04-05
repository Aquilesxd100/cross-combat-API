const express = require('express');

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.listen(
    PORT, () => console.log(`ouvindo porta ${PORT}.`)
);

app.use((req, res, next) => {
    res.header(`Acess-Control-Allow-Origin`, `*`);
    next();
});

app.get('/gerarHerois/:quantidade', (req, res) => {
    const quantidadeHerois : number = Number(req.params.quantidade);
    const heroisGerados : Array<any> = [];
    if(typeof quantidadeHerois !== `number`) {
        res.status(400).send({ message: "Parametro Informado Incorreto!" })
    };
    while(heroisGerados.length !== quantidadeHerois) {
        const idAleatorio : number = Math.trunc(Math.random() * 732);
        fetch(`https://superheroapi.com/api/2613840595440470/${idAleatorio}`)
        .then((res) => res.json())
        .then((data) => {
            if(data.image.url !== undefined && data.image.url !== null) {
                heroisGerados.push(data);
            }
        })
        .catch(error => console.log(error));
    };
    res.status(200).send(heroisGerados);
});
