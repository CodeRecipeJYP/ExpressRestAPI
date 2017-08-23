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



    Animal.remove({}, function () {
        Animal.create(animalData, function (err) {
            if (err) console.error("Save Failed.", err);
            else console.log("1. elephant create success");
            newAnimal.save(function (err, instance) {
                if (err) console.error("Save Failed.", err);
                else console.log("2. elephant new success");

                db.close(function () {
                    console.log("3. db connection closed");
                });
            });
        });
    });
});