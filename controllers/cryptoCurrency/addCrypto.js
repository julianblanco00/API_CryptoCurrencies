import axios from "axios"
import config from "../../config/config"
import cryptoModel from '../../models/cryptoCurrency'
import User from '../../models/user'
import { findUser } from '../../lib/findUser'

export const addCrypto = async ( req, res ) => {
	
	try	{

		const populatedUser = await findUser( req.user._id )

		for( const crypto of populatedUser.cryptoCurrencies ){
			if ( crypto.CryptoId == req.body.cryptoId ) 
				return res.status(200).json({ message: "Duplicated crypto" })
		}

		const urlApi = `${ config.URL_CRYPTO_API }/coins/${ req.body.cryptoId }`
		const obtainedCrypto = await axios.get( urlApi );
		
		const { id, symbol, market_data, name, image, last_updated } = obtainedCrypto.data 

		const cryptoObj = new cryptoModel({
			Symbol: symbol,
			PriceARS: market_data.current_price.ars,
			PriceUSD: market_data.current_price.usd,
			PriceEUR: market_data.current_price.eur,
			Name: name,
			Image: image.small,
			LastUpdated: last_updated,
			CryptoId: id
		})

		req.user.cryptoCurrencies.push( cryptoObj._id )

		const cryptoArray = req.user.cryptoCurrencies
		
		await User.findOneAndUpdate(
			{ _id: req.user._id }, 
			{ cryptoCurrencies: cryptoArray },
			{ useFindAndModify: false }
		)
		
		const savedCrypto = await cryptoObj.save()

		return res.status(200).json({ savedCrypto })
		
	}catch(error){
		return res.status(403).json(`${error}`)
	}

}
