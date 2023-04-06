function comprimirNome(nome : string) : string {
    const nomeSeparado : Array<string> = nome.split(" ");
    let nomeProcessado = "";
    for(let c = 0; c <= nomeSeparado.length - 1; c++) {
        if(nomeProcessado.length + nomeSeparado[c].length + 1 <= 18) {
            nomeProcessado = nomeProcessado + " " + nomeSeparado[c];
        }
        else {
            c = nomeSeparado.length;
        }
    }
    if(nomeProcessado === "")nomeProcessado = nome.substring(0, 18);
    if(nomeProcessado.indexOf(" and") === nomeProcessado.length - 4)nomeProcessado = nomeProcessado.substring(0, nomeProcessado.length - 4);
    if(nomeProcessado.indexOf(" the") === nomeProcessado.length - 4)nomeProcessado = nomeProcessado.substring(0, nomeProcessado.length - 4);
    if(nomeProcessado.indexOf(" of") === nomeProcessado.length - 3)nomeProcessado = nomeProcessado.substring(0, nomeProcessado.length - 3);
    return nomeProcessado;
}
export default comprimirNome;
// Ana and
// 3
//