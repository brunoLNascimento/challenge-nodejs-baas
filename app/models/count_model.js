// const mongoose = require('mongoose'),
//     Schema = mongoose.Schema,

// const count = new Schema({
//     userId: { type: String, required: true },    
// 	cpf: { type: Number, required: true},
//     numero_Conta: { type: Number, require: true },
//     data_criacao: { type: Date, require: true },
//     data_exclusao: { type: Date },
//     ativo: { type: Boolean, default: true },
// },{
//     collection: "counts"
// });

// count.plugin().set('toJSON', {
//          transform: function (doc, ret) {
//             delete ret._id
//             delete ret.__v
//             delete ret.id
//          },
//     getters: true,
//     virtuals: true
// });

// mongoose.model('Count', count);