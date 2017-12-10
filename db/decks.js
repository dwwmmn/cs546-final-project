const uuid = require("uuid/v4");
const collections = require("./mongoSetup.js");

module.exports = {
    updateDeck: async () => {
        let decks = await collections.decks();

        // TODO
    },

    addDeck: async () => {
        let decks = await collections.decks();

        // TODO
    },

    deleteDeck: async () => {
        let decks = await collections.decks();

        // TODO
    },

    getDeck: async () => {
        let decks = await collections.decks();

        // TODO
    }
}