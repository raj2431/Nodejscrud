const mongose = require('mongoose');
mongose.connect(process.env.DB_URL).then(() => {
    // console.log('db connected')
}).catch((error) => {
    console.log('DB connection error')
});

module.exports = mongose;