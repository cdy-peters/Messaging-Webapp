const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
    {
        recipients: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        messages: [
            {
                sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
                message: { type: String },
                date: { type: Date, default: Date.now },
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Conversation", conversationSchema);