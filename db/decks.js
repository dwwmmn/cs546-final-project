const uuid = require("uuid/v4");
const collections = require("./mongoSetup.js");
const deckCollection = collections.decks;


let getDecks = async () => {
    let deckC = await deckCollection();

    let decks = await deckC.find({}).toArray();

    return decks;
}

let getTopDecks = async (id, info) => {
    let deckC = await deckCollection();
    const decks = await deckC.find({}).toArray();
    decks.sort((a, b) => { a.upvotes.length - b.upvotes.length });
    return decks.slice(0, 9);
}

let clearAll = async () => {
    let decks = await collections.decks();
    try { await decks.remove({}); }
    catch (err) { }
};

let updateDeck = async (id, info) => {
    let deckC = await deckCollection();

    let result = await deckC.findOneAndUpdate({ _id: id}, { $set: info }, { returnOriginal: false });

    if (!result) throw "Deck with id " + id + " was not updated";
    
    let ret = await getDeck(id);
    
    return ret;

}

let addDeck = async (deckInfo) => {
    let decks = await deckCollection();
    if(!deckInfo._id){
        throw "No ID provided";
    }
    if(!deckInfo.owner){
        throw "No owner provided";
    }
    if(deckInfo.isPublic === null){
        throw "Public status not defined";
    }
    if(!deckInfo.name){
        throw "No name provided";
    }
    if(!deckInfo.description){
        throw "No description provided";
    }
    if(!deckInfo.cards){
        throw "No cards provided";
    }
    if(!deckInfo.upvotes){
        throw "No upVote information provided";
    }
    if(!deckInfo.downvotes){
        throw "No downVote information provided";
    }
    
    const insertedDeck = await decks.insertOne(deckInfo);
    if(insertedDeck.insertedCount === 0) throw "Could not add deck";
    
    const deck = await getDeck(deckInfo._id);
    return deck;
}

let deleteDeck = async (deckId) => {
    if(!deckId) throw "No deck ID specified";
    let decks = await deckCollection();
    const deletedInfo = await decks.removeOne({ _id: deckId });
    if(deletedInfo.deletedCount === 0) {
        throw "Could not delete specified deck";
    }
}

let getDeck = async (deckId) => {
    if(!deckId) throw "No deck ID specified";
    let decks = await deckCollection();
    let deck = await decks.findOne({_id: deckId });
    if(deck === null) throw "No deck with that ID";
    return deck;
}

let getDecksByOwner = async (userId) => {
    if(!userId) throw "No user specified";
    let decks = await deckCollection();
    const ownedDecks = decks.find({ owner: userId }).toArray();
    if(ownedDecks === null) throw "This user does not own any decks";
    return ownedDecks;
    
}

let upvote = async (deckId, userId) => {
    if(!deckId) throw "No deck ID provided";
    if(!userId) throw "No user ID provided";
    let decks = await deckCollection();
    const updatedDeck = await decks.updateOne({ _id: deckId }, { $addToSet: { upvotes: userId }});
    if(updatedDeck.modifiedCount === 0) throw "Could not upVote deck";
    return await getDeck(deckId);
}

let removeUpvote = async (deckId, userId) => {
    if(!deckId) throw "No deck ID provided";
    if(!userId) throw "No user ID provided";
    let decks = await deckCollection();
    const updatedDeck = await decks.updateOne({ _id: deckId }, { $pull: { upvotes: userId }});
    if(updatedDeck.modifiedCount === 0) throw "Could not remove upVote from deck";
    return await getDeck(deckId);
}

let downvoteDeck = async (deckId, userId) => {
    if(!deckId) throw "No deck ID provided";
    if(!userId) throw "No user ID provided";
    let decks = await deckCollection();
    const updatedDeck = await decks.updateOne({ _id: deckId }, { $addToSet: { downvotes: userId }});
    if(updatedDeck.modifiedCount === 0) throw "Could not downVote deck";
    return await getDeck(deckId);
}

let removeDownvote = async (deckId, userId) => {
    if(!deckId) throw "No deck ID provided";
    if(!userId) throw "No user ID provided";
    let decks = await deckCollection();
    const updatedDeck = await decks.updateOne({ _id: deckId }, { $pull: { downvotes: userId }});
    if(updatedDeck.modifiedCount === 0) throw "Could not remove downVote from deck";
    return await getDeck(deckId);
}

let getUpvoteCount = async (deckId) => {
    if(!deckId) throw "No deck ID specified";
    let decks = await deckCollection();
    let deck = await decks.findOne({_id: deckId });
    if(deck === null) throw "No deck with that ID";
    return deck.upvotes.length;
}

let getDownvoteCout = async (deckId) => {
    if(!deckId) throw "No deck ID specified";
    let decks = await deckCollection();
    let deck = await decks.findOne({_id: deckId });
    if(deck === null) throw "No deck with that ID";
    return deck.downvotes.length;
}

let insertCard = async (deckId, cardId) => {
    if(!deckId) throw "No deck ID provided";
    if(!cardId) throw "No card ID provided";
    let decks = await deckCollection();
    const updatedDeck = await decks.updateOne({ _id: deckId }, { $push: { cards: cardId }});
    if(updatedDeck.modifiedCount === 0) throw "Could not add card to deck";
    return await getDeck(deckId);
}

let removeCard = async (deckId, cardId) => {
    if(!deckId) throw "No deck ID provided";
    if(!cardId) throw "No card ID provided";
    let decks = await deckCollection();
    const updatedDeck = await decks.updateOne({ _id: deckId }, { $pull: { cards: cardId }});
    if(updatedDeck.modifiedCount === 0) throw "Could not remove card from deck";
    return await getDeck(deckId);
}

module.exports = {
    getDecks: getDecks,
    getTopDecks: getTopDecks,
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
    removeCard: removeCard,
    clearAll: clearAll,
    getTopDecks: getTopDecks
}
