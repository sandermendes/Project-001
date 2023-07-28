export const isObjEmpty = (obj: Object) => {
    for (const [ , value] of Object.entries(obj)) {
        if (!!value) {
            return false;
        }
    }
    return true;
}