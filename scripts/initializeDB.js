const collections = require("../db");

const exampleUsers = [
    {
        _id: "e5b01459-2b9b-421d-a69e-58a30ab73043",
        sessionId: null,
        hashedPassword: "$2a$04$I2KEhVRFyOc7.MKSjtRKkenzI5dEcGk4dOOYhRVHQZSl3Yatcribi",
        profile: {
            username: "User1",
            fullname: "John Smith",
            about: "An example user profile.",
            email: "user1@example.com"
        }
    },
    {
        _id: "121a31d0-4212-4fd6-979d-5fe38372e90d",
        sessionId: null,
        hashedPassword: "$2a$04$I2KEhVRFyOc7.MKSjtRKkenzI5dEcGk4dOOYhRVHQZSl3Yatcribi",
        profile: {
            username: "User2",
            fullname: "John Smith",
            about: "An example user profile.",
            email: "user2@example.com"
        }
    },
    {
        _id: "742eff97-9601-43d0-a0cb-348d926ded62",
        sessionId: null,
        hashedPassword: "$2a$04$I2KEhVRFyOc7.MKSjtRKkenzI5dEcGk4dOOYhRVHQZSl3Yatcribi",
        profile: {
            username: "User3",
            fullname: "John Smith",
            about: "An example user profile.",
            email: "user3@example.com"
        }
    },
    {
        _id: "8f9f340c-05f1-4ce8-9239-3dcf7816df79",
        sessionId: null,
        hashedPassword: "$2a$04$I2KEhVRFyOc7.MKSjtRKkenzI5dEcGk4dOOYhRVHQZSl3Yatcribi",
        profile: {
            username: "User4",
            fullname: "John Smith",
            about: "An example user profile.",
            email: "user4@example.com"
        }
    },
    {
        _id: "3fdf870d-19d3-496c-8f9b-3ce3f7f662f6",
        sessionId: null,
        hashedPassword: "$2a$04$I2KEhVRFyOc7.MKSjtRKkenzI5dEcGk4dOOYhRVHQZSl3Yatcribi",
        profile: {
            username: "User5",
            fullname: "John Smith",
            about: "An example user profile.",
            email: "user5@example.com"
        }
    }
]

const exampleCards = [
    {
        _id: "6a30812d-c25b-458c-a3ff-2df67bd35d2d",
        name: "ExampleCard1",
        effect: "This is an example effect.",
        cost: 1,
        power: 4,
        rarity: 0.5
    },
    {
        _id: "c3f3aa1b-555c-4975-8c19-3a8c24b324c0",
        name: "ExampleCard2",
        effect: "This is an example effect.",
        cost: 2,
        power: 4,
        rarity: 0.5
    },
    {
        _id: "0afff847-4ede-454d-ab41-c094d3ca31d4",
        name: "ExampleCard3",
        effect: "This is an example effect.",
        cost: 3,
        power: 3,
        rarity: 0.5
    },
    {
        _id: "18954f72-4a7f-486a-8738-cf957ae2d904",
        name: "ExampleCard4",
        effect: "This is an example effect.",
        cost: 4,
        power: 4,
        rarity: 0.5
    },
    {
        _id: "56131d89-44a8-46d9-914c-af06a5ab4f58",
        name: "ExampleCard5",
        effect: "This is an example effect.",
        cost: 4,
        power: 5,
        rarity: 0.5
    }
];

(async () => {
    let users = await collections.users(),
        cards = await collections.cards(),
        decks = await collections.decks();

    /* Clear collection */
    users.remove( {} );
    cards.remove( {} );
    decks.remove( {} );

    var result = users.insertMany(exampleUsers);
    if (result.insertedIds.length != exampleUsers.length) {
        console.log("DB insertion for users failed");
    }

    result = cards.insertMany(exampleCards);
    if (result.insertedIds.length != exampleCards.length) {
        console.log("DB insertion failed for cards");
    }
    
    result = decks.insertMany(exampleDecks);
    if (result.insertedIds.length != exampleDecks.length) { 
        console.log("DB insertion failed for decks"); 
    } 
})();