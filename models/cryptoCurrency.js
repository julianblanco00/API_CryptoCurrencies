import { Schema, model } from 'mongoose'

const cryptoCurrencySchema = new Schema({

    Symbol: {
        type: String,
        required: true
    },
    PriceARS: {
        type: Number,
        required: true
    },
    PriceUSD: {
        type: Number,
        required: true
    },
    PriceEUR: {
        type: Number,
        required: true
    },
    Name: {
        type: String,
        required: true
    },
    Image: {
        type: String,
        required: true
    },
    LastUpdated: {
        type: String,
        required: true
    },
    CryptoId:{
        type: String,
        required: true
    }

}, {
    timestamps: true,
    versionKey: false
})

export default model( 'cryptoCurrency', cryptoCurrencySchema );
