import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		index: true
	},
	projectIds: [
		{
			type: ObjectId,
			ref: 'Project'
		}
	]
});

export default mongoose.model('User', UserSchema);
