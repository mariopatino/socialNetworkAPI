const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require('../../controllers/thoughtController');

// route /api/thought to retrive or add a thought
router.route('/').get(getThoughts).post(createThought);

// route /api/thought/:thoughtId for retrive, update and delete a single thought
router.route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// route /api/tought/:thoughtId/reactions to add a reaction
router.route('/:thoughtId/reactions')
.post(addReaction);

// route /api/toughts/:thoughtId/reactions/:reactionId  to delete a single reaction 
// from a specific though
router.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction);

module.exports = router;