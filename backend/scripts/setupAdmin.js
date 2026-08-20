const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '../.env') });
const User = require('../src/models/User');

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@techmart.lk';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'TechMart@2026';

async function setupAdmin() {
  if (!process.env.MONGO_URI) throw new Error('MONGO_URI is not configured in backend/.env');
  await mongoose.connect(process.env.MONGO_URI);

  const migration = await User.updateMany(
    { role: { $in: ['customer', 'seller'] } },
    { $set: { role: 'user' } }
  );

  let admin = await User.findOne({ email: ADMIN_EMAIL }).select('+password');
  if (admin) {
    admin.name = 'TechMart Administrator';
    admin.role = 'admin';
    admin.password = ADMIN_PASSWORD;
    await admin.save();
  } else {
    admin = await User.create({ name: 'TechMart Administrator', email: ADMIN_EMAIL, password: ADMIN_PASSWORD, role: 'admin', isVerified: true });
  }

  console.log(`Admin account ready: ${admin.email}`);
  console.log(`Migrated ${migration.modifiedCount} legacy account(s) to role=user.`);
  await mongoose.disconnect();
}

setupAdmin().catch(async (error) => {
  console.error(`Admin setup failed: ${error.message}`);
  await mongoose.disconnect();
  process.exit(1);
});
