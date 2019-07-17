module.exports = {
    PORT: 5000,
    mongoURI: process.env.MONGODB_URI || "mongodb://localhost:27017/retro-api",
    bodyLimit: "100kb",
    SECRET: process.env.SECRET || "super-secret-passphrase"
};