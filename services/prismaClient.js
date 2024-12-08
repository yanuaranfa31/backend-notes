const { PrismaClient } = require("@prisma/client");
const dotenv = require("dotenv");

dotenv.config();

// Bangun URL koneksi database secara manual
const { HOST, USER, PASSWORD, DATABASE } = process.env;
const databaseUrl = `mysql://${USER}:${PASSWORD}@${HOST}/${DATABASE}`;

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
});

module.exports = prisma;
