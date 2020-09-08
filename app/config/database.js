module.exports = {
    db: {
        uri: 'mongodb://localhost:27017/baas',
        option : { 
            useNewUrlParser: true,
            useUnifiedTopology: true 
        }
    },

    limit: {
        items: 10
    },

    secret: "usuarioSecreto" 
};