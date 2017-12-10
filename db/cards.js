const uuid = require("uuid/v4");
const collections = require("./mongoSetup.js");

module.exports = {
    updateCard: async () => {
        let cards = await collections.cards();

        // TODO
    },

    addCard: async () => {
        let cards = await collections.cards();

        // TODO
    },

    deleteCard: async () => {
        let cards = await collections.cards();

        // TODO
    },

    getCard: async () => {
        let cards = await collections.cards();

        // TODO
    }
}