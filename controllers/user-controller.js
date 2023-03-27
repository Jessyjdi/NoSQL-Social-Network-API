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
  deleteUser(req, res) {
    User.findOneAndDelete({  _id: req.params.userId })
    .then(user => {
        if (!user) {
            res.status(404).json({ message: 'No user found with this id!' })
            return;
        }
        res.json({message: "User deleted!"});
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    })
},
// Update User
updateUser(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId },{ $set: req.body }, { new: true, runValidators: true })
    .then(user => {
        if (!user) {
            res.status(404).json({ message: 'No user found with this id!' })
            return;
        }
        res.json({message: "User updated!"});
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    })
},

// Add Friend
addFriend(req, res) {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId }},
        { new: true, runValidators: true })
    .then(user => {
        if (!user) {
            res.status(404).json({ message: 'No user found with this id!' })
            return;
        }
        res.json(user);
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    })
},

// Remove Friend
removeFriend(req, res) {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId }},
        { new: true })
    .then(user => {
        if (!user) {
            res.status(404).json({ message: 'No user found with this id!' })
            return;
        }
        res.json(user);
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    })
}

};