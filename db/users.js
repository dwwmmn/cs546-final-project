const uuid = require("uuid/v4");
const collections = require("./mongoSetup.js");

module.exports = {
    updateUser: async () => {
        let users = await collections.users();

        // TODO
    },

    addUser: async () => {
        let users = await collections.users();

        // TODO
    },

    deleteUser: async () => {
        let users = await collections.users();

        // TODO
    },

    getUser: async () => {
        let users = await collections.users();

        // TODO
    }
}