const express = require("express");
const {
  createOrder,
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  updateOrder,
  createOrderId,
  acceptOrderChangeRegion,
  acceptOrderChangePoint,
  acceptOrderDone,
  findMyOrder,
  acceptOrderPass,
  sendPassData,
  searchSorF,
  searchDandR
} = require("../controllers/orderController");
const {
  authorizePermissions,
  authenticateUser,
  authenticatePointStaff,
  authenticateRegionStaff,
  authenticateRegionManager,
  authenticatePointManager
} = require("../middleware/authentication");

const router = express.Router();

router
  .route("/")
  .post(authenticatePointStaff, createOrder)
  // .get(authorizePermissions("leader"), getAllOrders);
  .get(getAllOrders);

router.route("/ps/createId").post(authenticatePointStaff, createOrderId);
router.route("/ps/changePoint").post(authenticatePointStaff, acceptOrderChangePoint);
router.route("/ps/changeStatus").post(authenticatePointStaff, acceptOrderDone);
router.route("/ps/orderPass").post(authenticatePointStaff, acceptOrderPass);
router.route("/ps/sendPass").post(authenticatePointStaff, sendPassData);
router.route("/ps/searchSorF").post(authenticatePointStaff, searchSorF);

router.route("/rs/changeRegion").post(authenticateRegionStaff, acceptOrderChangeRegion);
router.route("/rs/changeStatus").post(authenticateRegionStaff, acceptOrderDone);
router.route("/rs/changePoint").post(authenticateRegionStaff, acceptOrderChangePoint);
router.route("/rs/orderPass").post(authenticateRegionStaff, acceptOrderPass);

router.route("/rm/searchDandR").post(authenticateRegionManager, searchDandR);

router.route("/pm/searchDandR").post(authenticatePointManager, searchDandR);

router.route("/showAllMyOrders").get(authenticateUser, getCurrentUserOrders);
router.route("/findMyOrder").post(findMyOrder);

router
  .route("/:id")
  .get(authenticateUser, getSingleOrder)
  .patch(authenticateUser, updateOrder);

module.exports = router;
