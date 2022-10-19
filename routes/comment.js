const express = require("express");
const { getAllComments, getSoloComment, deleteSoloComment, updateSoloComment, createNewComment } = require("../controllers/comment");
const commentRoutes = express();

commentRoutes.get("/", getAllComments);
commentRoutes.get("/:commentId", getSoloComment);
commentRoutes.delete("/:commentId", deleteSoloComment);
commentRoutes.put("/:commentId", updateSoloComment);
commentRoutes.post("/:commentId", createNewComment);

module.exports = commentRoutes