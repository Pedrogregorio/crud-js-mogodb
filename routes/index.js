var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  global.db.findAll((e, docs) => {
      if(e) { return console.log(e); }
      res.render('index', { title: 'Lista de Gastos', docs: docs });
  })
});


router.get('/new', function(req, res, next) {
  res.render('new', { title: 'Novo Gasto', doc: {"produto":"","preco":""}, action: '/new' });
});

router.post('/new', function(req, res) {
  var produto = req.body.produto;
  var preco = parseFloat(req.body.preco);
  global.db.insert({produto, preco}, (err, result) => {
          if(err) { return console.log(err); }
          res.redirect('/');
      })
});

router.get('/edit/:id', function(req, res, next) {
  var id = req.params.id;
  global.db.findOne(id, (e, docs) => {
      if(e) { return console.log(e); }
      res.render('new', { title: 'Edição de Gasto', doc: docs[0], action: '/edit/' + docs[0]._id });
    });
})


router.post('/edit/:id', function(req, res) {
  var id = req.params.id;
  var produto = req.body.produto;
  var preco = parseFloat(req.body.preco);
  global.db.update(id, {produto, preco}, (e, result) => {
        if(e) { return console.log(e); }
        res.redirect('/');
    });
});

router.get('/delete/:id', function(req, res) {
  var id = req.params.id;
  global.db.deleteOne(id, (e, r) => {
        if(e) { return console.log(e); }
        res.redirect('/');
      });
});

module.exports = router;
