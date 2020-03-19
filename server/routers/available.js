const express = require('express')
const router = new express.Router()
const db = require('../models')
const WhenAvailable = require('../models/whenavailable')

// Get all whenAvailables
router.get('/available', (req, res) => {
    return db.WhenAvailable.findAll()
        .then((whenAvailable) => res.send(whenAvailable))
        .catch((err) => {
            return res.status(500).send()
        })
})

// Create a whenAvailable
router.post('/participants/:id/available', (req, res) => {
    const { date, hours } = req.body
    const ParticipantId = parseInt(req.params.id)
    return db.WhenAvailable.create({ date, hours, ParticipantId })
        .then((whenAvailable) => res.status(201).send(whenAvailable))
        .catch((err) => {
            res.sendStatus(400).send(err)
        })
})

// Get a whenAvailable by id
router.get('/available/:id', (req, res) => {
    const id = parseInt(req.params.id)
    return db.WhenAvailable.findByPk(id)
        .then((whenAvailable) => res.send(whenAvailable))
        .catch((err) => {
            res.status(500).send()
        })
})
// Update a whenAvailable
router.patch('/available/:id', (req, res) => {
    const id = parseInt(req.params.id)
    return db.WhenAvailable.findByPk(id)
        .then((whenAvailable) => {
            if (!whenAvailable) {
                return resStatus(404)
            }
            const { date, hours } = req.body
            return whenAvailable.update({ date, hours })
                .then(() => res.send(whenAvailable))
                .catch((err) => {
                    res.status(400).send(err)
                })
        })
        .catch((err) => {
            res.status(400).send(err)
        })
})
// Delete a whenAvailable
router.delete('/available/:id', (req, res) => {
    const id = parseInt(req.params.id)
    return db.WhenAvailable.findByPk(id)
        .then((whenAvailable) => whenAvailable.destroy())
        .then(() => res.sendStatus(202).send(id))
        .catch((err) => {
            res.status(400).send(err)
        })
})

module.exports = router