const mongoose = require('mongoose');
const { mongoURI } = require('./constants');

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useCreateIndex: true
        });
        console.log('MongoDB connected...');
    } catch (err) {
        console.log(err.message);
        // exit process with failure
        process.exit(1);
    }
}

module.exports = connectDB;