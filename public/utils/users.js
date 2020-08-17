let users = {}

const userJoin = (id, username, room) => {
    users[id] = {id, username, room}
    return users[id];
}

const userLeave = (id, room) => {
    const user = users[id];
    delete users[id];
    if (user){
        return user;
    }
    return;
}

const getCurrentUser = (userId) => {
    const {id, username, room} = users[userId];
    return {id, username, room}
}

const getRoomUsers = (room) => {
    const roomUsers = []
    for (let key in users){
        if (users[key].room === room){
            roomUsers.push(users[key].username);
        }
    }
    return roomUsers;
}

module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
}