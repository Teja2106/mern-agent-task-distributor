import { connectDB } from "./config/db";
import { User } from "./models/user.model";

const seedUser = async () => {
    try {
        await connectDB();

        const existingUser = await User.findOne({ email: process.env.ADMIN_EMAIL });
        if (existingUser) {
            console.log('Admin user already exists.');
            process.exit(0);
        }

        await User.create({
            name: 'Admin',
            email: process.env.ADMIN_EMAIL,
            role: 'admin',
            phone: '1234567890',
            password: process.env.ADMIN_PASSWORD
        });

        console.log('Admin created successfully.');
        process.exit(0);
    } catch (error) {
        console.error('Seeding failed: ', error);
        process.exit(1);
    }
};

seedUser();