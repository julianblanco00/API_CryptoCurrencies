import express from 'express'

import AuthRoutes from './routes/auth'
import CryptoRoutes from './routes/cryptocurrencies'


import './database/database'

const app = express()

app.use(express.json());

app.use('/auth', AuthRoutes)
app.use('/crypto', CryptoRoutes)

app.listen(3000, () => {
	console.log('Server running on port', 3000)
})

module.exports = app;
