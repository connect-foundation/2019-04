import mongoose from 'mongoose';

const FileSchema = new mongoose.Schema(
	{
		name: {
			type: String
		},
		type: {
			type: String
		}
	},
	{ timestamps: true }
);

export default mongoose.model('File', FileSchema);
