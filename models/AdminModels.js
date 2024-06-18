const mongoose = require('mongoose');
var mongoosePagination = require('mongoose-paginate');

mongoose.set('debug', false);

const adminSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['superadmin', 'Admin'], required: true, default: 'superadmin' },
    authToken: { type: Array, default: "" },
    profileImage: { type: String, default: "" },
    status: { type: String, enum: ['Inactive', 'Active', 'Delete'], default: 'Active' },
    createDate: { type: Date, defauth: Date.now },
    updateDate: { type: Date, default: Date.now }
});

adminSchema.plugin(mongoosePagination);

module.exports = mongoose.model("Admin", adminSchema);