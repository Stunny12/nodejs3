const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const Leader = require('../models/leaders');
const leadRouter = express.Router();
leadRouter.use(bodyParser.json());

leadRouter.route('/')
.get((req,res,next) => {
    Leader.find({})
    .then((lead) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(lead);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Leader.create(req.body)
    .then((lead) => {
        console.log('Leaders Created ', lead);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(lead);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /leaders');
})
.delete((req, res, next) => {
    Leader.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

leadRouter.route('/:leadId')
.get((req,res,next) => {
    Leader.findById(req.params.leadId)
    .then((lead) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(lead);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /leaders/'+ req.params.promoId);
})
.put((req, res, next) => {
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
.delete((req, res, next) => {
    Leader.findByIdAndRemove(req.params.leadId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = leadRouter;