import User from '../../models/user'
import config from '../../config/config'

import jwt from 'jsonwebtoken'

export const signUp = async ( req, res ) => {

  try{

    const password = await User.encryptPassword( req.body.password )

    const validCurrencies = ['usd', 'ars', 'eur']
    const valid = validCurrencies.includes( req.body.favCurrency )

    if( !valid ) return res.status(400).json({ message: "Enter a valid currency" })

    const newUser = new User({
      ...req.body,
      password: password
    })

    const savedUser = await newUser.save()

    const token = jwt.sign({ id: savedUser._id }, config.SECRET, { 
      expiresIn: 86400
    })

    res.status(200).json({ token })

  }catch(err){
    res.status(400).json({ message: `An error ocurred: ${err}` })
  }

}
