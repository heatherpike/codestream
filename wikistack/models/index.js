var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/wikistack');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));

var Page, User;
var Schema = mongoose.Schema;

var pageSchema = new Schema({
  title: { type: String, required: true},
  url_name: String,
  owner_id:   String,
  body:   { type: String, required: true},
  date: { type: Date, default: Date.now },
  status: Number
});

// can add method and pre to the schema 
// instead of what we did on the add.js router file
//more elegant solution than putting the function in add.js
// pageSchema.methods.computeURLName = function() {
// 	if (this.title.length > 0) {
// 		this.url_name = this.title.replace(/[\W\s]/g, '_');
// 	}
// };

// pageSchema.pre('save', function(next) {
// 	this.computeURLName();
// next();
// });

var userSchema = new Schema({
  name:  {
      first: { type: String, required: true},
      last: { type: String, required: true}
    },
  email: { type: String, required: true}
});

pageSchema.virtual("full_route").get(function () {
	return "/wiki/" + this.url_name;
});

Page = mongoose.model('Page', pageSchema);
User = mongoose.model('User', userSchema);

module.exports = {Page: Page, User: User};