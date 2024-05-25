import express from 'express';
import pino, { transport } from 'pino';

const app = express();
// app.use(pino(
//   {
//     transport:{
//       target: 'pino-pretty',}}

// )),(req, res) => {
//   console.log(req.body);
// };


app.get('/', (req, res) => {
  res.json({
    message: 'Hello, World!'
  });
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});