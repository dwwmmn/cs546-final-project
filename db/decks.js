const uuid = require("uuid/v4");
const collections = require("./mongoSetup.js");
const deckCollection = collections.decks;
const cardC = require("./cards.js");
const userC = require("./users.js");



let sortFn = (a, b) => {
    if (a.rating < b.rating) {
        return 1;
    }

    if (a.rating > b.rating) {
        return -1;
    }

    if (a.rating === b.rating) {
        return a.name.localeCompare(b.name);
    }
}

let getDeck = async (deckId) => {
    if(!deckId) throw "No deck ID specified";
    let deckC = await deckCollection();

    let deck = await deckC.findOne({_id: deckId });
    if(deck === null) throw "No deck with that ID";

    let cardsInDeck = [];

    for (let i = 0; i < deck.cards.length; ++i) {
        let newCard = await cardC.getCard(deck.cards[i]);
        cardsInDeck.push(newCard);
    }

    let user = await userC.getUser(deck.owner);
    deck.ownerName = user.username;

    deck.cards = cardsInDeck;

    return deck;
}

let getDecks = async (publicOnly) => {
    let deckC = await deckCollection();
    let decks = [];

    if (publicOnly) {
        decks = await deckC.find({ isPublic: true}).toArray();
    } else {
        decks = await deckC.find({}).toArray();
    }
    decks.sort(sortFn);

    for (let i = 0; i < decks.length; ++i) {
        let user = await userC.getUser(decks[i].owner);
        decks[i].ownerName = user.username;
    }

    return decks;
}

let getDecksByName = async (queryName, publicOnly) => {
    let deckC = await deckCollection();
    queryName = ".*" + queryName + ".*";

    let decks = [];

    if (publicOnly) {
        decks = await deckC.find( { isPublic: true, name: {$regex: queryName }}).toArray();
    } else {
        decks = await deckC.find( {name: {$regex: queryName }}).toArray();
    }

    decks.sort(sortFn);

    for (let i = 0; i < decks.length; ++i) {
        let user = await userC.getUser(decks[i].owner);
        decks[i].ownerName = user.username;
    }

    return decks;
}

let getTopDecks = async (id, info) => {
    let deckC = await deckCollection();
    const decks = await deckC.find({ isPublic: true }).toArray();

    decks.sort(sortFn);

    for (let i = 0; i < decks.length; ++i) {
        let user = await userC.getUser(decks[i].owner);
        decks[i].ownerName = user.username;
    }

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

let publish = async (id) => {
    let decks = await deckCollection();

    let updatedDeck = await decks.updateOne({ _id: id}, { $set: { isPublic: true} });
    if(updatedDeck.modifiedCount === 0) throw "Could not publish deck";

    return getDeck(id);
}

let unPublish = async (id) => {
    let decks = await deckCollection();

    let updatedDeck = await decks.updateOne({ _id: id}, { $set: { isPublic: false} });
    if(updatedDeck.modifiedCount === 0) throw "Could not unpublish deck";

    return getDeck(id);
}

let addDeck = async (deckInfo) => {
    let decks = await deckCollection();

    if (!deckInfo._id) {
        deckInfo._id = uuid();
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

    const result = await getDecksByName(deckInfo.name);

    if (result.length > 0) throw result;

    deckInfo.rating = deckInfo.upvotes.length - deckInfo.downvotes.length;
    
    const insertedDeck = await decks.insertOne(deckInfo);
    if(insertedDeck.insertedCount === 0) throw "Could not add deck";
    
    const deck = await getDeck(deckInfo._id);
    return deck;
}

let getDecksByOwner = async (userId, publicOnly) => {
    if(!userId) throw "No user specified";
    let decks = await deckCollection();

    let ownedDecks = [];
    if (publicOnly) {
        ownedDecks = decks.find({ owner: userId, isPublic: true }).toArray();
    } else {
        ownedDecks = decks.find({ owner: userId}).toArray();
    }

    if(ownedDecks === null) throw "This user does not own any decks";
    return ownedDecks;
    
}

let deleteDeck = async (deckId) => {
    if(!deckId) throw "No deck ID specified";
    let decks = await deckCollection();
    const deletedInfo = await decks.removeOne({ _id: deckId });
    if(deletedInfo.deletedCount === 0) {
        throw "Could not delete specified deck";
    }
}


let upvote = async (deckId, userId) => {
    if(!deckId) throw "No deck ID provided";
    if(!userId) throw "No user ID provided";
    let decks = await deckCollection();

    let deck = await getDeck(deckId);

    if (!deck.upvotes.includes(userId) && !deck.downvotes.includes(userId)) {

        const updatedDeck = await decks.updateOne({ _id: deckId }, { $addToSet: { upvotes: userId }, $inc: { rating: 1 }});
        if(updatedDeck.modifiedCount === 0) throw "Could not upvote deck";

    } else if (!deck.upvotes.includes(userId) && deck.downvotes.includes(userId)) {

        const updatedDeck = await decks.updateOne({ _id: deckId }, { $addToSet: { upvotes: userId }, $pull: { downvotes: userId}, $inc: { rating: 2 }});
        if(updatedDeck.modifiedCount === 0) throw "Could not upvote deck";
    }


    return deck;
}

let removeUpvote = async (deckId, userId) => {
    if(!deckId) throw "No deck ID provided";
    if(!userId) throw "No user ID provided";
    let decks = await deckCollection();


    let deck = await getDeck(deckId);

    if (deck.upvotes.includes(userId)) {
        const updatedDeck = await decks.updateOne({ _id: deckId }, { $pull: { upvotes: userId }, $inc: { rating: -1}});
        if(updatedDeck.modifiedCount === 0) throw "Could not remove upVote from deck";
    }

    return deck;
}

let downvote = async (deckId, userId) => {
    if(!deckId) throw "No deck ID provided";
    if(!userId) throw "No user ID provided";

    let decks = await deckCollection();
    let deck = await getDeck(deckId);

    if (!deck.downvotes.includes(userId) && !deck.upvotes.includes(userId)) {

        const updatedDeck = await decks.updateOne({ _id: deckId }, { $addToSet: { downvotes: userId }, $inc: {rating: -1}});
        if(updatedDeck.modifiedCount === 0) throw "Could not downvote deck";

    } else if (deck.upvotes.includes(userId)) {
        const updatedDeck = await decks.updateOne({ _id: deckId }, { $addToSet: { downvotes: userId }, $pull: { upvotes: userId }, $inc: {rating: -2}});
        if(updatedDeck.modifiedCount === 0) throw "Could not downvote deck"; 
    }


    return deck;
}

let removeDownvote = async (deckId, userId) => {
    if(!deckId) throw "No deck ID provided";
    if(!userId) throw "No user ID provided";
    let decks = await deckCollection();

    let deck = await getDeck(deckId);

    if (deck.downvotes.includes(userId)) {
        const updatedDeck = await decks.updateOne({ _id: deckId }, { $pull: { downvotes: userId }, $inc: {rating: 1}});
        if(updatedDeck.modifiedCount === 0) throw "Could not remove downVote from deck";
    }

    return deck;
}

let getRating = async (deckId) => {
    if(!deckId) throw "No deck ID specified";
    let decks = await deckCollection();

    let deck = await decks.findOne({_id: deckId });
    if(deck === null) throw "No deck with that ID";

    return deck.rating;
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
    getDecksByName: getDecksByName,
    getTopDecks: getTopDecks,
    updateDeck: updateDeck,
    addDeck: addDeck,
    deleteDeck: deleteDeck,
    getDeck: getDeck,
    getDecksByOwner: getDecksByOwner,
    upvote: upvote,
    removeUpvote: removeUpvote,
    downvote: downvote,
    removeDownvote: removeDownvote,
    getRating: getRating,
    insertCard: insertCard,
    removeCard: removeCard,
    clearAll: clearAll,
    getTopDecks: getTopDecks,
    publish: publish,
    unPublish: unPublish
}
