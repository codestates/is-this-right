module.exports = (req, res) => {
  //body title, category, content, userId
  //files postId, url
  const responseData = req.files.map((file) => {
    return `![](${file.location})`;
  });

  res.status(201).json({ data: responseData, message: 'created' });
};
