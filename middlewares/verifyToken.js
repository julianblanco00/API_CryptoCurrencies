import config from '../config/config'
import jwt from 'jsonwebtoken'
import User from '../models/user'

export const verifyToken = async ( req, res, next ) => {

	try{

		const token = req.headers["x-access-token"]
		if( !token ) return res.status(403).json({ message: "No token provided" })

		const decoded = jwt.verify( token, config.SECRET )
		const user = await User.findById( decoded.id, { password: 0 } )

    	if( !user ) return res.status(404).json({ message: "User not found" })

		req.user = user;

		next()

	}catch( error ){
		return res.status(403).json({ message: "Unauthorize" })
	}

}
