const express = require('express');

const app = express();
const cors = require('cors');


app.use(express.json());
app.use(cors());

const db = require('./models');

// Routers
const postRouter = require('./routes/Posts');
app.use("/posts", postRouter);
db.sequelize.sync()
  .then(() => {
    console.log('Database synced successfully.');

    // Start the server after syncing
    app.listen(3001, () => {
      console.log("Server is running on port 3001");
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

