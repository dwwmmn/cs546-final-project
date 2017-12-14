const uuid = require("uuid/v4");
const collections = require("./mongoSetup.js");

let clearAll = async () => {
    let users = await collections.users();
    try { await users.remove({}); }
    catch(err) { }
};

let updateUser = async (id, info) => {
    let users = await collections.users();

    // TODO
}

let addUser = async (userinfo) => {
    let users = await collections.users();
    userinfo._id = uuid();

    // TODO
}

let deleteUser = async (id) => {
    let users = await collections.users();

    // TODO
}

let getUser = async (id) => {
    let users = await collections.users();

    // TODO
}

let getUserByUsername = async (userName) => {
    let users = await collections.users();

    // TODO
}

module.exports = {
    updateUser: updateUser,
    addUser: addUser,
    deleteUser: deleteUser,
    getUser: getUser,
    getUserByUsername: getUserByUsername,
    clearAll: clearAll
}