const Router = require('koa-router');
const templateController = require('../controllers/template');
const router = new Router();
router.prefix('/xhr/v2');
router.get('/template', templateController.templates);
router.get('/template/:id', templateController.template);
router.delete('/template/:id', templateController.delTemplate);
router.post('/template', templateController.addTemplate);
router.put('/template/:id', templateController.updateTemplate);
module.exports = router;
