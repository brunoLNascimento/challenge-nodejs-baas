const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoincrement = require('mongoose-sequence')(mongoose)

const user = new Schema({
    nome: { type: String, required: true },    
	cpf: { type: String, required: true},
	email: { type: String, required: true },
	estado_civil: { type: String, required: true },
    endereco: { type: String, required: true },
	uf: { type: String, required: true },
	cidade: { type: String, required: true },
    telefone: { type: String, required: true },
    complemento: { type: String },
	profissao: { type: String, required: true },
	rendimentos: { type: Number, required: true },
    nome_empresa: { type: String },
    ativo: { type: Boolean, default: true }    
},{
    collection: "users"
});

user.plugin(autoincrement, {inc_field: 'userId'}).set('toJSON', {
         transform: function (doc, ret) {
            delete ret._id
            delete ret.__v
            delete ret.id
         },
    getters: true,
    virtuals: true
});

mongoose.model('User', user);