const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const Leader = require('../models/leaders');
const leadRouter = express.Router();
var authenticate = require('../authenticate');
leadRouter.use(bodyParser.json());

leadRouter.route('/')
.get(authenticate.verifyUser,(req,res,next) => {
    Leader.find({})
    .then((lead) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(lead);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyAdmin,(req, res, next) => {
    Leader.create(req.body)
    .then((lead) => {
        console.log('Leaders Created ', lead);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(lead);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(authenticate.verifyAdmin,(req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /leaders');
})
.delete(authenticate.verifyAdmin,(req, res, next) => {
    Leader.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

leadRouter.route('/:leadId')
.get(authenticate.verifyUser,(req,res,next) => {
    Leader.findById(req.params.leadId)
    .then((lead) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(lead);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyAdmin,(req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /leaders/'+ req.params.promoId);
})
.put(authenticate.verifyAdmin,(req, res, next) => {
    Leader.findByIdAndUpdate(req.params.leadId, {
        $set: req.body
    }, { new: true })
    .then((lead) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(lead);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(authenticate.verifyAdmin,(req, res, next) => {
    Leader.findByIdAndRemove(req.params.leadId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = leadRouter;