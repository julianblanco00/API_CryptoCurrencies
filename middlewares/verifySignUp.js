import User from '../models/user';

export const isDuplicated = async ( req, res, next ) => {

	const username = await User.findOne({ username: req.body.username })
	if( username ) return res.status(200).json({ message: "The username already exists" })

	next()

}
