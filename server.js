const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Connect MongoDB (replace with your Atlas string)
mongoose.connect("mongodb+srv://<username>:<password>@cluster0.mongodb.net/carbookings?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("MongoDB Error: " + err));

// Booking model
const bookingSchema = new mongoose.Schema({
  carBrand: String,
  service: String,
  date: String
});
const Booking = mongoose.model("Booking", bookingSchema);

// Route to save booking
app.post("/book", async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    res.json({ message: "Booking confirmed!" });
  } catch (error) {
    res.status(500).json({ message: "Error: " + error });
  }
});

app.listen(port, () => console.log(`Server on port ${port}`));