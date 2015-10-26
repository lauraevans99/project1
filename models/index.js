// requirements
var mongoose = require("mongoose");
var Parent = require("./parent");
var Kid = require("./kid");

// connect to the database
mongoose.connect( process.env.MONGOLAB_URI ||
                  process.env.MONGOHQ_URL || 
                  "mongodb://localhost/perfect_pitch" );

// export parent and kid models
module.exports.Parent = Parent;
module.exports.Kid = Kid;