const { User, Thought } = require('../models');

module.exports = {
    // get all thoughts
    getThoughts(req, res) {
        Thought.find()
            .populate('reactions', '-__v')
            .select('-__v')
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    // get a single thought using thought Id
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .populate('reactions', '-__v')
            .select('-__v')
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought found with this ID:'+ req.params.thoughtId })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // create a thought and return it
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { thoughts: thought._id } },
                    { new: true }
                );
            })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'The Thought was created but there was no user with the ID:'+req.body.userId })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // update a single thought using thought id
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'There is no thought with this ID:'+ req.params.thoughtId})
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // delete a thought and remove it from user
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'There is no thought with this ID:'+ req.params.thoughtId })
                    : User.findOneAndUpdate(
                        { thoughts: req.params.thoughtId },
                        { $pull: { thoughts: req.params.thoughtId } },
                        { new: true }
                    )
            )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'Thought deleted, but user not found' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // create a reaction
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((thought) => 
                !thought
                    ? res.status(404).json({ message: 'There is no thought with this ID:'+ req.params.thoughtId})
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // delete reaction
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidatiors: true, new: true }
        )
            .then((thought) => 
                !thought
                    ? res.status(404).json({ message: 'There is no thought with this ID:'+ req.params.thoughtId })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
};