import CreateUpdateAt from 'mongoose-timestamp';

const Schema = Mongoose.Schema;

var DiceUserSchema = new Schema({
  uid: {
    type: String,
    unique: true
  }
});

DiceUserSchema.plugin(CreateUpdateAt);

let DiceUser = Mongoose.model('DiceUser', DiceUserSchema);

export default DiceUser;
