import User from '../models/user'

export const findUser = async ( id ) => {
	return await User.findOne({ _id: id }).populate("cryptoCurrencies")
}

export const findUserAndOrder = async ( { favCurrency, id }, order, top ) => {

	const currency = favCurrency 

	const compareField = `Price${currency.toUpperCase()}`

	const user = await User.findOne({ _id: id }).populate({ 
		path: "cryptoCurrencies", 
		options: { 
			sort: { [compareField]: order }, 
			limit: top
		}
	})
 
	return user;

}
