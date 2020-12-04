import { findUserAndOrder } from '../../lib/findUser'

export const getMyCryptos = async ( req, res ) => {

	const MAX_TOP = 25

	const { top = MAX_TOP, order = 'desc' } = req.query

	const limitedTop = Math.min( top, MAX_TOP )

	try{
		const { cryptoCurrencies } = await findUserAndOrder( req.user, order, limitedTop )
		res.status(200).json(cryptoCurrencies)

	}catch(error){
		return res.status(400).json(`An error ocurred: ${error}`)		
	}

}
