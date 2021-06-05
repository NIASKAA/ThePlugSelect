const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async(req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{model: Product}]
    });
    res.status(200).json(tagData);
  }
  catch (err) {
      res.status(500).json(err);
}
});

router.get('/:id', async (req, res) => {
  try {
    const foundTag = await Tag.findByPk(req.params.id, {
      include: [{model: Product}]
    });
    if (!foundTag) {
      res.status(404).json({ message: "No product with this tag found"});
    }
    res.status(200).json(foundTag);
  }

  catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async(req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(req.body);
  }

  catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async(req, res) => {
  try {
    const newTag = await Tag.update(req.body, {
      where: {
        tag_id: req.params.id
      }
    })
    if (!newTag) {
      res.status(404).json({message: "Tag not found"});
    }
    res.status(200).json(newTag);
}
  catch(err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', async(req, res) => {
  try { 
    const deleteTag = await Tag.destroy({
      where: {
        tag_id: req.params.id
      }})
    if(!deleteTag) {
      res.status(404).json({message: "Tag not found"});
    }
    res.status(200).json(deleteTag);
}
  catch(err) {
      res.status(500).json(err);
  }
});

module.exports = router;