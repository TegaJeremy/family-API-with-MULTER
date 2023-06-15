const express = require( 'express' );
const familyModel = require( '../model/familymodel' );
const fs = require ('fs')


// create a family

const createProfile = async(req, res) => {
    const {fatherName, motherName, children} = req.body
    const profile = new familyModel({
        fatherName,
        motherName,
        children,
        childrenProfile: req.files
    })

    try {
        const saveProfile = await profile.save()
        if (!saveProfile){
            res.status(404).json({
                message: "unable to save profile"
            })
        } else {
            res.status(201).json({
                message: "family profile created sucessfully ",
                data: saveProfile
            })
        }
} catch (error) {
    res.status(404).json({
        message: error.message
    })
}
}
// const createProfile = async ( req, res ) => {
//     const { name, course } = req.body;
//     const profile = new studentModel( {
//             name,
//             course,
//             profileImage: req.files["profileImage"][0].filename,
//         })
//     try {
//         const savedProfile = await profile.save();
//         if ( !savedProfile ) {
//             res.status( 400 ).json( {
//                 message: "Profile not saved."
//             })
//         } else {
//             res.status( 201 ).json( {
//                 message: "Profile created successfully",
//                 data: savedProfile
//             })
//         }
//     } catch ( e ) {
//         res.status( 500 ).json( {
//             message: e.message
//         })
//     }
// }

// get all family

const allprofile = async (req, res)=>{
    const all = await familyModel.find()
    try {
        if(all.length === 0){
            res.status(404).json({message:"no profile found"})
        }else {
            res.status(200).json({message:"all profiles are ", data:all})
        }
        
    } catch (error) {
        res.status(400).json(error.message)
    }

}

// get a profile
const getProfile = async ( req, res ) => {
    const profileId = req.params.id;
    const profile = await familyModel.findById( profileId );
    try {
        if ( !profile) {
            res.status( 404 ).json( {
                message: "No profile found."
            })
        } else {
            res.status( 200 ).json( {
                data: profile,
            })
        }
    } catch ( e ) {
        res.status( 500 ).json( {
            message: e.message
        })
    }
}

// updating profile
const updateProfile = async ( req, res ) => {
    const profileId = req.params.id;
    const profile = await familyModel.findById( profileId );
    try {
        const { fatherName, motherName,children } = req.body;
        const bodyData = {
           // fatherName:fatherName || profile.fatherName, 
            fatherName:(fatherName ? fatherName : profile.fatherName),
            motherName: motherName || profile.motherName,
            children:children || profile.children,
            childrenProfile: profile.childrenProfile
        }

        if ( req.files && req.files[ "childrenProfile" ] ) {
            const oldProfileImagePath = `uploads/${ profile.childrenProfile }`
            if ( fs.existsSync( oldProfileImagePath ) ) {
                fs.unlinkSync(oldProfileImagePath)
            }
            bodyData.childrenProfile = req.files['childrenProfile'][0].filename;

        }
        const newchildrenProfile = await familyModel.findByIdAndUpdate( profileId, bodyData, { new: true } )
            if ( newchildrenProfile ) {
                res.status( 200 ).json( {
                    message: "Updated successfully.",
                    data: newchildrenProfile
                })
            } else {
                res.status( 404 ).json( {
                    message: "Not found"
                })
            }
    } catch ( e ) {
        res.status( 500 ).json( {
            message: e.message
        })
    }
}

// remove a profile
const deleteProfile = async ( req, res ) => {
    const profileId = req.params.id;
    const profile = await familyModel.findById( profileId );
    try {
            const oldProfileImagePath = `uploads/${ profile.childrenProfile }`
            if ( fs.existsSync( oldProfileImagePath ) ) {
                fs.unlinkSync( oldProfileImagePath )
            }
        const deletedProfile = await familyModel.findByIdAndDelete( profileId );
        if ( deletedProfile ) {
            res.status( 200 ).json( {
                message: "Deleted successfully"
            })
        } else {
            res.status( 404 ).json( {
                message: "Your problem is bigger than our own"
            })
        }
    } catch ( e ) {
        res.status( 500 ).json( {
            message: e.message
        })
    }
}

module.exports = {
    createProfile,
    allprofile,
    getProfile,
    updateProfile,
    deleteProfile
}