const mongoose = require('mongoose');
let userSchema = mongoose.Schema({
   name: {
      type: String,
      require: true
   },
   password: {
      type: String,
      minlength: 6,
   },
   tasks: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Task' }
   ]
})
module.exports = mongoose.model('User', userSchema);
