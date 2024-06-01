//Функція обробки помилок у разі відсутності маршруту
const notFoundMiddleware = (req, res) => {
    res.status(404).send('Oops! Route was not found!');
  };