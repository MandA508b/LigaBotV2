const Router = require('express')
const router = new Router()
const advertisementController = require('../controllers/advertisement.controller')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/create', advertisementController.create)
router.delete('/delete', authMiddleware, advertisementController.delete)
router.put('/redact', authMiddleware, advertisementController.redact)
router.get('/findAll', authMiddleware, advertisementController.findAll)
module.exports = router