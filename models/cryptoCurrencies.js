import { Schema, model } from 'mongoose'

const cryptoCurrenciesSchema = new Schema({

    Symbol: String,
    PriceInFavCurrency: Number,
    Name: String,
    Image: String,
    Last_updated: String

})

export default model( 'cryptoCurrencies', cryptoCurrenciesSchema );
