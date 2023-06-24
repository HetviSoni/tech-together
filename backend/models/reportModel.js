const mongoose = require('mongoose');

const incidentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  whoDid: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

const Incident = mongoose.model('Incident', incidentSchema);

module.exports = Incident;
