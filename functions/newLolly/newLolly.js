const { ApolloServer, gql } = require('apollo-server-lambda')

const faunadb = require("faunadb")
const q = faunadb.query;
const shortId = require("shortid")

const typeDefs = gql`
  type Query {
    lolly: [Lolly]
 }
  type Lolly {
   recepientName: String!
   message: String!
   senderName: String!
   flavourTop: String!
   flavourMiddle: String!
   flavourBottom: String!
   lollyPath: String!
    
  }
type Mutation {
  createLolly(recepientName: String!,message: String!,senderName: String!,flavourTop: String!,flavourMiddle: String!,flavourBottom: String!) : Lolly
}

`


const resolvers = {
  Query: {
    lolly: async (root, args,context) => {
      try {
        var client = new faunadb.Client({ secret: "fnAD5feoHhACAcP-Jl0vt8X3AyDrNUiAMkhNVAVp" });
        var result = await client.query(
          q.Map(
            q.Paginate(q.Match(q.Index("lolly_by_Path"))),
            q.Lambda(x => q.Get(x))
          )
        )
        console.log('result',result.data)
        return result.data.map(d => {
          
          return {
            statuscode: 200,
            body: JSON.stringify({ 
            recepientName: d.data.recepientName,
            message: d.data.message,
            senderName: d.data.senderName,
            flavourTop: d.data.flavourTop,
            flavourMiddle: d.data.flavourMiddle,
            flavourBottom: d.data.flavourBottom,
            lollyPath: d.data.lollyPath
             }),
             }
        })
      } catch (error) {
       console.log('err',error) 
      }
    },},

    Mutation: {
      createLolly: async (_, args) =>{
        const client = new faunadb.Client({secret: "fnAD5feoHhACAcP-Jl0vt8X3AyDrNUiAMkhNVAVp"})
        const id = shortId.generate()
        args.lollyPath = id
        const result = await client.query(
q.Create(q.Collection("lollies"),{
data: args
})

        )
        console.log('result from database',result)
        console.log('result from database with data',result.data)
        return result.data
      },
    }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

exports.handler = server.createHandler()
