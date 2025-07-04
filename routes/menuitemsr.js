const express = require('express');
const router = express.Router();
const menuitems = require('../models/menuitems');

module.exports = router;

router.post('/menuitem', async (req, res) => {
    try {
        const data = req.body;
        const menuitem = new MenuItem(data);
        await menuitem.save();
        console.log('save data menuitems');
        res.status(200).json(menuitem)
    }
    catch (err) {
        console.log('error', err);
        res.status(500).json({ err: 'Internal Server Error' });
    }
})

router.get('/menuitem', async (req, res) => {
    try {
        const data = await MenuItem.find();
        console.log('get data menuitems');
        res.status(200).json(data)
    }
    catch (err) {
        console.log('error', err);
        res.status(500).json({ err: 'Internal Server Error' });
    }
})

router.get('/:types', async (req, res) => {
    try {
        const types = req.params.types
        if (types == 'veg' || types == 'nonveg') {
            const data = await MenuItem.find({ description: types });
            console.log('get data menuitems');
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

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const menuitem = await MenuItem.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true
        });

        if (!menuitem) {
            return res.status(404).json({ err: 'MenuItem not found' });
        }


        console.log('update data menuitems');
        res.status(200).json(menuitem)
    }
    catch (err) {
        console.log('error', err);
        res.status(500).json({ err: 'Internal Server Error' });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const menuitem = await MenuItem.findByIdAndDelete(id);
        if (!menuitem) {
            return res.status(404).json({ err: 'MenuItem not found' });
        }
        console.log('delete data menuitems');
        res.status(200).json({ message: 'MenuItem deleted successfully' });
    }
    catch (err) {
        console.log('error', err);
        res.status(500).json({ err: 'Internal Server Error' });
    }
})