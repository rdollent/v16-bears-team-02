const express = require('express')
const router = new express.Router()
const db = require('../models')
const Meeting = require('../models/Meeting')
const Participant = require('../models/Participant')

router.get('/', (req, res) => {
    res.send('backend up')
})
// Get all meetings
router.get('/meetings', (req, res) => {
    return db.Meeting.findAll()
        .then((meetings) => res.send(meetings))
        .catch((err) => {
            return res.status(500).send({ error: 'something blew up the server' })
        })
})
// Create a meeting 
router.post('/meetings', (req, res) => {
    return db.Meeting.create({
        name: req.body.meetingName
    })
        .then((meeting) => res.status(201).send(meeting))
        .catch((err) => {
            res.status(400).send(err)
        })
})
// Get a meeting by id
router.get('/meetings/:id', (req, res) => {
    const id = parseInt(req.params.id)
    return db.Meeting.findByPk(id)
        .then((meeting) => res.send(meeting))
        .catch((err) => {
            res.status(500).send({ error: 'something blew up the server' })
        })
})
// Update a meeting 
router.patch('/meetings/:id', (req, res) => {
    const id = parseInt(req.params.id)
    return db.Meeting
        .findByPk(id)
        .then((meeting) => {
            if (!meeting) {
                return resStatus(404)
            }
            const name = req.body.meetingName
            return meeting.update({ name })
                .then(() => res.send(meeting))
                .catch((err) => {
                    res.status(400).send(err)
                })
        })
        .catch((err) => {
            res.status(400).send(err)
        })
})
// Delete a meeting
router.delete('/meetings/:id', (req, res) => {
    const id = parseInt(req.params.id)
    return db.Meeting.findByPk(id)
        .then((meeting) => meeting.destroy())
        .then(() => res.sendStatus(202).send(id))
        .catch((err) => {
            res.status(400).send(err)
        })
})

module.exports = router