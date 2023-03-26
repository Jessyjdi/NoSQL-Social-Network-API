const User = require('../models/User');

module.exports = {
    // Get all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // Get a user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },

  // Delete a User
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
    .then(data => {
        if (!data) {
            res.status(404).json({ message: 'No user found with this id!' })
            return;
        }
        res.json(data);
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    })
},
// Update User
updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
    .then(data => {
        if (!data) {
            res.status(404).json({ message: 'No user found with this id!' })
            return;
        }
        res.json(data);
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    })
},

// Add Friend
addFriend({ params }, res) {
    User.findByIdAndUpdate(
        { _id: params.id },
        { $push: { friends: params.friendId }},
        { new: true, runValidators: true })
    .then(data => {
        if (!data) {
            res.status(404).json({ message: 'No user found with this id!' })
            return;
        }
        res.json(data);
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    })
},

// Remove Friend
removeFriend({ params }, res) {
    User.findByIdAndUpdate(
        { _id: params.id },
        { $pull: { friends: params.friendId }},
        { new: true, runValidators: true })
    .then(data => {
        if (!data) {
            res.status(404).json({ message: 'No user found with this id!' })
            return;
        }
        res.json(data);
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    })
}

};