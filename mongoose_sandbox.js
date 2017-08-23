/**
 * Created by jaeyoung on 8/22/17.
 */
'use strict';

var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/sandbox",
  {
    useMongoClient: true
    /* other options */
  }
);

var db = mongoose.connection;

db.on("error", function(err) {
  console.error("connection error:", err);
});

db.once("open", function() {
  console.log("db connection successful");
  // All database communication goes here

  var Schema = mongoose.Schema;
  var AnimalSchema = new Schema({
    type: {type: String, default: "goldfish"},
    size: String,
    color: {type: String, default: "golden"},
    mass: {type: Number, default: 0.007},
    name: {type: String, default: "Angela"}
  });

  AnimalSchema.pre("save", function (next) {
    if (this.mass >= 100) {
      this.size = "big";
    } else if (this.mass >= 5 && this.mass < 100) {
      this.size = "medium";
    } else {
      this.size = "small";
    }

    next();
  });

  AnimalSchema.statics.findSize = function (size, callback) {
    // this == Animal Model
    return this.find({size: size}, callback);
  };

  AnimalSchema.methods.findSameColor = function (callback) {
    // this == document
    return this.model("Animal").find({color: this.color}, callback);
  };

  var Animal = mongoose.model("Animal", AnimalSchema);

  var elephant = new Animal({
    type: "elephant",
    color: "gray",
    mass: 6000,
    name: "Lawrence"
  });

  var animal = new Animal({}); // Goldfish

  var whale = new Animal({
    type: "whale",
    mass: 190500,
    name: "Fig"
  });

  var animalData = [
    {
      type: 'mouse',
      color: "gray",
      mass: 0.035,
      name: "Marvin"
    },
    {
      type: 'nutria',
      color: "brown",
      mass: 6.35,
      name: "Gretchen"
    },
    {
      type: 'wolf',
      color: "gray",
      mass: 45,
      name: "Iris"
    },
    elephant,
    animal,
    whale
  ];

  // -> 콜백지옥 지우기위해서는 Promise필요 https://teamtreehouse.com/library/understanding-promises-in-javascript
  // remove All documents
  var newAnimal = new Animal({
    type: 'elephant2',
    color: "gray",
    mass: 50000.035,
    name: "ele2"
  });



  var removePromise = new Promise(function (resolve, reject) {
    console.log("1. Animal.remove");
    Animal.remove({}, function () {
      console.log("1. Animal.remove resolved");
      resolve();
    });
    console.log("1. Animal.remove pending");
  });


  var createPromise = new Promise(function (resolve, reject) {
    console.log("2. Animal.create");
    Animal.create(animalData, function (err) {
      if (err) {
        reject(err);
        // console.error("Save Failed.", err);
      }
      else {
        console.log("2. Animal.create resolved");
        resolve();
      }
    });
    console.log("2. Animal.create pending");
  });

  function newElephant() {
    console.log("3. newElephant");
    newAnimal.save(function (err, instance) {
      if (err) console.error("Save Failed.", err);
      else {
        console.log("3. newElephant resolved");
      }
    });
    console.log("3. newElephant pending");
  }

  function findElephant() {
    console.log("4. Animal.findOne");
    Animal.findOne({type: "elephant"}, function (err, elephant) {
      console.log("4. Animal.findOne resolved");
      // 아마 이걸 next(elephant)같은것으로 바꿔야해결될듯.
      return elephant;
    });
    console.log("4. Animal.findOne Pending");
  }

  function findSameColorWithElephant(elephant) {
    console.log("5. findSameColorWithElephant");
    elephant.findSameColor(function (err, animals) {
      console.log("5. findSameColorWithElephant resolved");
      return animals;
    });
    console.log("5. findSameColorWithElephant pending");
  }

  function printAnimals(animals) {
    console.log("5. printAnimals");
    animals.forEach(function (animal) {
      console.log("5. printAnimals resolved");
      console.log(animal.name + " the " + animal.color + " " + animal.type + " is a " + animal.size + "-sized animal.");
    });
    console.log("5. printAnimals pending");
  }

  function closeDb() {
    console.log("6. closeDb");
    db.close(function () {
      console.log("6. closeDb resolved");

      console.log("db connection closed");
    });
    console.log("6. closeDb pending");
  }

  removePromise.then(createPromise);
    // .then(newElephant)
    // .then(findElephant)
    // .then(findSameColorWithElephant)
    // .then(printAnimals)
    // .then(closeDb);
});