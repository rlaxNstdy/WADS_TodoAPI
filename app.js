const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const taskRoutes = require('./routes/tasks');
const swaggerDocs = require('./swagger');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/tasks', taskRoutes);
swaggerDocs(app);

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  }))
  .catch((err) => console.error(err));
