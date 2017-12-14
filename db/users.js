const uuid = require("uuid/v4");
const collections = require("./mongoSetup.js");
const users = collections.users;

let clearAll = async () => {
    let usersC = await users();
    await usersC.remove({});
}

let updateUser = async (id, info) => {
    let usersC = await users();

    let result = await usersC.findOneAndUpdate({ _id: id}, { $set: info }, { returnOriginal: false });

    if (!result) throw "User with id " + id + " was not updated";
    
    let ret = await getUser(id);
    
    return ret;
}

let addUser = async (userinfo) => {
    let usersC = await users();
    

    if (!userinfo.username) {
        throw "Username cannot be blank";
    }

    if (!userinfo.fullname) {
        throw "Full name cannot be blank";
    }

    if (!userinfo.about) {
        throw "About cannot be blank";
    }

    if (!userinfo.email) {
        throw "Email cannot be blank";
    }
    userinfo._id = uuid();



    let result1 = await getUserByEmail(userinfo.email);
    let result2 = await getUserByUsername(userinfo.username); 

    if (result1) {
        console.log(result1);
        throw "Email address in use";
    }
    
    if (result2) {
        throw "Username in use";
    }

    const insertedUser = await usersC.insertOne(userinfo);
    if(insertedUser.insertedCount === 0) throw "Could not add user";

    const result = await getUser(insertedUser.insertedId);

    return result;

}

let deleteUser = async (id) => {
    let usersC = await users();

    // TODO
}

let getUser = async (id) => {
    let usersC = await users();

    let result = await usersC.findOne({_id: id});

    return result;
}

let getUserByUsername = async (username) => {
    let usersC = await users();

    let result = await usersC.findOne({username: username});

    return result;
}

let getUserByEmail = async (email) => {
    let usersC = await users();

    let result = await usersC.findOne({email: email});

    return result;
}

module.exports = {
    updateUser: updateUser,
    addUser: addUser,
    deleteUser: deleteUser,
    getUser: getUser,
    getUserByUsername: getUserByUsername,
    clearAll: clearAll
}
