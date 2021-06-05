const router = require('express').Router();
const { Brand, Product } = require('../../models');


router.get('/', async (req, res) => {
    try {
        const brandData = await Brand.findAll({
            include: [{model: Product}]
        });
        res.status(200).json(brandData);

    }
    catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const brandData = await Brand.findByPk(req.params.id, {
            include: [{model: Product}]
        });

        if (!brandData) {

            res.status(404).json({message: "Could not find a brand with this id"})
        }
        res.status(200).json(brandData);

    }
    catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        /* 
        how does the body look like?
        {
            brand_name: "something",
            products: [1,3,4,6]
        }
        like this?
        */
        const newBrand = await Brand.create(req.body);
        res.json(newBrand);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedBrand = await Brand.update(req.body, {
            where: {
                brand_id: req.params.id
            }
        });
        res.json(updatedBrand);
    }

    catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', async(req, res) => {
    // delete a category by its `id` value
    try {
      const deletedBrand = await Brand.destroy({
        where: {
          brand_id: req.params.id
        }
      })
      if(!deletedBrand) { 
        res.status(404).json({message: "Brand not found. Cannot delete"});
      }
      res.status(200).json({message: `Deleted brand #${req.params.id}`});
    }
    catch (err) {
      res.status(500).json(err);
    }
  });
  

  module.exports = router;





