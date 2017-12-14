/**
 * Test database code and fill db with example values.
 */

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

const exampleDecks = [
    {
        _id: "cb7f421e-b965-47cf-b14b-f6bb76cedd99",
        owner: "e5b01459-2b9b-421d-a69e-58a30ab73043",
        isPublic: true,
        name: "Example Deck 1",
        description: "This is an example deck.",
        upvotes: [],
        downvotes: [],
        cards: [
            "6a30812d-c25b-458c-a3ff-2df67bd35d2d",
            "c3f3aa1b-555c-4975-8c19-3a8c24b324c0",
            "0afff847-4ede-454d-ab41-c094d3ca31d4",
            "18954f72-4a7f-486a-8738-cf957ae2d904",
            "56131d89-44a8-46d9-914c-af06a5ab4f58"
        ],
    },
    {
        _id: "658d7c9a-b293-45ff-82ed-f082ac4ba3ca",
        owner: "121a31d0-4212-4fd6-979d-5fe38372e90d",
        isPublic: true,
        name: "Example Deck 2",
        description: "This is an example deck.",
        upvotes: [],
        downvotes: [],
        cards: [
            "6a30812d-c25b-458c-a3ff-2df67bd35d2d",
            "0afff847-4ede-454d-ab41-c094d3ca31d4",
            "18954f72-4a7f-486a-8738-cf957ae2d904",
        ],
    },
    {
        _id: "1b8a8228-7085-494c-bb8e-6b1aa60c88c6",
        owner: "742eff97-9601-43d0-a0cb-348d926ded62",
        isPublic: true,
        name: "Example Deck 3",
        description: "This is an example deck.",
        upvotes: [],
        downvotes: [],
        cards: [
            "6a30812d-c25b-458c-a3ff-2df67bd35d2d",
            "c3f3aa1b-555c-4975-8c19-3a8c24b324c0",
            "0afff847-4ede-454d-ab41-c094d3ca31d4",
        ],
    },
    {
        _id: "7e2b74f7-858d-4444-9541-eccd05b42608",
        owner: "8f9f340c-05f1-4ce8-9239-3dcf7816df79",
        isPublic: true,
        name: "Example Deck 4",
        description: "This is an example deck.",
        upvotes: [],
        downvotes: [],
        cards: [
            "18954f72-4a7f-486a-8738-cf957ae2d904",
            "56131d89-44a8-46d9-914c-af06a5ab4f58"
        ],
    },
    {
        _id: "469e5d2e-9257-4b33-a4e6-3ad88621d665",
        owner: "3fdf870d-19d3-496c-8f9b-3ce3f7f662f6",
        isPublic: true,
        name: "Example Deck 5",
        description: "This is an example deck.",
        upvotes: [],
        downvotes: [],
        cards: [
            "6a30812d-c25b-458c-a3ff-2df67bd35d2d",
            "c3f3aa1b-555c-4975-8c19-3a8c24b324c0",
            "18954f72-4a7f-486a-8738-cf957ae2d904",
            "56131d89-44a8-46d9-914c-af06a5ab4f58"
        ],
    }
];

(async () => {
    let users = collections.users,
        cards = collections.cards,
        decks = collections.decks;

    /* Clear collection */
    await users.clearAll();
    await cards.clearAll();
    await decks.clearAll();

    /* Fill values */
    for (let i = 0; i < exampleUsers.length; i++) {
        await users.addUser(exampleUsers[i]);
    }

    for (let i = 0; i < exampleDecks.length; i++) {
        await decks.addDeck(exampleDecks[i]);
    }

    for (let i = 0; i < exampleCards.length; i++) {
        await cards.addCard(exampleCards[i]);
    }
    
    /* Dumb test code */
    let result1 = await cards.getCards();
    for (let i = 0; i < result1.length; i++) {
        console.log(result1[i]);
    }

    let result2 = await decks.getTopDecks();
    for (let i = 0; i < result2.length; i++) {
        console.log(result2[i]);
    }

    console.log("We're done!");

    process.exit(0);

})();
