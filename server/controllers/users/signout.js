module.exports = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    maxAge: 1,
  });
  res.status(200).send({ message: 'ok' });
};
