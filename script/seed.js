"use strict";

const {
    db,
    models: { User, Product }
} = require("../server/db");

const products = require("./productsSeed");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */

const users = [
    {
        firstName: "Samer",
        lastName: "Saleh",
        username: "samersaleh",
        address: "123",
        password: "password123",
        email: "samer@example.com",
        isAdmin: true
    },
    {
        firstName: "James",
        lastName: "Bond",
        username: "jamesbond",
        address: "007",
        password: "password007",
        email: "bond@example.com",
        isAdmin: false
    },
    {
        firstName: "admin1",
        lastName: "admin12",
        username: "admin",
        address: "NY",
        password: "123",
        email: "admnin@example.com",
        isAdmin: true
    },
    {
        firstName: "Carl",
        lastName: "Dacota",
        username: "user1",
        address: "NY",
        password: "123",
        email: "cdacota@example.com",
        isAdmin: false
    }
];

async function seed() {
    await db.sync({ force: true }); // clears db and matches models to tables
    console.log("db synced!");

    // Creating Users
    await Promise.all(
        users.map((user) => {
            return User.create(user);
        })
    );

    // POPULATE PRODUCTS
    await Promise.all(
        products.map((product) => {
            return Product.create(product);
        })
    );

    console.log(`seeded ${users.length} users`);
    console.log(`seeded ${products.length} products`);

    console.log(`seeded successfully`);

    return {
        users: {
            cody: users[0],
            murphy: users[1]
        }
    };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
    console.log("seeding...");
    try {
        await seed();
    } catch (err) {
        console.error(err);
        process.exitCode = 1;
    } finally {
        console.log("closing db connection");
        await db.close();
        console.log("db connection closed");
    }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
    runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
