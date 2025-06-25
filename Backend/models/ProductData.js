const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/ProductDataDB')
.then(()=>{
    console.log("DB connected");
     })
     .catch(err=>console.log(err));
     
const Schema = mongoose.Schema;

var NewPersonSchema = new Schema({
   
    product_name : String,
    product_price : Number,
    product_desc : String
 
   
});

var ProductData = mongoose.model('product', NewPersonSchema);                       

module.exports = ProductData;