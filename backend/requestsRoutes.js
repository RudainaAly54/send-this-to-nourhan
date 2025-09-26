const express = require('express')  //web framework for node js
const database = require('./connect') //custome module that handles mongoDB connections
const ObjectId = require('mongodb').ObjectId // mongo db special ID format for documents
let requestsRoutes = express.Router() //creates router to handle routes separately

// FIVE ESSENTIAL ROUTES (CRUD operations)

//#1 - Retrieve All (Read All) //http://localhost:3000/requests 
requestsRoutes.route("/").get(async (request, response) => {  // ('/requests') = ('/')
   try {
       let db = database.getDb() //get database connection
       let data = await db.collection('requests').find({}).toArray() // find all documents in requets collection (empty filter means everything) then convert monogo cursor to js array
       
// If data exists, return it as JSON
//If no data, return empty array []
//If error occurs, return error message with status 500
       if(data.length > 0){ 
           response.json(data)
       } else{ 
           response.json([]) // Return empty array instead of throwing error
       }
   } catch (error) {
       response.status(500).json({ error: error.message })
   }
}) 

//#2 - Retrieve One (Read One) 
requestsRoutes.route("/:req_id").get(async (request, response) => { 
    try {
        let db = database.getDb()
        // Convert string parameter to number to match database
       let data = await db.collection('requests').findOne({_id: new ObjectId(request.params.req_id)})
        //request.params => gets ID from URL parameter
        //findOne(....) => finds document with matching req_id (string)
         if(data && Object.keys(data).length > 0){ 
            response.json(data)
        } else{ 
            response.status(404).json({ error: 'Data was not found' })
        }
    } catch (error) {
        response.status(500).json({ error: error.message })
    }
    //if found, return the document 
    //if not found, return 404 error
    // if error, return 500 error
})

//#3 - Create One 
requestsRoutes.route("/").post(async (request, response) => {
    try {
        let db = database.getDb()
        //Extract the data from request body
        let newRequest = { 
            user_id: request.body.user_id, 
            center_id: request.body.center_id, 
            material: request.body.material, 
            weight_kg: request.body.weight_kg, 
            status: request.body.status, 
            requested_at: request.body.requested_at || new Date(), 
            completed_at: request.body.completed_at || null
        } 
        let requestResult = await db.collection('requests').insertOne(newRequest) 

        //Create points transaction linked to this request
        let newPoints = {
            req_id: requestResult.insertedId,
            user_id: request.body.user_id,
            trans_date: new Date(),
            type: request.body.type,
            points_earned: request.body.points_earned,
            points_spent: request.body.points_spent
        }

        
    let pointsResult = await db.collection("points").insertOne(newPoints);

        //respond 
        response.json({
            message:'Request and points created successfully',
            requestId: requestResult.insertedId,
            pointsId: pointsResult.insertedId
        })
    } catch (error) {
        response.status(500).json({ error: error.message })
    }
}) 

//#4 - Update One 
requestsRoutes.route("/:req_id").put(async (request, response) => { 
    try {
        let db = database.getDb()
        let mongoObject = { 
            $set: {          // create update object using "$set" operator
                user_id: request.body.user_id, 
                center_id: request.body.center_id, 
                material: request.body.material, 
                weight_kg: request.body.weight_kg, 
                status: request.body.status, 
                requested_at: new Date(), 
                completed_at: request.body.completed_at
            } 
        } 
        // Convert string parameter to number to match database
        let data = await db.collection('requests').updateOne({_id: new ObjectId(request.params.req_id)}, mongoObject)  
        response.json(data) 
      
    } catch (error) {
        response.status(500).json({ error: error.message })
    }
}) 

//#5 - Delete One 
requestsRoutes.route("/:req_id").delete(async (request, response) => { 
    try {
        let db = database.getDb()
        // Convert string parameter to number to match database
        let data = await db.collection('requests').deleteOne({req_id: new ObjectId(request.params.req_id)}) 
        response.json(data) 
    } catch (error) {
        response.status(500).json({ error: error.message })
    }
})

module.exports = requestsRoutes //export to import