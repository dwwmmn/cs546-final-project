const uuid = require("uuid/v4");
const collections = require("./mongoSetup.js");

let updateDeck = async (id, info) => {
    let decks = await collections.decks();

    // TODO
}

let addDeck = async (deckInfo) => {
    let decks = await collections.decks();

    // TODO
}

let deleteDeck = async (deckId) => {
    let decks = await collections.decks();

    // TODO
}

let getDeck = async (deckId) => {
    let decks = await collections.decks();

    // TODO
}

let getDecksByOwner = async (userId) => {
    let decks = await collections.decks();

    // TODO
}

let upvote = async (deckId, userId) => {
    let decks = await collections.decks();
    
    // TODO
}

let removeUpvote = async (deckId, userId) => {
    let decks = await collections.decks();
    
    // TODO
}

let downvoteDeck = async (deckId, userId) => {
    let decks = await collections.decks();
    
    // TODO
}

let removeDownvote = async (deckId, userId) => {
    let decks = await collections.decks();
    
    // TODO
}

let getUpvoteCount = async (deckId) => {
    let decks = await collections.decks();
    
    // TODO
}

let getDownvoteCout = async (deckId) => {
    let decks = await collections.decks();
    
    // TODO
}

let insertCard = async (deckId, cardId) => {
    let decks = await collections.decks();
    
    // TODO
}

let removeCard = async (deckId, cardId) => {
    let decks = await collections.decks();

    // TODO
}

module.exports = {
    updateDeck: updateDeck,
    addDeck: addDeck,
    deleteDeck: deleteDeck,
    getDeck: getDeck,
    getDecksByOwner: getDecksByOwner,
    upvote: upvote,
    removeUpvote: removeUpvote,
    downvoteDeck: downvoteDeck,
    removeDownvote: removeDownvote,
    getUpvoteCount: getUpvoteCount,
    getDownvoteCout: getDownvoteCout,
    insertCard: insertCard,
    removeCard: removeCard
}