const {authMiddleware, institutionMiddleware, newsMiddleware, fileMiddleware} = require("../middlewares");
const {newsController} = require("../controllers");
const router = require('express').Router();

// create one news
router.post(
    `/create`,
    authMiddleware.checkAccessToken,
    institutionMiddleware.checkInstitution('info'),
    newsController.createNews
)

// all published news
router.get(
    `/all`,
    authMiddleware.checkAccessToken,
    authMiddleware.checkStatus('check'),
    newsController.allNews
)

// one news info
router.get(
    `/infoById/:id`,
    authMiddleware.checkAccessToken,
    newsMiddleware.checkNews,
    newsController.newsInfo
)

// update one news info
router.patch(
    `/infoById/:id`,
    authMiddleware.checkAccessToken,
    newsMiddleware.checkNews,
    fileMiddleware.checkImagesForUpdated('news'),
    newsController.updateNewsInfo
)


router.get(
    `/otherPlaceNews/:id`,
    authMiddleware.checkAccessToken,
    institutionMiddleware.checkInstitution('info'),
    newsController.otherPlaceNews
)
module.exports = router;