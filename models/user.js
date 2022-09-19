const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'role' },
    verified: { type: Number, default: 0 },
    files: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user_storage'
        }
    ]
});

module.exports = mongoose.model('users', UserSchema);