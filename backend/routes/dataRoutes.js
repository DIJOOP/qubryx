const express=require("express")
const { addExcellData, getMyFiles, getSingleFile } = require("../controllers/dataController")
const { isAuthenticatedUser } = require("../middleware/auth")
const router=express.Router()

router.post("/data/new",isAuthenticatedUser, addExcellData)
router.get("/data/user",isAuthenticatedUser, getMyFiles)
router.get("/data/user/file/:id",isAuthenticatedUser, getSingleFile)



module.exports=router