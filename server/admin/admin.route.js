const router = require('express').Router();

const {
  fetchAllCategories,
  newCategory,
  updateCategory,
  deleteCategory,
} = require('./admin.controller');

router.get('/category', fetchAllCategories);
router.post('/category', newCategory);
router.patch('/category/:id', updateCategory);
router.delete('/category/:id', deleteCategory);

module.exports = router;
