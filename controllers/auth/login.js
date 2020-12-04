import User from '../../models/user'
import jwt from 'jsonwebtoken'
import config from '../../config/config'

export const login = async ( req, res ) => {

	const foundUser = await User.findOne({ username: req.body.username });
  if( !foundUser ) return res.status(401).json({ message: "Invalid email or password" })
  
  const matchPassword = await User.comparePassword( req.body.password, foundUser.password )
  if(!matchPassword) return res.status(401).json({ message: "Invalid email or password" })
  
  const token = jwt.sign( { id: foundUser._id }, config.SECRET, { 
    expiresIn: 172800
  })

  res.json({ token })		

}
