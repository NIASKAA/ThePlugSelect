const router = require("express").Router();

const productRoutes = require("./productRoutes");
const categoryRoutes = require("./categoryRoutes");
const tagRoutes = require("./tagRoutes");
const userRoutes = require("./userRoutes");
const uploadRoutes = require("./imageUploadRoutes");
router.use("/products", productRoutes);
router.use("/categories", categoryRoutes);
router.use("/tags", tagRoutes);
router.use("/users", userRoutes);
router.use("/upload", uploadRoutes);
module.exports = router;
