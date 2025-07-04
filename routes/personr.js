const express = require('express');
const router = express.Router();
const Person = require('../models/person');
const { run } = require('newman');

module.exports = router;


router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const person = new Person(data);
        await person.save();
        console.log('save data person');
        res.status(200).json(person)
    }
    catch (err) {
        console.log('error', err);
        res.status(500).json({ err: 'Internal Server Error' });
    }
})

router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        console.log('get data person');
        res.status(200).json(data)
    }
    catch (err) {
        console.log('error', err);
        res.status(500).json({ err: 'Internal Server Error' });
    }
})


router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const person = await Person.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true
        });

        if (!person) {
            return res.status(404).json({ err: 'Person not found' });
        }


        console.log('update data person');
        res.status(200).json(person)
    }
    catch (err) {
        console.log('error', err);
        res.status(500).json({ err: 'Internal Server Error' });
    }
})

router.get('/:worktype', async (req, res) => {
    try {
        const worktype = req.params.worktype;
        if (worktype == 'chef' || worktype == 'waiter' || worktype == 'manager') {
            const data = await Person.find({ work: worktype });
            console.log('get data person');
            res.status(200).json(data)
        }
        else {
            console.log('error', err)
            res.status(500).json({ err: 'Internal Server Error' });
        }
    }
    catch (err) {
        console.log('error', err);
        res.status(500).json({ err: 'Internal Server Error' });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const person = await Person.findByIdAndDelete(id);
        if (!person) {
            return res.status(404).json({ err: 'Person not found' });
        }
        console.log('delete data person');
        res.status(200).json({ message: 'Person deleted successfully' });
    }
    catch (err) {
        console.log('error', err);
        res.status(500).json({ err: 'Internal Server Error' });
    }
})