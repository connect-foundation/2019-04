import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;

const FileSchema = new mongoose.Schema(
	{
		name: {
			type: String
		},
		type: {
			type: String
		},
		contents: {
			type: String
		},
		projectId: {
			type: ObjectId
		},
		child: [
			{
				type: ObjectId,
				ref: 'File'
			}
		]
	},
	{ timestamps: true }
);

export default mongoose.model('File', FileSchema);
