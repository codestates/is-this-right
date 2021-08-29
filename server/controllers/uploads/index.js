module.exports = (req, res) => {
  console.log('여기입니다.------------------', req.file);
  //body title, category, content, userId
  //files postId, url
  // const responseData = req.files.map((file) => {
  //   return `![](${file.location})`;
  // });
  const responseData = req.file.location;

  // res.status(201).json({ data: responseData, message: 'created' });
  res.status(200).json({ uploaded: true, url: responseData });
  // res.status(500).json({ uploaded: false, error: error });
};
