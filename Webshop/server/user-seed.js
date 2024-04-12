// user-seed.js

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const { User } = require("./models");

const seedAdminUser = async () => {
  try {
    const existingAdmin = await User.findOne({
      where: { email: "admin@admin.com" },
    });
    if (existingAdmin) {
      console.log("Admin user already exists.");
      return;
    }

    await User.create({
      first_name: "Admin",
      last_name: "User",
      email: "admin@admin.com",
      password: "Admin@12345",
      role: "admin",
    });

    console.log("Admin user created successfully.");
  } catch (error) {
    console.error("Error seeding admin user:", error);
  }
};

seedAdminUser();
