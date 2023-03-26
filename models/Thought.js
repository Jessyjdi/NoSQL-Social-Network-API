const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// schema for reactions
const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: val => dateFormat(val)
    }
},
{
    toJSON: {
        getters: true
    },
    id: false
})

// schema for thoughts
const ThoughtSchema = new Schema({
    thoughtText : {
        type: String,
        required: true,
        validate: /.{1,280}/
    },
    createdAt : {
        type: Date,
        default: Date.now,
        get: val => dateFormat(val)
    },
    username: {
        type: String,
        required: true
    },
    reactions: [ReactionSchema]
},
{
    toJSON: {
        getters: true,
        virtuals: true
    },
    id: false
})

const Thought = model('Thought', ThoughtSchema);

// set field for reaction count
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
})

module.exports = Thought;