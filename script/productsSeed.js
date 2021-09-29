const products = [
  {
    productName: "Chinese Elm",
    description:
      "Characterized by its leaf shape and trunk structure, the Chinese Elm Bonsai tree is a perfect addition of style and grace to any coffee table. Pruning the Chinese Elm Bonsai tree will continually produce fresh leaves to any shape you choose.",
    imageUrl:
      "https://www.easternleaf.com/v/vspfiles/photos/800510-03-2T.jpg?v-cache=1474386133",
    price: 5900,
    inventory: 5,
    category: "bonsai",
  },
  {
    productName: "Satsuki Azalea",
    description:
      "This flowering bonsai produces blooms during the spring and possibly during the fall with the proper care. It's blush (pink) blooms can add a refreshing touch to a room looking for natural color.",
    imageUrl:
      "https://www.easternleaf.com/v/vspfiles/photos/801460-03-2T.jpg?v-cache=1474457230",
    price: 3900,
    inventory: 4,
    category: "bonsai",
  },
  {
    productName: "Boxwood",
    description:
      "The Boxwoods tiny leathery leaves, dense growth habits and rough bark make it a good bonsai tree subject.  Since it needs minimal sunlight, the boxwood bonsai tree is perfect for an indoor environment such as your home or office.",
    imageUrl:
      "https://www.easternleaf.com/v/vspfiles/photos/800620-03-2T.jpg?v-cache=1617296371",
    price: 4900,
    inventory: 9,
    category: "bonsai",
  },
  {
    productName: "Miniature Boxwood",
    description:
      "Bonsai, which translates to 'tree in a pot' originated from China and Japan. It's tiny leathery leaves, dense growth habits and rough bark make it a good bonsai tree subject. Since the tree is resilient to different lighting conditions, the boxwood bonsai tree is perfect for both indoor and outdoor environments. Bonsai tree measures between 8'' to 10'' tall potted, and arrives in a 6 pot. Pot may vary depending on availability.",
    imageUrl:
      "https://www.easternleaf.com/v/vspfiles/photos/804550-03-2T.jpg?v-cache=1515754376",
    price: 2900,
    inventory: 11,
    category: "bonsai",
  },
  {
    productName: "Large Chinese Elm Bonsai",
    description:
      "Characterized by its leaf shape and stem development, the Chinese Elm Bonsai tree is a perfect addition of style and grace to any coffee table. Pruning the Chinese Elm Bonsai tree will continually produce fresh leaves to any shape you choose.",
    imageUrl:
      "https://www.easternleaf.com/v/vspfiles/photos/801970-03-2T.jpg?v-cache=1474386688",
    price: 9900,
    inventory: 2,
    category: "bonsai",
  },
  {
    productName: "Miniature Golden Gate Ficus",
    description:
      "This beautiful miniature Golden Gate ficus bonsai tree is actually not as difficult to take care of as one may think. Like many ficus bonsai trees, the Golden Gate Ficus Bonsai Tree or Taiwan Ficus Bonsai Tree can be kept both indoors and outdoors, and is also one of the most hardy species.",
    imageUrl:
      "https://www.easternleaf.com/v/vspfiles/photos/801620-03-2T.jpg?v-cache=1474469311",
    price: 4500,
    inventory: 11,
    category: "bonsai",
  },
  {
    productName: "Satsuki Azalea",
    description:
      "This flowering bonsai produces blooms during the spring and possibly during the fall with the proper care. It's blush (pink) blooms can add a refreshing touch to a room looking for natural color.",
    imageUrl:
      "https://www.easternleaf.com/v/vspfiles/photos/801460-03-2T.jpg?v-cache=1474457230",
    price: 4000,
    inventory: 4,
    category: "bonsai",
  },
  {
    productName: "Golden Gate Ficus",
    description:
      "This beautiful Golden Gate ficus bonsai tree is actually not as difficult to take care of as one may think. Like many ficus bonsai trees, the Golden Gate Ficus Bonsai Tree or Taiwan Ficus Bonsai Tree can be kept both indoors and outdoors, and is also one of the most hardy species.",
    imageUrl:
      "https://www.easternleaf.com/v/vspfiles/photos/800500-03-2T.jpg?v-cache=1525099719",
    price: 4900,
    inventory: 7,
    category: "bonsai",
  },
  {
    productName: "Satsuki Azalea",
    description:
      "This flowering bonsai produces blooms during the spring and possibly during the fall with the proper care. It's blush (pink) blooms can add a refreshing touch to a room looking for natural color.",
    imageUrl:
      "https://www.easternleaf.com/v/vspfiles/photos/801460-03-2T.jpg?v-cache=1474457230",
    price: 5500,
    inventory: 9,
    category: "bonsai",
  },
  {
    productName: "Sago Palm",
    description:
      "This miniature palm bonsai tree (Sago) can add a tropical feel to any setting. Slow growth and easy care make this palm bonsai tree a simple choice for a busy office.",
    imageUrl:
      "https://www.easternleaf.com/v/vspfiles/photos/800870-03-2T.jpg?v-cache=1474462460",
    price: 3900,
    inventory: 12,
    category: "bonsai",
  },
  {
    productName: "Flowering Tea Tree",
    description:
      "One of our more popular trees, the Fujian or Fukien Tea tree shares similar leaf and trunk characteristics as the Chinese Elm but with the added benefit of blooming white flowers. Blooms appear throughout the year most prevalently during spring and early winter.",
    imageUrl:
      "https://www.easternleaf.com/v/vspfiles/photos/801090-03-2T.jpg?v-cache=1474462665",
    price: 3500,
    inventory: 15,
    category: "bonsai",
  },
  {
    productName: "Shohin Flowering Tea Tree",
    description:
      "This Shohin flowering tea bonsai tree features a thick trunk in a small form, giving a feeling of strength and stability. Tea tree blooms appear throughout the year most prevalently during spring and early winter.",
    imageUrl:
      "https://www.easternleaf.com/v/vspfiles/photos/803630-03-2T.jpg?v-cache=1474467698",
    price: 3500,
    inventory: 14,
    category: "bonsai",
  },
  {
    productName: "Willow Leaf Ficus Bonsai",
    description:
      "This beautiful ficus bonsai tree is actually not as difficult to take care of as one may think. Like many ficus bonsai trees, the Narrow-Leaf Ficus, or Ficus nerifolia, can be kept both indoors and outdoors.This species is popular due to the narrower, thinner and more compact foliage making it an ideal species of bonsai.",
    imageUrl:
      "https://www.easternleaf.com/v/vspfiles/photos/808510-03-2T.jpg?v-cache=1568115841",
    price: 2900,
    inventory: 20,
    category: "bonsai",
  },
  {
    productName: "Grand Chinese Elm Bonsai",
    description:
      "Characterized by its leaf shape and stem development, the Chinese Elm Bonsai tree is a perfect addition of style and grace to any coffee table. Pruning the Chinese Elm Bonsai tree will continually produce fresh leaves to any shape you choose.",
    imageUrl:
      "https://www.easternleaf.com/v/vspfiles/photos/101470-06-2T.jpg?v-cache=1543421939",
    price: 15900,
    inventory: 4,
    category: "bonsai",
  },
  {
    productName: "Showcase Chinese Elm Bonsai",
    description:
      "One of our largest trees available ranging from 19''-24'' in height. The Chinese Elm Bonsai tree is a perfect addition of style and grace to any coffee table. Pruning the Chinese Elm Bonsai tree will continually produce fresh leaves to any shape you choose. Display stand not included.",
    imageUrl:
      "https://www.easternleaf.com/v/vspfiles/photos/808520-03-2T.jpg?v-cache=1568126603",
    price: 18000,
    inventory: 4,
    category: "bonsai",
  },
  {
    productName: "Miniature Ginseng Ficus",
    description:
      "This ginseng ficus features a shorter bonsai style pot that accentuates the shape of the root and stems. Ginseng Ficus can be kept both indoors and outdoors, and is also one of the most hardy species of Bonsai trees.  A very easy plant to prune and water, the Ginseng Ficus Bonsai Tree is a perfect beginner bonsai tree.",
    imageUrl: "https://www.easternleaf.com/v/vspfiles/photos/809400-03-2T.jpg",
    price: 3500,
    inventory: 11,
    category: "bonsai",
  },
  {
    productName: "Shohin Chinese Elm",
    description:
      "Characterized by its leaf shape and stem development, the Shohin Chinese Elm Bonsai tree is a perfect addition of style and grace to any coffee table. The Chinese Elm Bonsai tree is a very hardy tree that can accommodate indoor and outdoor environments with sufficient natural lighting.",
    imageUrl:
      "https://www.easternleaf.com/v/vspfiles/photos/101560-06-2T.jpg?v-cache=1474387875",
    price: 4000,
    inventory: 9,
    category: "bonsai",
  },
  {
    productName: "Ponytail Palm",
    description:
      "The ponytail palm bonsai tree is characterized by its large bulbous base and fine smooth-edged flat leaves. The palm bonsai tree is recommended for beginners due to its hardiness and bonsai is easy to care for.",
    imageUrl:
      "https://www.easternleaf.com/v/vspfiles/photos/805720-03-2T.jpg?v-cache=1474542953",
    price: 5500,
    inventory: 11,
    category: "bonsai",
  },
  {
    productName: "Small Ponytail Palm",
    description:
      "The ponytail palm bonsai tree is characterized by its large bulbous base and fine smooth-edged flat leaves. The palm bonsai tree is recommended for beginners due to its hardiness and bonsai is easy to care for.",
    imageUrl:
      "https://www.easternleaf.com/v/vspfiles/photos/805730-03-2T.jpg?v-cache=1474543076",
    price: 3900,
    inventory: 14,
    category: "bonsai",
  },
  {
    productName: "Lavender Star Bonsai",
    description:
      "The Grewia Occidentalis or Lavender Star tree is a tree that is named for its pink and lavender star-shaped flowers. Tree features glossy and elliptical green foliage. Lavender Star trees are great for bonsai as they can be easily pruned and shaped.",
    imageUrl:
      "https://www.easternleaf.com/v/vspfiles/photos/806210-03-2T.jpg?v-cache=1485770415",
    price: 3900,
    inventory: 19,
    category: "bonsai",
  },
  {
    productName: "Dwarf Brush Cherry",
    description:
      "Eugenia myrtifolia, or Dwarf Australian Brush Cherry, is an attractive evergreen shrub that has compact foliage. New leaves emerge tinged with red, and mature to a dark, glossy green. Can grow fluffy white flowers in late Spring and Summer, which then turn into purple-red berries in the Fall. The Dwarf Brush Cherry enjoys full sunlight with moderate watering, and is somewhat drought tolerant.",
    imageUrl: "https://www.easternleaf.com/v/vspfiles/photos/809140-03-2T.jpg",
    price: 4900,
    inventory: 10,
    category: "bonsai",
  },
  {
    productName: "Desert Rose Bonsai",
    description:
      "This Adenium or Desert Rose produces blooms during the summer throughout the fall with the proper care. The blooms can vary from white, pink, or red. The Desert Rose Bonsai does best in full sun. We recommend watering your Adenium once a week.",
    imageUrl:
      "https://www.easternleaf.com/v/vspfiles/photos/808700-03-2T.jpg?v-cache=1590677743",
    price: 3900,
    inventory: 14,
    category: "bonsai",
  },
];

module.exports = products;
