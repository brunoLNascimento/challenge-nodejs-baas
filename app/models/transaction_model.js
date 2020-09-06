const mongoose = require('mongoose'),
    Schema = mongoose.Schema

const transaction = new Schema({
    userId: { type: String, required: true },    
    data_transacao: { type: Date, require: true },
    valor_anterior: { type: Number, require: true, default: 0},
    valor_depositado: { type: Number },
    valor_total: { type: Number }
},{
    collection: "transactions"
});

transaction.set('toJSON', {
         transform: function (doc, ret) {
            delete ret._id
            delete ret.__v
            delete ret.id
         },
    getters: true,
    virtuals: true
});

mongoose.model('Transaction', transaction);