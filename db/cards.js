const uuid = require("uuid/v4");
const collections = require("./mongoSetup.js");
const cardCollection = collections.cards;

let clearAll = async () => {
    let cards = await cardCollection();
    try { await cards.remove({}); }
    catch (err) {

    }
};

/* Implemented as an extra feature */
let updateCard = async () => {
    let cards = await cardCollection();
    throw "Not implemented";
}

let addCard = async (cardInfo) => {
    let cards = await cardCollection();
    if(!cardInfo._id){
        throw "No ID provided";
    }
    if(!cardInfo.name){
        throw "No name provided";
    }
    if(!cardInfo.effect){
        throw "No effect provided";
    }
    if(!cardInfo.cost){
        throw "No cost provided";
    }
    if(!cardInfo.power){
        throw "No power provided";
    }
    if(!cardInfo.rarity){
        throw "No rarity provided";
    }
    const insertedCard = await cards.insertOne(cardInfo);
    if(insertedCard.insertedCount === 0) throw "Could not add card";
    
    const card = await getCard(insertedCard.insertedId);
    return card;
}

let deleteCard = async (id) => {
    if(id === undefined) throw "No card ID specified";
    let cards = await cardCollection();
    const deletedInfo = await cards.removeOne({ _id: id });
    if(deletedInfo.deletedCount === 0) {
        throw "Could not delete specified card";
    }
    
}

let getCard = async (id) => {
    if(id === undefined) throw "No card ID specified";
    let cards = await cardCollection();
    let card = await cards.findOne({_id: id });
    if(card === null) throw "No card with that ID";
    return card.card;
    
}

let getCards = async () => {
    let cardC = await cardCollection();
    
    const cards = await cardC.find({}).toArray();
    
    return cards;
}

module.exports = {
    //updateCard: updateCard,
    addCard: addCard,
    deleteCard: deleteCard,
    getCard: getCard,
    getCards: getCards,
    clearAll: clearAll
}
