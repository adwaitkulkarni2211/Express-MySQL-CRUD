const express = require("express");
const app = express();
const cors = require("cors");
const {createField, readField, updateField, deleteField} = require("./crud");


app.use(cors());
app.use(express.json())

//create
app.post("/create", createField);
//read
app.get("/read", readField);
//update
app.put("/update", updateField);
//delete
app.delete("/delete", deleteField)


const port = 8000;
app.listen(port, () => {
    console.log(`App running on port ${port}`);
})
