var should = require('should'), request = require('supertest'), express = require('express'), app = express();

app.get('/menu', function(req, res){
  res.send(200, [{ item: '1' }, { item: '2' }]);
});

describe('API Tests', function() {
	
	before(function (done){
		done();
	});
	
	describe('Get Apis', function(){
	
		it('should be up and running', function(done){
			request(app)
				.get('/menu')
				.expect(200)
				.end(function(err, res){
					done();
				})				
		});
		
		it('should return a list of menus', function(done){
			request(app)
				.get('/menu')				
				.end(function(err, res){
					if(err){
						throw err;
					}
					(res.body.length > 0).should.be.ok;
					done();
				})
		});
		
		it('should not return any users if authentication is not provided', function(done){
			request(app)
				.get('/admin')
				.expect(401)
				.end(function(err, res){
					done();
				})
		});
		
		it('should not authenticate a user', function(done){
			request(app)
				.get('/authenticate')
				.expect(401)
				.end(function(err, res){
					done();
				})
		});
	})	
	
});