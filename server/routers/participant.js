const express = require('express')
const router = new express.Router()
const db = require('../models')
const Participant = require('../models/Participant')

// Get all participants
router.get('/participants', (req, res) => {
    return db.Participant.findAll()
        .then((participants) => res.send(participants))
        .catch((err) => {
            return res.status(500).send()
        })
})

// Create a participant
router.post('/participants', (req, res) => {
    const { name, mark } = req.body
    return db.Participant.create({ name, mark })
        .then((participant) => res.status(201).send(participant))
        .catch((err) => {
            res.status(400).send(err)
        })
})

// Get a participant by id
router.get('/participants/:id', (req, res) => {
    const id = parseInt(req.params.id)
    return db.Participant.findByPk(id)
        .then((participant) => res.send(participant))
        .catch((err) => {
            res.status(500).send()
        })
})

// Delete a participant
router.delete('/participants/:id', (req, res) => {
    const id = parseInt(req.params.id)
    return db.Participant.findByPk(id)
        .then((participant) => participant.destroy())
        .then(() => res.sendStatus(202).send(id))
        .catch((err) => {
            res.status(400).send(err)
        })
})

module.exports = router