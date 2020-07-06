const {Station} = require("../../../../models/Station");

const getStations = (req, res, next) => {
  Station.find()
    .then((stations) => {
      res.status(200).json(stations);
    })
    .catch((err) => {
      res.json(err);
    });
};

const getStationsById = (req, res, next) => {
  const {id} = req.params;
  Station.findById(id)
    .then((station) => {
      res.status(200).json(station);
    })
    .catch((err) => {
      res.json(err);
    });
};

const postStation = (req, res, next) => {
  // const name = req.body.name;
  // const address = req.body.address;
  // const province = req.body.province;
  const {name, address, province} = req.body;

  const newStation = new Station({
    name,
    address,
    province,
  });
  newStation
    .save()
    .then((station) => {
      res.status(201).json(station);
    })
    .catch((err) => {
      res.json(err);
    });
};

// replace
const putStation = (req, res, next) => {
  const {id} = req.params;
  Station.findById(id)
    .then((station) => {
      if (!station) return Promise.reject({status: "404", message: "Station not found"});
      // const {name, address, province} = req.body;
      // station.name = name;
      // station.address = address;
      // station.province = province;
      station._doc = {
        ...station._doc,
        ...req.body,
      };

      return station.save();
    })
    .then((station) => {
      res.status(200).json(station);
    })
    .catch((err) => {
      res.json(err);
    });
};

//patch
const patchStationById = (req, res, next) => {
  const {id} = req.params;
  const {name, address, province} = req.body;
  Station.findById(id)
    .then((station) => {
      if (!station) return Promise.reject({status: 404, message: "Station not found"});
      // station.name = name ? name : station.name;
      // if (name) station.name = name;
      // if (address) station.address = address;
      // if (province) station.province = province;

      Object.keys(req.body).forEach((key) => {
        station[key] = req.body[key];
      });

      return station.save();
    })
    .then((station) => {
      res.status(200).json(station);
    })
    .catch((err) => {
      res.json(err);
    });
};
const deleteStationById = (req, res, next) => {
  const {id} = req.params;
  Station.findById(id)
    .then((station) => {
      if (!station) return Promise.reject({status: 404, message: "Station not found"});
      return station.deleteOne({_id: id});
    })
    .then((station) => {
      res.status(201).json(station);
    })
    .catch((err) => {
      res.json(err);
    });
};

//update
const patchStation = (module.exports = {
  getStations,
  postStation,
  getStationsById,
  putStation,
  deleteStationById,
  patchStationById,
});
