const { User, Thought } = require('../models');

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
        .populate('thoughts', '-__v')
        .populate('friends', '-__v')
        .select('-__v')
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
  },
  // Get a user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
            .populate('thoughts')
            .populate('friends')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this ID:'+ req.params.userId })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err)
      });
  },

  // Create a user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a user
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !(user)
          ? res.status(404).json({ message: 'No user with this ID:'+req.params.userId })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() => res.json({ message: 'User and thoughts deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this id!' + params.userId  })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // add new friend
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $push: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
            .status(404)
            .json({ message: 'No User found with this ID :'+ req.params.userId })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Delete a  friend and remove it from User list of friends
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId  } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
            .status(404)
            .json({ message: 'No friend found with this ID :' + req.params.friendId })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

};