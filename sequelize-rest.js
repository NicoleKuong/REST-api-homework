const Sequelize = require("sequelize");

const databaseUrl = "postgres://postgres:5678@localhost:5432/postgres";
const db = new Sequelize(databaseUrl);

const Movie = db.define(
  "movie",
  {
    title: {
      type: Sequelize.TEXT,
      field: "movie_title"
    },

    yearOfRelease: {
      type: Sequelize.INTEGER,
      field: "movie_year"
    },

    synopsis: {
      type: Sequelize.TEXT,
      field: "movie_synopsis"
    }
  },
  {
    tableName: "movie_collections"
  }
);

db.sync()
  .then(() => console.log("Database connected"))
  .then(() =>
    Promise.all([
      Movie.create({
        title: "The Artist",
        yearOfRelease: 2011,
        synopsis:
          "Hollywood, 1927: As silent movie star George Valentin wonders if the arrival of talking pictures will cause him to fade into oblivion, he sparks with Peppy Miller, a young dancer set for a big break."
      }),
      Movie.create({
        title: "A Beautiful Mind",
        yearOfRelease: 2001,
        synopsis:
          "John Nash is a brilliant but asocial mathematician fighting schizophrenia. After he accepts secret work in cryptography, his life takes a turn for the nightmarish."
      }),
      Movie.create({
        title: "Parasite",
        yearOfRelease: 2019,
        synopsis:
          "All unemployed, Ki-taek's family takes peculiar interest in the wealthy and glamorous Parks for their livelihood until they get entangled in an unexpected incident."
      })
    ])
  )
  .catch(console.error);

module.exports = { db, Movie };
