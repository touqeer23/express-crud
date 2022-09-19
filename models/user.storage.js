const mongoose = require('mongoose');

const UserStorageSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    url: { type: String, required: true }
});

module.exports = mongoose.model('user_storage', UserStorageSchema);