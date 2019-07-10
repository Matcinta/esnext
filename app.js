var lg = console.log;

let favoriteCityId = 'rome';

lg(favoriteCityId);

favoriteCityId = 'paris';

lg(favoriteCityId);


const citiesId = ['paris', 'nyc', 'rome', 'rio-de-janeiro'];

lg(citiesId);

// citiesId = [];
// lg(citiesId); citiesId = [];
// ^
// TypeError: Assignment to constant variable.

citiesId.push('tokyo');

lg(citiesId);


function getWeather(cityId) {
       let city = cityId.toUpperCase();
       let temperature = '20';
       return { city, temperature };
};

lg(getWeather('Paris'));

const weather = getWeather(favoriteCityId);
lg(weather);

const { city } = weather;
const { temperature } = weather;

lg(city);
lg(temperature);


// Rest operator

const [parisId, nycId, ...othersCitiesId] = citiesId;

lg(parisId);
lg(nycId);
lg(othersCitiesId.length);

// Classe

class Trip {
       constructor(id, name, imageUrl) {
              this.id = id;
              this.name = name;
              this.imageUrl = imageUrl;
       }

       get price() {
              return this._price;
       }

       set price(newPrice) {
              this._price = newPrice;
       }

       toString() {
              return `Trip [${this.id}, ${this.name}, ${this.imageUrl}, ${this._price}]`;
       }

       static getDefaultTrip() {
              return new Trip('rio-de-janeiro', 'Rio de Janeiro', 'img/rio-de-janeiro.jpg');
       }

}

let parisTrip = new Trip('paris', 'Paris', 'img/paris.jpg');
lg(parisTrip);
lg(parisTrip.name);

parisTrip.price = '100';

lg(parisTrip.toString());

const defaultTrip = Trip.getDefaultTrip();

lg(defaultTrip.toString());


// Heritage

class FreeTrip extends Trip {
       constructor(id, name, imageUrl, price) {
              super(id, name, imageUrl)
              this.price = '0';
       }

       toString() {
              return 'Free' + super.toString();
       }
}


const freeTrip = new FreeTrip('nantes', 'Nantes', 'img/nantes.jpg');
lg(freeTrip.toString());

// Promise, Set, Map, Arrow Function


class TripService {

       constructor() {
              this.trips = new Set();
              this.trips.add(new Trip('paris', 'Paris', 'img/paris.jpg'));
              this.trips.add(new Trip('nantes', 'Nantes', 'img/nantes.jpg'));
              this.trips.add(new Trip('rio-de-janeiro', 'Rio de Janeiro', 'img/rio-de-janeiro.jpg'));
       }

       findByName(tripName) {

              console.log('résultat dans 2 secondes ...');
              return new Promise((resolve, reject) => {
                     setTimeout(() => {
                            for (const trip of this.trips) {
                                   if (trip.name === tripName) {
                                          resolve(trip)
                                   }
                            }
                            reject(`No trip with name ${tripName}`);
                     }, 2000);
              });
       }
}

class PriceService {

       constructor() {
              this.trips = new Map();
              this.trips.set('paris', 100);
              this.trips.set('rio-de-janeiro', 800);

       }

       findPriceByTripId(tripId) {

              return new Promise((resolve, reject) => {

                     setTimeout(() => {
                            const price = this.trips.get(tripId);
                                   if (price) {
                                          resolve(price);
                                   }
                            
                            reject(`No price found for trip id ${tripId}`);
                     }, 2000)
              });
       }
}

const ts = new TripService();

ts.findByName('Paris')
       .then((trip) => {
              lg('Voyage trouvé: ', trip)
       })
       .catch((erreur) => {
              lg(erreur)
       });

ts.findByName('Toulouse')
.then((trip) => {
       lg('Voyage trouvé: ', trip)
})
.catch((erreur) => {
       lg(erreur)
});

// Chainer l'utilisation des services
// TripService et PriceService pour récupérer le prix du voyage 'Rio de Janeiro'.
const ps = new PriceService();

ts.findByName('Rio de Janeiro')
.then(voyage => {
     return ps.findPriceByTripId(voyage.id); 
})
.then((price) => {
       lg('Price found : ', price);
})
.catch((erreur) => {
       lg(erreur);
});

// Chainer l'utilisation des services TripService et
// PriceService pour récupérer le prix du voyage 'Nantes'.

ts.findByName('Nantes')
.then(voyage => {
     return ps.findPriceByTripId(voyage.id); 
})
.then((price) => {
       lg('Price found : ', price);
})
.catch((erreur) => {
       lg(erreur);
});

