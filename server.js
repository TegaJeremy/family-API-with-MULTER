//const app = require( './app' );


const express = require("express")
const familyDB = require("./config/familyDB")
const router = require("./Routs/familyRouter")
const PORT = 1717

const app = express()
app.use(express.json())
app.use('/api', router)
app.use("/upload", express.static("upload"))





app.listen( PORT, () => {
    console.log(`Server is listening to port: ${PORT}`);
})//