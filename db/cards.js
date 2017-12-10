const uuid = require("uuid/v4");
const collections = require("./mongoSetup.js");

/* Implemented as an extra feature */
let updateCard = async () => {
    let cards = await collections.cards();
    throw "Not implemented";
}

/* Implemented as an extra feature */
let addCard = async () => {
    let cards = await collections.cards();
    throw "Not implemented";
}

/* Implemented as an extra feature */
let deleteCard = async () => {
    let cards = await collections.cards();
    throw "Not implemented";
}

let getCard = async () => {
    let cards = await collections.cards();

    // TODO
}

module.exports = {
    updateCard: updateCard,
    addCard: addCard,
    deleteCard: deleteCard,
    getCard: getCard
}