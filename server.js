const express = require("express");
const app = express();

const youtubeMp3Converter = require('youtube-mp3-converter');

const convertLinkToMp3 = youtubeMp3Converter(__dirname + "/dist/vids");

const fs = require("fs");

const port = 3000;

app.use(express.static("dist"));
app.use(express.json());

app.get("/", (req, res) => res.sendFile(__dirname + "/public/index.html"));

app.post("/download-video", async (req, res) => {
    fs.readdir(__dirname + "/dist/vids", (err, files) => {
        if (err) {
            console.error(err);
        }
        files.forEach((file) => {
            fs.rm(__dirname + "/dist/vids/" + file, (err) => {
                if (err) console.error(err);
            });
        })
    })

    const date = new Date();
    console.log(`[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]: Downloading Video ` + req.body.url);
    
    const pathToMp3 = await convertLinkToMp3(req.body.url, {
        title: crypto.randomUUID()
    });

    res.json({ url: pathToMp3.replace(__dirname, "") });
})

app.listen(port, console.log(`Server listening on port ${port}`));