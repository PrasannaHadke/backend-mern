    require("dotenv").config();
    const express = require("express");
    const app = express();
    const router = require("./router/auth-router");
    const connectDb = require("./utils/db")


    app.use(express.json())
    app.use("/api/auth", router);

    connectDb().then(()=>{
        app.listen(8000, () => {
            console.log("Server Started at port 8000");
        });

    })

