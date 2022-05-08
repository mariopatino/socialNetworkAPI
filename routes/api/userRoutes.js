const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/userController');

// route /api/users to retrive and add new user
router.route('/').get(getUsers).post(createUser);

// route /api/users/:userId to retrive, update and delete a single user
router.route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

// route /api/users//:userId/friends/:friendId to add and delete a friend 
router.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router;