const express = require('express');
const router = express.Router();
const Person = require('../models/person');
const { run } = require('newman');
const { jwtAuthMiddelware, generateToken } = require('../jwt');

module.exports = router;


router.post('/signup', async (req, res) => {
    try {
        const data = req.body;
        const person = new Person(data);
        await person.save();
        console.log('save data person');

        const token = generateToken(person.username);
        console.log(token);
        res.status(200).json({ person: person, token: token })
    }
    catch (err) {
        console.log('error', err);
        res.status(500).json({ err: 'Internal Server Error' });
    }
})

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await Person.findOne({ username: username });
        if (!user || !(await user.comparepasswors(password))) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const payload = {
            id: user.id,
            username: user.username,
        }
        const token = generateToken(payload);
        res.status(200).json({ user: user, token: token });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ err: 'Internal Server Error' })
    }
})

router.get('/profile', jwtAuthMiddelware, async (req, res) => {
    try {
        const UD = req.user;
        console.log(UD);
        const id = UD.id;
        const user = await Person.findById(id);
        res.status(200).json({ user: user });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ err: 'Internal Server Error' })

    }
})

router.get('/', jwtAuthMiddelware, async (req, res) => {
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