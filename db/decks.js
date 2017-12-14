const uuid = require("uuid/v4");
const collections = require("./mongoSetup.js");
const deckCollection = collections.decks;



let getTopDecks = async (id, info) => {
    let deckC = await deckCollection();
    const decks = deckC.find({}).toArray();
    decks.sort(function (a,b) {
        return b.upVotes.length - a.upVotes.length;
    });
    return decks.slice(0,9);
}

let updateDeck = async (id, info) => {
    let decks = await deckCollection();

    // TODO
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
    if(!deckInfo.upVotes){
        throw "No upVote information provided";
    }
    if(!deckInfo.downVotes){
        throw "No downVote information provided";
    }
    
    const insertedDeck = await decks.insertOne(deckInfo);
    if(insertedDeck.insertedCount === 0) throw "Could not add deck";
    
    const deck = await this.getDeck(deckInfo._id);
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
    const updatedDeck = await decks.updateOne({ _id: deckId }, { $addToSet: { upVotes: userId }});
    if(updatedDeck.modifiedCount === 0) throw "Could not upVote deck";
    return await this.getDeck(deckId);
}

let removeUpvote = async (deckId, userId) => {
    if(!deckId) throw "No deck ID provided";
    if(!userId) throw "No user ID provided";
    let decks = await deckCollection();
    const updatedDeck = await decks.updateOne({ _id: deckId }, { $pull: { upVotes: userId }});
    if(updatedDeck.modifiedCount === 0) throw "Could not remove upVote from deck";
    return await this.getDeck(deckId);
}

let downvoteDeck = async (deckId, userId) => {
    if(!deckId) throw "No deck ID provided";
    if(!userId) throw "No user ID provided";
    let decks = await deckCollection();
    const updatedDeck = await decks.updateOne({ _id: deckId }, { $addToSet: { downVotes: userId }});
    if(updatedDeck.modifiedCount === 0) throw "Could not downVote deck";
    return await this.getDeck(deckId);
}

let removeDownvote = async (deckId, userId) => {
    if(!deckId) throw "No deck ID provided";
    if(!userId) throw "No user ID provided";
    let decks = await deckCollection();
    const updatedDeck = await decks.updateOne({ _id: deckId }, { $pull: { downVotes: userId }});
    if(updatedDeck.modifiedCount === 0) throw "Could not remove downVote from deck";
    return await this.getDeck(deckId);
}

let getUpvoteCount = async (deckId) => {
    if(!deckId) throw "No deck ID specified";
    let decks = await deckCollection();
    let deck = await decks.findOne({_id: deckId });
    if(deck === null) throw "No deck with that ID";
    return deck.upVotes.length;
}

let getDownvoteCout = async (deckId) => {
    if(!deckId) throw "No deck ID specified";
    let decks = await deckCollection();
    let deck = await decks.findOne({_id: deckId });
    if(deck === null) throw "No deck with that ID";
    return deck.downVotes.length;
}

let insertCard = async (deckId, cardId) => {
    if(!deckId) throw "No deck ID provided";
    if(!cardId) throw "No card ID provided";
    let decks = await deckCollection();
    const updatedDeck = await decks.updateOne({ _id: deckId }, { $push: { cards: cardId }});
    if(updatedDeck.modifiedCount === 0) throw "Could not add card to deck";
    return await this.getDeck(deckId);
}

let removeCard = async (deckId, cardId) => {
    if(!deckId) throw "No deck ID provided";
    if(!cardId) throw "No card ID provided";
    let decks = await deckCollection();
    const updatedDeck = await decks.updateOne({ _id: deckId }, { $pull: { cards: cardId }});
    if(updatedDeck.modifiedCount === 0) throw "Could not remove card from deck";
    return await this.getDeck(deckId);
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
