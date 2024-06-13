import multer from "multer";

const productStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "src/public/images/products");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix);
    },
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
    ) {
        cb(null, true);
    } else {
        cb(
            new Error(
                "File format not supported. only png, jpg, jpeg supported"
            ),
            false
        );
    }
};
const limits = {
    fileSize: 1024 * 1024 * 3,
};

const upload = multer({ storage: productStorage, fileFilter, limits });

export default upload;
