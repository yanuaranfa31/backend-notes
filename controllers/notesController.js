const prisma = require("../services/prismaClient");

exports.createNote = async (req, res) => {
  try {
    const { title, datetime, note } = req.body;

    if (isNaN(new Date(datetime))) {
      return res.status(400).json({ message: "Invalid datetime format" });
    }

    const newNote = await prisma.note.create({
      data: {
        title,
        datetime: new Date(datetime),
        note,
      },
    });

    res.status(201).json({
      status: "success",
      code: 201,
      message: "Note created successfully",
      data: {
        ...newNote,
        id: newNote.id.toString(),
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Failed to create note",
      error: error.message,
    });
  }
};

exports.getAllNotes = async (req, res) => {
  try {
    const notes = await prisma.note.findMany();

    const notesWithStringIds = notes.map((note) => ({
      ...note,
      id: note.id.toString(),
    }));

    res.status(200).json({
      status: "success",
      code: 200,
      message: "Notes fetched successfully",
      data: notesWithStringIds,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Failed to get notes",
      error: error.message,
    });
  }
};

exports.getNoteById = async (req, res) => {
  const { id } = req.params;

  try {
    const note = await prisma.note.findUnique({
      where: { id: BigInt(id) },
    });

    if (!note) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Note not found",
      });
    }

    res.status(200).json({
      status: "success",
      code: 200,
      message: "Note fetched successfully",
      data: {
        ...note,
        id: note.id.toString(),
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Failed to get note",
      error: error.message,
    });
  }
};

exports.updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, datetime, note } = req.body;

  try {
    const noteId = BigInt(id);

    const updatedNote = await prisma.note.update({
      where: { id: noteId },
      data: {
        title,
        datetime: new Date(datetime),
        note,
      },
    });

    res.status(200).json({
      status: "success",
      code: 200,
      message: "Note updated successfully",
      data: {
        ...updatedNote,
        id: updatedNote.id.toString(),
      },
    });
  } catch (error) {
    // Tangani error konversi BigInt atau error lainnya
    if (error) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "Invalid ID format",
      });
    }

    // Tangani error lainnya
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Failed to update note",
      error: error.message,
    });
  }
};

exports.deleteNote = async (req, res) => {
  const { id } = req.params;

  try {
    const noteId = BigInt(id);

    await prisma.note.delete({
      where: { id: noteId },
    });
    res.status(200).json({
      status: "success",
      code: 200,
      message: "Note deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "Invalid ID format"
    });
  }
};
