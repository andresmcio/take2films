module.exports = {
    port: process.env.PORT || 2024,
    callback: (port) => console.log(`Server running on port ${port}`)
};