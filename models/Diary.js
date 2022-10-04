/**Now that we successfully connected to our DB, we need to store our data in the DB.
 * Before we start storing our data, we need to let the db know how our data will me structured/stored.
 * For us to do that we need to create a schema.
 * and we need the help of moongoose in order to create a mogoose schema
 */
const mongoose = require('mongoose');

//creating a new schema from mongoose.Schema
const diarySchema = new mongoose.Schema({
//Here we specify what we are storing in our DB
/** for us we are storing the:
 * -title
 * -description
 * -date
 */
          title:{
            type:String,
            required:true 
          },
          description:{
            type:String,
            required:true
          },
          date:{
            type:Date,
            required:true
          }

});

/**Now that we have created our schema, we need to create our model.
 * what model does is it helps us interact with the db.
 * The model method requires two parameters;
 * 1. the model name
 * 2. the schema
 * 
 * then we export our model method to app.js
 */
module.exports = mongoose.model('Diary', diarySchema);
