module.exports = {
    port: process.env.PORT || 2026,
    callback: (port) => console.log(`Server running on port ${port}`)
};