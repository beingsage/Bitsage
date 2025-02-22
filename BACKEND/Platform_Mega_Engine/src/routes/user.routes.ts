import {Router} from 'express';
import {registerUser
    , loginUser,
    logoutUser,
    refreshAccessToken,
    readuser,
    updateUser,
    deleteUser,

} from '../../../controllers/user.controller.js';
import {verifyJWT} from '../middlewares/auth.middleware.js';

const router = Router();

// router.route('/').get((req, res) => {
//     res.send('User route');
// });

router.route("/register").post(
  registerUser
);
router.route("/login").post(
  loginUser
);
router.route("/logout").post(
  verifyJWT,
  logoutUser
);
router.route("/refresh-token").post(
  refreshAccessToken
);
router.route("/read-user").get(
  readuser
);

router.route("/update-user").post(
  updateUser
);

router.route("/delete-user").delete(
  deleteUser
);

export default router;