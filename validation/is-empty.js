const isEmpty = value => {
        value === undefined ||
        value === null ||
        // Validator just only check string data so we need implement to more below
        (typeof value ==='object' && Object.keys(value).length === 0) ||
        (typeof value ==='string' && value.trim().length === 0);
}
module.exports = isEmpty;