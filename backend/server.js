const express = require('express');
const cors = require('cors');
require('dotenv').config();
const supabase = require('./config/supabase');
const appointmentRoutes = require('./routes/appointment.routes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/appointments', appointmentRoutes);

app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'BookEase API Running'
  });
});

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'BookEase API Running'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
