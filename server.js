const express = require("express");
const app = express();
const notesRoutes = require("./routes/notesRoutes"); // pastikan pathnya benar

app.use(express.json()); // untuk menangani JSON body

// Daftarkan routes
app.use("/api/notes", notesRoutes);

// Mulai server
const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
