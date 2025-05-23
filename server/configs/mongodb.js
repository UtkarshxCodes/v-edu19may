import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.set('debug', true);
        mongoose.connection.on('connected', () => console.log('Database Connected'));
        await mongoose.connect(process.env.MONGODB_URI);
    } catch (error) {
        console.error('MongoDB Connection Error:', error.message);
        process.exit(1); // Exit the process with failure
    }
};

export default connectDB;