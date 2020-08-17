const time = require('moment');

const formatMessage = (user, text) => {
    return {
        user,
        text,
        time: time().format('h:mm a')
    }
}

module.exports = formatMessage;