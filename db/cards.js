const uuid = require("uuid/v4");
const collections = require("./mongoSetup.js");
const cardCollection = collections.cards;

/* Implemented as an extra feature 
let updateCard = async () => {
    let cards = await cardCollection();
    throw "Not implemented";
}
*/

let addCard = async (id, name, effect, cost, power, rarity) => {
    let cards = await cardCollection();
    if(!id){
        throw "No ID provided";
    }
    if(!name){
        throw "No name provided";
    }
    if(!effect){
        throw "No effect provided";
    }
    if(!cost){
        throw "No cost provided";
    }
    if(!power){
        throw "No power provided";
    }
    if(!rarity){
        throw "No rarity provided";
    }
    let newCard = {
        _id: id,
        name: name,
        effect: effect,
        cost: cost,
        power: power,
        rarity: rarity
    };
    const insertedCard = await cards.insertOne(newCard);
    if(insertedCard.insertedCount === 0) throw "Could not add card";
    
    const card = await this.getCard(insertedCard.insertedId);
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
    return card;
    
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
    getCards: getCards
}