const express = require( 'express' );
const router = express.Router();
const { createProfile, allprofile, getProfile , updateProfile, deleteProfile} = require( '../controller/familycontroller' )

const upload = require('../utils/multer')


//router.post( '/profiles', upload.fields( [ { name: "childrenProfile", maxCount: 3 } ] ), createProfile )
router.post("/family", upload.array("childrenProfile", 3), createProfile)
router.get('/allfamilies', allprofile)
router.get('/onefamily/:id', getProfile)
router.put('/family/:id',upload.array("childrenProfile", 3), updateProfile)
router.delete('/family/:id', deleteProfile)



module.exports = router;

//upload.fields( [ { name: "profileImage", maxCount:  } ] )