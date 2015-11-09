import CreateUpdateAt from 'mongoose-timestamp';

const Schema = Mongoose.Schema;

var DesignSchema = new Schema({
  uid: String
});

DesignSchema.plugin(CreateUpdateAt);

let Design = Mongoose.model('DiceUser', DesignSchema);

export default DiceUser;
