module.exports = async function (req, res) {
    if(req.method === "GET") {
        try {
            const idAleatorio = Math.trunc(Math.random() * 732);
            const resposta = await fetch(`https://superheroapi.com/api/2613840595440470/${idAleatorio}`)
            .then((res) => res.json())
            .then(data => data);
            res.setHeader("Access-Control-Allow-Origin", "*").json(resposta);
        }
        catch(error) {
            res.setHeader("Access-Control-Allow-Origin", "*").json(error)
        }
    }
}