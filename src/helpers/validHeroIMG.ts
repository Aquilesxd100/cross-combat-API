export default async function validHeroIMG(url : string) {
    return new Promise(resolve => {
        const img : any = new Image();
        if(!url) {
            resolve(false);
        };
        img.src = url;
        img.onload = function() {
            if(!this.naturalWidth) {
                resolve(false);
            }
            resolve(true);
          }
    })
};