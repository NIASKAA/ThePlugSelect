const router = require('express').Router();


const productRoutes = require('./productRoutes');
const categoryRoutes = require('./categoryRoutes');
const tagRoutes = require('./tagRoutes');
const userRoutes = require('./userRoutes');

router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);
router.use('/tags', tagRoutes);
router.use('/users', userRoutes);

module.exports = router;