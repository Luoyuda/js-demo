const express = require('express')
const Template = require('../model/template')
const router = express.Router()

router.get('/template', async (req, res) => {
  const temps = await Template.find({}).sort({update_at: -1})
  res.$success(temps)
})

router.get('/template/:id', async (req, res) => {
  try {
    const temp = await Template.findById({ _id: req.params.id})
    if(!temp){
      res.$success({}, 400)
    }else{
      res.$success(temp)
    }
  } catch (error) {
    res.$success({}, 400)
  }
})

router.delete('/template/:id', async (req, res) => {
  try {
    const temp = await Template.findByIdAndDelete({ _id: req.params.id})
    if(!temp){
      res.$success({}, 400)
    }else{
      res.$success(temp)
    }
  } catch (error) {
    res.$error(error)
  }
})


router.post('/template', async (req, res) => {
  try {
    const temp = await Template.create(req.body)
    res.$success(temp)
  } catch (error) {
    res.$error(error)
  }
})

router.put('/template/:id', async (req, res) => {
  try {
    const temp = await Template.findByIdAndUpdate(
      { _id: req.params.id}, 
      req.body,
      {new: true}
    )
    res.$success(temp)
  } catch (error) {
    res.$error(error)
  }
})

module.exports = router