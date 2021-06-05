const router = require('express').Router();
const { Category, Product } = require('../../models');

//get all categories
router.get('/', async(req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{model: Product}]
    });
    res.status(200).json(categoryData);
}
  catch (err) {
    res.status(500).json(err);
  }
});

// get a single category by id
router.get('/:id', async(req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{model: Product}]
    });

    if(!categoryData) {
      res.status(404).json({message: "404 Category not found"});
    }
    res.status(200).json(categoryData);
  }
  catch (err) {
    res.status(500).json(err);
  }
});


router.post('/', async(req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async(req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.update(req.body, {
      where: {
        category_id: req.params.id
      }
    })
    res.status(200).json(updateCategory);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async(req, res) => {
  // delete a category by its `id` value
  try {
    const deletedCategory = await Category.destroy({
      where: {
        category_id: req.params.id
      }
    })
    if(!deletedCategory) { 
      res.status(404).json({message: "Category not found. Cannot delete"});
    }
    res.status(200).json({message: `Deleted category #${req.params.id}`});
  }
  catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;