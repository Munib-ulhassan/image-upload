const multer = require('multer');
const express = require('express');
const fs = require('fs');
const app = express();
var cors = require('cors');
app.use(cors());

app.use("/uploads", express.static(__dirname + "/uploads"));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // console.log(file)
        // console.log(req)

        // const isValid = FILE_TYPE_MAP[file.mimetype];
        // let uploadError = new Error('invalid voice type');

        // if (isValid) {
        //     uploadError = null;
        // }
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        console.log(file)
        const fileName = file.originalname.split(' ').join('-');
        cb(null, `${fileName}`);
    }
});
const upload = multer({ storage: storage });

app.post('/image',upload.array('file'), (req, res) => {
    const files = req.files;
    
    const basePath = `http://${req.get('host')}/uploads/`;
    let imagePaths = [];

    if (files) {
        files.map((file) => {
            imagePaths.push(`${basePath}${file.filename}`);

        });
    }
    console.log(imagePaths)
    res.status(200).json({status:1,imagePaths})
})
app.delete("/image/:id",(req,res)=>{
    const {id} = req.params
    
    fs.unlinkSync(`./uploads/${id}`)
    res.status(200).json({status:1})

})
app.listen(3030, () => {
    console.log('server is running on 4021 port')
 
})
