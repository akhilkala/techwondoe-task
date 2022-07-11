import express from "express";

const router = express.Router();

router.post("/auth/register");
router.post("/auth/login");

router.post("/shows/add");
router.get("/shows/all");
router.put("/shows/edit");
router.delete("/shows/delete");

export default router;
