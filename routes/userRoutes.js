import express from "express";
import {
    adminLogin,
    getUserData,
    getUserId,
    isAdminUser,
    loginUser,
    logoutUser,
    registerUser
} from "../controllers/_User.js";

const router = express.Router();

// /api/user
router.get("/", getUserData);
router.get("/id", getUserId);
router.get("/admin/verify", isAdminUser);

router.post("/admin", adminLogin);
router.post("/register", registerUser);

router.post("/login", loginUser);
router.post("/logout", logoutUser);

export default router;

