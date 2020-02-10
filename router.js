const { Router } = require("express");

const { Movie } = require("./sequelize-rest");

const router = new Router();

router.post("/movies", (req, res, next) => {
  Movie.create(req.body)
    .then(movie => res.json(movie))
    .catch(error => next(error));
});

router.get("/movies", (req, res, next) => {
  const limit = req.query.limit || 12;
  const offset = req.query.offset || 0;
  Movie.findAndCountAll({ limit, offset })
    .then(list => res.send({ movies: list.rows, total: list.count }))
    .catch(err => next(err));
});

router.get("/movies/:id", (req, res, next) => {
  const movieId = parseInt(req.params.id);
  Movie.findByPk(movieId)
    .then(movie => {
      if (movie) {
        res.json(movie);
      } else {
        res.status(404).send("Movie not found!");
      }
    })
    .catch(error => next(error));
});

router.put("/movies/:id", (req, res, next) => {
  const movieId = parseInt(req.params.id);
  Movie.findByPk(movieId)
    .then(movie => movie.update(req.body))
    .then(movie => {
      if (movie) {
        res.send(movie);
      } else {
        res.status(404).end();
      }
    })
    .catch(error => next(error));
});

router.delete("/movies/:id", (req, res, next) => {
  const movieId = parseInt(req.params.id);
  Movie.destroy({ where: { id: movieId } })
    .then(number => {
      if (number) {
        res.send({ number });
      } else {
        res.status(404).end();
      }
    })
    .catch(error => next(error));
});

module.exports = router;
