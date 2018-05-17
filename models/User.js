const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const passportLocalMongoose = require('passport-local-mongoose');

autoIncrement.initialize(mongoose.connection);

mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var slug = require('slug');



const userSchema = new Schema({

  id : { type: Number, default: 0 },
  first_name: String,
  last_name: String,
  slug : String,
  avatar: String,

  address: String,
  city: String,
  state: String,
  zipcode: String,

  phone: String,
  about: String,
  email: String,

  password: String,
  role: String,

  creditcardNos : String,
  expiry : String,

   created_at: { type: Date, default: Date.now },


  transaction : [{ type: Schema.Types.ObjectId, ref: 'Transaction' }],

});



userSchema.plugin(autoIncrement.plugin, { model : 'User' , field: 'id' });
userSchema.plugin(passportLocalMongoose, {  usernameField : 'email' , hashField : 'password' });

userSchema.pre('save',function(next){

    var obj = this;
    this.slug = slug(this.first_name+"-"+this.last_name).toLowerCase();

    User.find()
    .where('first_name').equals(this.first_name)
    .where('last_name').equals(this.last_name)
    .exec(function(err, entities) {



              if(entities.length > 0)
                  obj.slug = obj.slug+'-'+entities.length;

              // console.log('count => '+entities.length,obj.slug);
              next();

      })


});

const User = mongoose.model('User',userSchema);


module.exports = User;
