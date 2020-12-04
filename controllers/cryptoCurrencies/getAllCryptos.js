import axios from 'axios'
import config from '../../config/config'

export const getAll = async ( req, res ) => {

	try{
	
		const urlApi = `${ config.URL_CRYPTO_API }/coins/markets?vs_currency=${ req.user.favCurrency }&sparkline=false`
		const obtainedCryptos = await axios.get( urlApi )

		let cryptos = [];

		for(const crypto of obtainedCryptos.data){
   	
			const { symbol, current_price, name, image, last_updated } = crypto;

			cryptos.push({
				symbol,
				current_price,
				name,
				image,
				last_updated
			})

		}
		
		res.status(200).json({ cryptos })	

	}catch(error){
		return res.status(403).json({ error })
	}

}
