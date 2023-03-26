const moment = require('moment');

// format the date using moment.js
const dateFormat = date => {
    return moment(date).format('MMMM Do YYYY, h:mm a')
}

module.exports = dateFormat;