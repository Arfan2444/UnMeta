import "dotenv/config";

import mongoose from "mongoose";
import { connectDb } from "../lib/db.js";
import User from "../models/user.model.js";
import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const seedUsers = [
  ["Janice Dsouza", "Janice Dsouza", "mehulkatwe@example.com", "https://i.pravatar.cc/150?img=36"],
  ["Rayan Gonsalves", "Rayan Gonsalves", "rafan@example.com", "https://i.pravatar.cc/150?img=33"],
  ["Rachel Cardoz", "Aditya Lakifangal", "aditya@example.com", "https://i.pravatar.cc/150?img=32"]
];

async function seedDatabase() {
  await connectDb();

  const result = await User.bulkWrite(
    seedUsers.map(([clerkId, fullName, email, profilePic]) => ({
      updateOne: {
        filter: { clerkId },
        update: {
          $set: { clerkId, fullName, email, profilePic },
        },
        upsert: true,
      },
    })),
  );

  console.log(
    `Seeded users. Inserted: ${result.upsertedCount}, updated: ${result.modifiedCount}, matched: ${result.matchedCount}`,
  );
}

seedDatabase()
  .catch((error) => {
    console.error("Failed to seed users:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.connection.close();
  });