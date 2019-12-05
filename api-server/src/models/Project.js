import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;

const ProjectSchema = new mongoose.Schema(
	{
		name: {
			type: String
		},
		description: {
			type: String
		},
		author: {
			type: String
		},
		root: {
			type: ObjectId,
			ref: 'File'
		},
		entry: {
			type: ObjectId,
			ref: 'File'
		}
	},
	{ timestamps: true }
);

export default mongoose.model('Project', ProjectSchema);
