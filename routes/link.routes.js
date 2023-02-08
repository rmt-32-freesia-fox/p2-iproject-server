const { Router } = require('express')
const LinkController = require('../controllers/link.controllers')
const {
  authenticate,
  authorizeLink,
} = require('../middlewares/auth.middlewares')

const router = Router()

router.post('/', authenticate, LinkController.add)
router.get('/:id', LinkController.detail)
router.put('/:id', authenticate, authorizeLink, LinkController.edit)
router.delete('/:id', authenticate, authorizeLink, LinkController.remove)

module.exports = router
