const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(express.json());

const db = require('./models')

// Routers
const customerRouter = require('./routes/web');
app.use("/customer", customerRouter);
db.sequelize.sync()
  .then(() => {
    console.log('Database synced successfully.');

    // Start the server after syncing
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });
  


// app.use(cors());
// app.use(express.json());

// app.get('/', (req, res) => {
//     res.send('Welcome to the Node.js Backend!');
// });

