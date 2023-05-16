export default function checkJSON(res : any) {
    try {
        JSON.parse(res);
    } catch (e) {
        return false;
    }
    return true;
};