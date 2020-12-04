const request = require('supertest')
const app = require('../app');

const axios = require('axios')

const user = {
	username: "JulianBlanco",
	password: "password"
}

const generateToken = () => {

	return new Promise( async(resolve, reject) => {
		const { data } = await axios.post( 'https://localhost:3000/auth/login', user )	
		return resolve(data.token)
	})

}

describe('/POST /auth/signup', () => {
	it('should respond with a token and status 200 or just status 200 if could not create the user', done => {
	
		const data = {
			username: "JulianBlanco",
			password: "password",
			name: "Julian",
			lastname: "Blanco",
			favCurrency: "usd"
		}

		request(app)
			.post('/auth/signup')
			.send(data)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.end(( err, res ) => {
				if ( err ) return done(res.text)
				done();
			})
	})

	it('should respond with error if no required data is specified or another error happend', done => {
	
		const data = {
			username: "JulianBlanco123",
			password: "password",
			name: "Julian",
			lastname: "Blanco",
		}

		request(app)
			.post('/auth/signup')
			.send(data)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(400)
			.end(( err, res ) => {
				if ( err ) return done(res.text)
				done();
			})
	})
})


describe('/POST /auth/login', () => {
	it('should respond with a token and status 200', done => {
	
		const data = {
			username: "JulianBlanco",
			password: "password"
		}

		request(app)
			.post('/auth/login')
			.send(data)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.end(( err, res ) => {
				if ( err ) return done(res.text)
				done();
			})
	})

	it('should respond with status 401 if some data is wrong', done => {
	
		const data = {
			username: "JulianBlanco",
			password: "passwordd"
		}

		request(app)
			.post('/auth/login')
			.send(data)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(401)
			.end(( err, res ) => {
				if ( err ) return done(res.text)
				done();
			})
	})

})


describe('/POST /crypto/add', () => {

	it('should respond with a json list and status 200', ( done ) => {
	
		const data ={
    		"cryptoId": "0-5x-long-balancer-token"
		}

		generateToken().then( token => {

			request(app)
			.post('/crypto/add')
			.send(data)
			.set('Accept', 'application/json')
			.set('x-access-token', token)
			.expect('Content-Type', /json/)
			.expect(200)
			.end(( err, res ) => {
				if ( err ) return done(res.text)
				done();
			})

		})

		done()
		
	})

	it("should respond with status 403 if no token is provided or the token expired", done => {

		const data ={
    		"cryptoId": "0-5x-long-balancer-token"
		}

		generateToken().then( token => {

			request(app)
				.post('/crypto/add')
				.send(data)
				.set('x-access-token', token)
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(403)
				.end( err => {
					if( err ) return done( err )
					done();
				})
		})

		done()
	})

})


describe('/GET /crypto/get-all', () => {
	it("should respond with a json list and with a status 200", done => {

		generateToken().then( token => {

			request(app)
				.get('/crypto/get-all')
				.set('x-access-token', token)
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(200)
				.end( err => {
					if( err ) return done( err )
					done();
				})
		})

		done()

	})

	it("should respond with status 403 if no token is provided or the token expired", done => {

		generateToken().then( token => {

			request(app)
				.get('/crypto/get-all')
				.set('x-access-token', token)
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(403)
				.end( err => {
					if( err ) return done( err )
					done();
				})
		})

		done()
	})
})


describe('/GET /crypto/get/my-cryptos', () => {
	it("should respond with a json list and with a status 200", done => {

		generateToken().then( token => {

			request(app)
				.get('/crypto/get/my-cryptos')
				.set('x-access-token', token)
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(200)
				.end( err => {
					if( err ) return done( err )
					done();
				})
		})

		done()

	})

	it("should respond with status 403 if no token is provided or the token expired", done => {

		generateToken().then( token => {
			request(app)
				.get('/crypto/get-all')
				.set('x-access-token', token)
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(403)
				.end( err => {
					if( err ) return done( err )
					done();
				})
		})

		done()

	})
})
