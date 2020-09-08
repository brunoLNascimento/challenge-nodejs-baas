const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoincrement = require('mongoose-sequence')(mongoose)

const transaction = new Schema({
    userId: { type: Number, required: true },    
    data_transacao: { type: String, require: true },
    valor_anterior: { type: Number, require: true, default: 0},
    valor_depositado: { type: Number },
    valor_total: { type: Number },  
    valor_saque: { type: Number } 
},{
    collection: "transactions"
});

transaction.plugin(autoincrement, {inc_field: 'transactionId'}).set('toJSON', {

         transform: function (doc, ret) {
            delete ret._id
            delete ret.__v
            delete ret.id
         },
    getters: true,
    virtuals: true
});

mongoose.model('Transaction', transaction);