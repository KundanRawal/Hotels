const express = require('express');
const router = express.Router();
const Menu = require('../models/menu');
const { run } = require('newman');

module.exports = router;


router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const menu = new Menu(data);
        await menu.save();
        console.log('save data menu');
        res.status(200).json(menu)
    }
    catch (err) {
        console.log('error', err);
        res.status(500).json({ err: 'Internal Server Error' });
    }
})

router.get('/', async (req, res) => {
    try {
        const data = await Menu.find();
        console.log('get data menu');
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
        const menu = await Menu.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true
        });

        if (!menu) {
            return res.status(404).json({ err: 'Menu not found' });
        }


        console.log('update data menu');
        res.status(200).json(menu)
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
            const data = await Menu.find({ work: worktype });
            console.log('get data menu');
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
        const menu = await Menu.findByIdAndDelete(id);
        if (!menu) {
            return res.status(404).json({ err: 'Menu not found' });
        }
        console.log('delete data menu');
        res.status(200).json({ message: 'Menu deleted successfully' });
    }
    catch (err) {
        console.log('error', err);
        res.status(500).json({ err: 'Internal Server Error' });
    }
})