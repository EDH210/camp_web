const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('good connection')
});

const sample = (array) => {
    return array[Math.floor(Math.random() * array.length)];
}

const seedDB = async() => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random = Math.floor(Math.random() * 1000);
        const price = 100 + Math.floor(Math.random() * 20);
        const camp = new Campground({
            location:  `${cities[random].city}, ${cities[random].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/8510479',
            description: "这就是camp！",
            price: price
        })
        await camp.save();
    }
}

seedDB()
    .then(() => {
        mongoose.connection.close();
    })