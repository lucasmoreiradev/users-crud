var express = require('express');
var router = express.Router();
var User = require('../models/user');

router
	.get('/', function(req, res, next) {
		User.find(function(erro, data) {
			if (erro) 
				console.log(erro);
			
 			res.render('users/index', {lista: data});
		});
	})
	.get('/create', function(req, res) {
		res.render('users/create');
	})
	.get('/edit/:id', function(req, res) {
		User.findById(req.params.id, function(erro, data) {
			if (erro) console.log(erro);
			res.render('users/edit', {value: data});	
		});
	})
	.get('/show/:id', function(req, res) {
		User.findById(req.params.id, function(erro, data) {
			if (erro) console.log(erro);
			res.render('users/show', {value: data});	
		});
	})
	.post('/', function(req, res) {
		var model =	new User(req.body);
		model.save(function(erro, data) {
			if (erro) console.log(erro);
			res.redirect('/users');
		});
	})
	.put('/:id', function(req, res) {
		User.findById(req.params.id, function(err, data) {
			if (err) console.log(err);
			var model = data;
			model.nome = req.body.nome;
			model.login = req.body.login;
			model.save(function (err) {
				if (err) console.log(err);
				res.redirect('/users');
			});
		});	
	})
	.delete('/:id', function(req, res){
		User.remove({_id: req.params.id}, function(erro) {
			if (erro) console.log(erro);
			res.redirect('/users');
		})
	});

module.exports = router;
