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
router.post('/meetings/:id/participants', (req, res) => {
    const { name, mark } = req.body
    const MeetingId = parseInt(req.params.id)
    return db.Participant.create({ name, mark, MeetingId })
        .then((participant) => res.status(201).send(participant))
        .catch((err) => {
            res.sendStatus(400).send(err)
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
// Update a participant
router.patch('/participants/:id', (req, res) => {
    const id = parseInt(req.params.id)
    return db.Participant.findByPk(id)
        .then((participant) => {
            if (!participant) {
                return resStatus(404)
            }
            const { name, mark } = req.body
            return participant.update({ name, mark })
                .then(() => res.send(participant))
                .catch((err) => {
                    res.status(400).send(err)
                })
        })
        .catch((err) => {
            res.status(400).send(err)
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