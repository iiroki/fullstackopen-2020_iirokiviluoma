const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
require('dotenv').config()

const Author = require('./models/author')
const Book = require('./models/book')

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
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
    bookCount: Int
  }

  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]
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

      try {
        // Creating new author if the author does not exist yet
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
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    },

    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })

      if (!author) {
        return null
      }

      try {
        const updatedAuthor = await Author.findOneAndUpdate({ name: author.name }, {
          name: args.name,
          born: args.born
        }, { new: true })

        return updatedAuthor
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
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
