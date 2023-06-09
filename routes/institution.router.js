const router = require('express').Router();

const {authMiddleware, institutionMiddleware, fileMiddleware, userMiddleware} = require("../middlewares");
const {institutionController, commentController} = require("../controllers");

// all published institution
router.get(
    `/all`,
    authMiddleware.checkAccessToken,
    authMiddleware.checkStatus("check"),
    institutionController.allInstitutionByVerify
);

// create institution
router.post(
    `/create`,
    authMiddleware.checkAccessToken,
    institutionController.createInstitution
)

// all institution info with field
router.get(
    `/allInfoById/:id`,
    authMiddleware.checkAccessToken,
    institutionMiddleware.checkInstitution('all_info'),
    institutionController.getAllInfoById
)

// institution info
router.get(
    `/infoById/:id`,
    authMiddleware.checkAccessToken,
    institutionMiddleware.checkInstitution('info'),
    institutionController.getById
)

// update institution info
router.patch(
    `/infoById/:id`,
    authMiddleware.checkAccessToken,
    institutionMiddleware.checkInstitution('info'),
    fileMiddleware.checkImagesForUpdated('institution'),
    institutionController.updateInstitutionById
)

// user`s institution
router.get(
    `/userInstitutions`,
    authMiddleware.checkAccessToken,
    authMiddleware.checkStatus('check'),
    institutionController.userInstitutionsByQuery
)

// count cities
router.get(
    `/countByCity`,
    authMiddleware.checkAccessToken,
    institutionController.countByCity
)

// count institutions type
router.get(
    `/countByType`,
    authMiddleware.checkAccessToken,
    institutionController.countByType
)

// count institution with more views
router.get(
    `/countMoreViews`,
    authMiddleware.checkAccessToken,
    institutionController.countMoreViews
)

// unique places
router.get(
    `/uniquePlaces`,
    authMiddleware.checkAccessToken,
    institutionController.uniquePlaces
)


// delete institution
router.delete(
    `/deleteOne/:id`,
    authMiddleware.checkAccessToken,
    authMiddleware.checkStatus('check'),
    institutionMiddleware.checkInstitution('info'),
    institutionController.deleteInstitutions
)

router.patch(
    `/updateStatus/:id`,
    authMiddleware.checkAccessToken,
    authMiddleware.checkStatus('check'),
    institutionMiddleware.checkInstitution('info'),
    institutionController.updateStatus
)

router.get(
    `/updateStatus/:id`,
    authMiddleware.checkAccessToken,
    authMiddleware.checkStatus('check'),
    institutionMiddleware.checkInstitution('info'),
    institutionController.getStatus
)

router.get(
    `/allByUserId/:id`,
    authMiddleware.checkAccessToken,
    authMiddleware.checkStatus('check'),
    userMiddleware.isUserPresent,
    institutionController.allByUserId
)
module.exports = router;