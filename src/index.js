import app from "./app.js";
import connectToDB from "./config/connectToDB.js";

const port = process.env.PORT || 4000;

app.listen(port, async () => {
    console.log(`Server is running on http://localhost:${port}`);
    await connectToDB();
});
