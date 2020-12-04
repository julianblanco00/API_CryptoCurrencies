import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1/cryptocurrencies", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then( () => console.log('DB is connected'))
    .catch(err => console.log('Error connecting DB', err));
