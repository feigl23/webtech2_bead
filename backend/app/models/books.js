module.exports = mongoose => {

  const Book = mongoose.model(
    "Book", new mongoose.Schema(
      {
        title: String,
        author: String,
        genre: String,
        description: String,
        published: String
      },
      { timestamps: true }
    ));

  return Book;
};