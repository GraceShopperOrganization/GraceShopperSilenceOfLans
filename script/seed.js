"use strict";

const {
    db,
    models: { User, Product }
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */

const products = [
    {
        productName: "Chinese Elm",
        description:
            "Characterized by its leaf shape and trunk structure, the Chinese Elm Bonsai tree is a perfect addition of style and grace to any coffee table. Pruning the Chinese Elm Bonsai tree will continually produce fresh leaves to any shape you choose.",
        imageUrl:
            "https://www.easternleaf.com/v/vspfiles/photos/800510-03-2T.jpg?v-cache=1474386133",
        price: 50,
        inventory: 5,
        category: "bonsai"
    },
    {
        productName: "Satsuki Azalea",
        description:
            "This flowering bonsai produces blooms during the spring and possibly during the fall with the proper care. It's blush (pink) blooms can add a refreshing touch to a room looking for natural color.",
        imageUrl:
            "https://www.easternleaf.com/v/vspfiles/photos/801460-03-2T.jpg?v-cache=1474457230",
        price: 40,
        inventory: 4,
        category: "bonsai"
    }
];

async function seed() {
    await db.sync({ force: true }); // clears db and matches models to tables
    console.log("db synced!");

    // Creating Users
    const users = await Promise.all([
        User.create({ username: "cody", password: "123" }),
        User.create({ username: "murphy", password: "123" })
    ]);

    // POPULATE PRODUCTS
    await Promise.all(
        products.map((product) => {
            return Product.create(product);
        })
    );

    console.log(`seeded ${users.length} users`);
    console.log(`seeded ${users.length} users`);

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
