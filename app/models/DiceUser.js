import CreateUpdateAt from 'mongoose-timestamp';

const Schema = Mongoose.Schema;

var DiceUserSchema = new Schema({
  uid: String
});

DiceUserSchema.plugin(CreateUpdateAt);

let DiceUser = Mongoose.model('DiceUser', DiceUserSchema);

export default DiceUser;
