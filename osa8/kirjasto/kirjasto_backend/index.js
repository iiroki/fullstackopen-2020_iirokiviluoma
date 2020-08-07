const { ApolloServer, gql } = require('apollo-server')
const mongoose = require('mongoose')
const { v1: uuidv1 } = require('uuid')
require('dotenv').config()

const Author = require('./models/author')
const Book = require('./models/book')

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
.then(() => {
  console.log('Connected to MongoDB.')
}) .catch((error) => {
  console.log(`Error connecting to MongoDB: ${error.message}`)
})

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int
  }

  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]
    ): Book
    editAuthor(
      name: String!
      born: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: () => Book.find({}),
    allAuthors: () => Author.find({})
  },
  Author: {
    bookCount: (root) => Book.collection.countDocuments({ author: root._id })
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author })

      if (!author) {
        const newAuthor = new Author({
          name: args.author
        })

        author = await newAuthor.save()
      }

      console.log(author)

      const newBook = new Book({
        title: args.title,
        author: author._id.toString(),
        published: args.published,
        genres: args.genres
      })

      const book = await newBook.save()
      console.log(book)
      return book
    },

    editAuthor: (root, args) => {
      // TBD
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
