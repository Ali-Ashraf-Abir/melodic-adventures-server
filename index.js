const express= require('express')

const cors = require('cors');

const app=express()
require ('dotenv').config()

const port =process.env.PORT || 5000;

app.use(cors())

app.use(express.json())


const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ravtcpm.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    const database = client.db("MelodicAdventures");
    const userCollection = database.collection("users");
    const classCollection = database.collection("classes");
    app.post("/users",async (req,res)=>{

        const body=req.body;
        console.log(body)
        const result = await userCollection.insertOne(body)
        res.send()
  
      })

      app.post("/classes",async (req,res)=>{

        const body=req.body;
        console.log(body)
        const result = await classCollection.insertOne(body)
        res.send()
  
      })

    app.get ('/allusers',async (req,res)=>{

        const cursor = userCollection.find().toArray();
        const result = await cursor;
        res.send(result)

    })

    app.get ('/currentuser/:email',async(req,res)=>{

        const email=req.params.email;
        console.log(email)
        const result = await userCollection.find({email : email}).toArray()
        res.send(result)


    })

  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);






app.get('/',(req,res)=>{
    res.send("simple crud is running")
})


app.listen(port,()=>{
    console.log('server is running on port 5000')
})