let express = require("express");
let dotenv = require("dotenv");
let cors = require("cors");
let mongoose = require("mongoose");
const MoviesList = require("./Schema/MovieSchema");
let dbUrl =
  "<Enter the DB URL to run>";

let app = express();
app.use(cors());
app.use(express.json());
dotenv.config();
let PORT = process.env.PORT;
app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  }
  console.log(PORT);
  console.log("Server started successfully at port " + PORT);
});
mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("connected to db");
  })
  .catch((e) => {
    console.log("error");
  });

// Api to get movies
app.get("/getmovies", async (req, res) => {
  try {
    const movies = await MoviesList.find({});
    if (movies) {
      res.status(200).send(movies);
    } else {
      res.status(200).send("Movies not found.");
    }
  } catch (e) {
    res.status(500).send("Some error occurred.");
  }
});

// Api to get movie based on id
app.get("/getsinglemovie", async (req, res) => {
  const { id } = req.body;
  try {
    const movie = await MoviesList.findOne({ _id: id });
    if (movie) {
      res.status(200).send(movie);
    } else {
      res.status(200).send("Movie not found.");
    }
  } catch (e) {
    res.status(500).send("Some error occurred.");
  }
});

// Api to delete a movie
app.delete("/deletemovie", async (req, res) => {
  const { id } = req.body;
  try {
    const isDeleted = await MoviesList.deleteOne({ _id: id });
    if (isDeleted.deletedCount == 1) {
      console.log(isDeleted);
      res.status(200).send("Movie deleted successfully!");
    } else if (isDeleted.deletedCount == 0) {
      res.status(200).send("No movie found with the entered id.");
    }
  } catch (e) {
    res.status(500).send("Some error occurred.");
  }
});

// Api to update a movie
app.put("/updatemovie", async (req, res) => {
  const { id, title, year, desc } = req.body;
  try {
    const update = await MoviesList.findOneAndUpdate(
      { _id: id },
      {
        title: title,
        year: year,
        desc: desc,
      }
    );
    if (update) {
      res.status(200).send("Movie updated successfully. An updated movie is "+update);
    }
    else {
      res.status(200).send("Movie does not exists.")
    }
  } catch (e) {
    res.status(500).send("Some error occurred.");
  }
});

//  Api to add movie
app.post("/addmovie", async (req, res) => {
  const { title, year, desc } = req.body;
  const Movie = new MoviesList({ title: title, year: year, desc: desc });
  try {
    const movieAdded = await Movie.save();
    if (movieAdded) {
      res.status(200).send("Movie added successfully.");
    }
  } catch (e) {
    res.status(500).send("Some error occured, movie not added to the database.");
  }
});

// Api to search movie by name
app.get("/searchmovie", async (req, res) => {
  const {title}= req.body;
  try {
    const movie = await MoviesList.find({title: title});
    if (movie) {
      res.status(200).send("Movies found:" + movie);
    } else {
      res.status(200).send("Movies not found.");
    }
  } catch (e) {
    res.status(500).send("Some error occurred.");
  }
})
