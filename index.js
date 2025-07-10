import express from "express";
import multer from "multer";
import {__dirname,tempDir,uploadToCloudinary} from "./cloudinary.js";
import ejs from "ejs"
import path from "path"

const app = express();

const storage = multer.diskStorage({
  destination:(req,res,cb)=>cb(null,tempDir),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
})

const upload = multer({storage})

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('upload', { imageUrl: null });
});

app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const filePath = req.file.path;
    const imageUrl = await uploadToCloudinary(filePath);
    res.render("upload", { imageUrl }); // show image on page
  } catch (err) {
    res.status(500).send("Upload failed: " + err.message);
  }
});

app.listen(process.env.PORT,()=>console.log("Listening..."));
