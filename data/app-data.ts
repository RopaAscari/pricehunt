import {User, Item} from '../constants/type-definitions';

export const userInfo: Array<User> = [
  {
    _id: '1',
    firstName: 'Danyel',
    lastName: 'Roper',
    username: 'Ropa',
    profilePic: 'none',
    favouriteItems: [],
    email: 'danyelroper66@gmail.com',
    isloggenIn: true,
    password: '12345',
  },
  {
    _id: '2',
    firstName: 'Demar',
    lastName: 'Johnson',
    username: 'Demar',
    profilePic: 'none',
    favouriteItems: [],
    email: 'demar@gmail.com',
    isloggenIn: true,
    password: '12345',
  },
  {
    _id: '3',
    firstName: 'Nickary',
    lastName: 'Pearson',
    username: 'Nick',
    profilePic: 'none',
    favouriteItems: [],
    email: 'nick@gmail.com',
    isloggenIn: true,
    password: '12345',
  },
  {
    _id: '4',
    firstName: 'Dominique',
    lastName: 'Griffiths',
    username: 'Debo',
    profilePic: 'none',
    favouriteItems: [],
    email: 'debo66@gmail.com',
    isloggenIn: true,
    password: '12345',
  },
];

export const merchantStories = [
  {
    username: 'MegaMart',
    title: 'MegaMart',
    profile: 'https://pricehunt101.s3.us-east-2.amazonaws.com/1564313919-89-megamart-jamaica.jpg',
    stories: [
      {
        id: 1,
        type: 'image',
        duration: 2,
        isReadMore: true,       
        url: 'https://pricehunt101.s3.us-east-2.amazonaws.com/1086449-programmer-wallpapers-1920x1080-for-desktop.jpg',
      },
      {
        id: 2,
        type: 'video',
        duration: 2,
        isReadMore: true,       
        url: 'https://pricehunt101.s3.us-east-2.amazonaws.com/Introducing+Amazon+Go+and+the+world%E2%80%99s+most+advanced+shopping+technology.mp4',        
      },
      {
        id: 3,
        type: 'image',
        duration: 2,
        isReadMore: true, 
        url:'https://pricehunt101.s3.us-east-2.amazonaws.com/amina-bhh-wBUpgceAh9Q-unsplash.jpg',
      },
      {
        id: 3,
        type: 'image',
        duration: 2,
        isReadMore: true, 
        url:'https://pricehunt101.s3.us-east-2.amazonaws.com/fotis-fotopoulos-LJ9KY8pIH3E-unsplash.jpg',
      },
    ],
    allStoriesWatched: false,
  },
  {
    username: 'Apple',
    title: 'Apple',
    profile: 'https://pricehunt101.s3.us-east-2.amazonaws.com/og-default.jpg',
    stories: [
      {
        id: 1,
        type: 'image',
        duration: 2,
        isReadMore: true, 
        url:
          'https://pricehunt101.s3.us-east-2.amazonaws.com/popular-items/Mask+Group+9.png',
      },
    ],
    allStoriesWatched: false,
  },
  {
    username: 'Hilo',
    title: 'Hilo',
    profile: 'https://pricehunt101.s3.us-east-2.amazonaws.com/ybLbm2xX5V.jpg',
    stories: [
      {
        id: 1,
        type: 'image',
        duration: 2,
        isReadMore: true, 
        url:
          'https://pricehunt101.s3.us-east-2.amazonaws.com/popular-items/Mask+Group+10.png',
      },
    ],
    allStoriesWatched: false,
  },
  {
    username: 'Sony',
    title: 'Sony',
    profile: 'https://pricehunt101.s3.us-east-2.amazonaws.com/sonyview1.webp',
    stories: [
      {
        id: 1,
        type: 'image',
        duration: 2,
        isReadMore: true, 
        url:
          'https://pricehunt101.s3.us-east-2.amazonaws.com/popular-items/sony.png',
      },
    ],
    allStoriesWatched: false,
  },
  {
    username: 'Nike',
    title: 'Nike',
    profile: 'https://pricehunt101.s3.us-east-2.amazonaws.com/image.jpg',
    stories: [
      {
        id: 1,
        type: 'image',
        duration: 2,
        isReadMore: true,
        url:
          'https://pricehunt101.s3.us-east-2.amazonaws.com/popular-items/nike.jpg',
      },
    ],
    allStoriesWatched: false,
  },
];

export const popularItems: Array<Item> = [
  {
    popularLabel: 'Samsung',
    imageUrl:
      'https://pricehunt101.s3.us-east-2.amazonaws.com/popular-items/Mask+Group+8.png',
  },
  {
    popularLabel: 'Games',
    imageUrl:
      'https://pricehunt101.s3.us-east-2.amazonaws.com/popular-items/Mask+Group+12.png',
  },
  {
    popularLabel: 'Cereal',
    imageUrl:
      'https://pricehunt101.s3.us-east-2.amazonaws.com/popular-items/Mask+Group+10.png',
  },
  {
    popularLabel: 'Footwear',
    imageUrl:
      'https://pricehunt101.s3.us-east-2.amazonaws.com/popular-items/Mask+Group+11.png',
  },
  {
    popularLabel: 'Iphone',
    imageUrl:
      'https://pricehunt101.s3.us-east-2.amazonaws.com/popular-items/Mask+Group+9.png',
  },

  {
    popularLabel: 'Sony',
    imageUrl:
      'https://pricehunt101.s3.us-east-2.amazonaws.com/popular-items/sony.png',
  },
  {
    popularLabel: 'Laptops',
    imageUrl:
      'https://pricehunt101.s3.us-east-2.amazonaws.com/popular-items/asus.jpg',
  },
  {
    popularLabel: 'Nike',
    imageUrl:
      'https://pricehunt101.s3.us-east-2.amazonaws.com/popular-items/nike.jpg',
  },
  {
    popularLabel: 'Jewelry',
    imageUrl:
      'https://pricehunt101.s3.us-east-2.amazonaws.com/popular-items/jewelry.jpg',
  },
  {
    popularLabel: 'Vehicles',
    imageUrl:
      'https://pricehunt101.s3.us-east-2.amazonaws.com/popular-items/vehicle.jpg',
  },
];

export const landingItems: Array<Item> = [
  {
    id: '1',
    name: 'Corsair Mouse',
    price: 3500.0,
    merchant: 'Mega Mart',
    thumbnailImage:
      'https://pricehunt101.s3.us-east-2.amazonaws.com/mouse.jpg',
    images: [
      'https://pricehunt101.s3.us-east-2.amazonaws.com/mouse.jpg',
      'https://pricehunt101.s3.us-east-2.amazonaws.com/landing-items/images/mouse1.png',
      'https://pricehunt101.s3.us-east-2.amazonaws.com/landing-items/images/mouse2.jpg',
      'https://pricehunt101.s3.us-east-2.amazonaws.com/landing-items/images/mouse3.jpg',
    ],
    comments:
      'Great Mouse! Very fast, responsive and reliable.I recommend you give it a try; I really enjoy using it',
    description:
      'The CORSAIR M65 RGB ELITE tunable gaming mouse is CORSAIR’s most advanced FPS gaming mouse yet, built around a durable aluminum frame and equipped with a state-of-the-art 18,000 DPI optical sensor.',
  },
  {
    id: '2',
    name: 'Lays Potato Chips',
    price: 145.0,
    merchant: 'Mega Mart',
    thumbnailImage:
      'https://pricehunt101.s3.us-east-2.amazonaws.com/lays.jpg',
    images: [
      'https://pricehunt101.s3.us-east-2.amazonaws.com/lays.jpg',
      'https://pricehunt101.s3.us-east-2.amazonaws.com/landing-items/images/lays1.jpg',
      'https://pricehunt101.s3.us-east-2.amazonaws.com/landing-items/images/lays2.jpg',
      'https://pricehunt101.s3.us-east-2.amazonaws.com/landing-items/images/lays3.jpeg',
    ],
    comments:
      'We have liked these chips a lot for several years. They are good plain or with salsa and dips.',
    description:
      "As Lay's is the most popular brand of chip, it's fitting they make a good product you don't want to stop eating. For anyone unfamiliar with the Sour Cream & Onion flavor, it has dehydrated sour cream powder and onion powder sprinkled on each chip. The flavor is somewhat cool with the dairy and flavorful, yet not overpowering, with the onion powder.",
  },
  {
    id: '3',
    name: 'Nike Jumpman',
    price: 25800.0,
    merchant: 'Express Clothes',
    thumbnailImage:
      'https://pricehunt101.s3.us-east-2.amazonaws.com/nikeJum.jpg',
    images: [
      'https://pricehunt101.s3.us-east-2.amazonaws.com/nikeJum.jpg',
      'https://pricehunt101.s3.us-east-2.amazonaws.com/landing-items/images/nike2.jpg',
      'https://pricehunt101.s3.us-east-2.amazonaws.com/landing-items/images/nike3.jpg',
    ],
    comments:
      'For $110, this is a really good performer - highly recommended! Just watch out if you are playing a lot on really dusty courts.',
    description:
      'The Nike Jumpman is a modern sneaker that features design inspiration from the popular Air Jordan 14. They sport comfortable construction with asymmetrical zipper closure, midfoot shank, foam midsole, and a rubber outsole.',
  },
  {
    id: '4',
    name: 'Benz 4matic',
    price: 23045697.0,
    merchant: 'Mercedes',
    thumbnailImage:
      'https://pricehunt101.s3.us-east-2.amazonaws.com/benzzzzz.jpg',
    images: [
      'https://pricehunt101.s3.us-east-2.amazonaws.com/benzzzzz.jpg',
      'https://pricehunt101.s3.us-east-2.amazonaws.com/todays-deals/2.jpg',
      'https://pricehunt101.s3.us-east-2.amazonaws.com/todays-deals/3.jpg',
      'https://pricehunt101.s3.us-east-2.amazonaws.com/todays-deals/1.jpg',
    ],
    comments:
      'Great Car! Very fast, safe and reliable.I recommend you give it a try; I really enjoy driving it',
    description:
      "4MATIC is the Mercedes terminology for its four-wheel drive system, featured on some of Mercedes-Benz's car models. Put simply, it is the name given to Mercedes four-wheel drive or Mercedes all-wheel drive cars",
  },
  {
    id: '5',
    name: 'Iphone 11',
    price: 200000.0,
    merchant: 'Apple',
    thumbnailImage:
      'https://pricehunt101.s3.us-east-2.amazonaws.com/11Iphone.jpg',
    images: [
      'https://pricehunt101.s3.us-east-2.amazonaws.com/11Iphone.jpg',   
      'https://pricehunt101.s3.us-east-2.amazonaws.com/04R1s9xuQfmVH4MHFeuaghc-18.1570065414.fit_scale.size_1182x667.jpg',
      'https://pricehunt101.s3.us-east-2.amazonaws.com/i11.jpg',
    ],
    comments:
      'The good Even faster speed, improved battery life and fantastic video camera.',
    description:
      'With its 6.1-inch display, the iPhone 11 is between the 5.8-inch iPhone 11 Pro and 6.5-inch iPhone 11 Pro Max in size.',
  },
];

export const promotionalItems: Array<Item> = [
  {
    id: '6',
    name: 'Nike Air Jordans',
    price: 10000,
    merchant: 'Express Clothes',
    containerType: 1,
    imageUrl:
      'https://pricehunt101.s3.us-east-2.amazonaws.com/todays-deals/hiclipart.png',
    images: [
      'https://pricehunt101.s3.us-east-2.amazonaws.com/landing-items/images/nikeairr.webp',
      'https://pricehunt101.s3.us-east-2.amazonaws.com/landing-items/images/nikearr1.jpg',
      'https://pricehunt101.s3.us-east-2.amazonaws.com/landing-items/images/nikeair2.jpg',
      'https://pricehunt101.s3.us-east-2.amazonaws.com/landing-items/images/nikeair3.jpg',
    ],
    comments:
      'So comfortable these air Jordan’s 1 ret low slip are so cute . Definitely recommend these .',
    description:
      "Nike Jordan Men's Air Jordan 1 Mid White/White/Wolf Grey Basketball Shoe 9.5 Men US",
  },
  {
    id: '7',
    name: 'Frosted Flakes',
    price: 3500.0,
    merchant: 'Hilo Supermarket',
    containerType: 2,
    imageUrl:
      'https://pricehunt101.s3.us-east-2.amazonaws.com/todays-deals/frost+(1).webp',
    images: [
      'https://pricehunt101.s3.us-east-2.amazonaws.com/landing-items/frosted.jpeg',
      'https://pricehunt101.s3.us-east-2.amazonaws.com/landing-items/images/frosted1.png',
      'https://pricehunt101.s3.us-east-2.amazonaws.com/landing-items/images/frosted2.jpg',
    ],
    comments:
      "It is more like Frosted Flakes dusted with cocoa. The whole cereal isn't coated.",
    description:
      'Frosted Flakes or Frosties is a breakfast cereal, produced by the Kellogg Company and consisting of sugar-coated corn flakes. It was introduced in the United States, in 1952, as Sugar Frosted Flakes',
  },
];

export const todaysDealItems: Array<Item> = [
  {
    id: '8',
    name: 'Teddy Bear',
    price: 6785.0,
    merchant: 'Build a Bear',
    thumbnailImage:
      'https://pricehunt101.s3.us-east-2.amazonaws.com/GettyImages_1092626790.jpg',
    images: ['https://pricehunt101.s3.us-east-2.amazonaws.com/GettyImages_1092626790.jpg'],
    comments: 'Good, Strong material',
    description: 'Chance the Rapper Hoodie',
  },
  {
    id: '9',
    name: 'Original Timberland',
    price: 27660.0,
    merchant: 'Timberland',
    thumbnailImage:
      'https://pricehunt101.s3.us-east-2.amazonaws.com/images.jpg',
    images: ['https://pricehunt101.s3.us-east-2.amazonaws.com/images.jpg'],
    comments:
      'Great Car! Very fast, safe and reliable.I recommend you give it a try; I really enjoy driving it',
    description:
      "4MATIC is the Mercedes terminology for its four-wheel drive system, featured on some of Mercedes-Benz's car models. Put simply, it is the name given to Mercedes four-wheel drive or Mercedes all-wheel drive cars",
  },
  {
    id: '10',
    name: 'Mercedez Benz ',
    price: 200000.0,
    merchant: 'Mercedes',
    thumbnailImage:
      'https://pricehunt101.s3.us-east-2.amazonaws.com/mercedes-benz-cars-to-be-pricier-by-up-to-3-from-january-2020.jpg',
    images: [ 'https://pricehunt101.s3.us-east-2.amazonaws.com/mercedes-benz-cars-to-be-pricier-by-up-to-3-from-january-2020.jpg'],
    comments:
      'The good Even faster speed, improved battery life and fantastic video camera.',
    description:
      'With its 6.1-inch display, the iPhone 11 is between the 5.8-inch iPhone 11 Pro and 6.5-inch iPhone 11 Pro Max in size.',
  },
  {
    id: '11',
    name: 'Slim-Fit Jeans',
    price: 4500.0,
    merchant: 'JJ Fashion',
    thumbnailImage:
      'https://pricehunt101.s3.us-east-2.amazonaws.com/cceeb331-7e55-41db-bef3-1964b1fe924a1550831463061-Campus-Sutra-Men-Blue-Slim-Fit-Mid-Rise-Shaded-Side-Red-Stri-1.webp',
    images: ['https://pricehunt101.s3.us-east-2.amazonaws.com/cceeb331-7e55-41db-bef3-1964b1fe924a1550831463061-Campus-Sutra-Men-Blue-Slim-Fit-Mid-Rise-Shaded-Side-Red-Stri-1.webp'],
    comments:
      'The good Even faster speed, improved battery life and fantastic video camera.',
    description:
      'With its 6.1-inch display, the iPhone 11 is between the 5.8-inch iPhone 11 Pro and 6.5-inch iPhone 11 Pro Max in size.',
  },
];

export const newlyAddedItems: Array<Item> = [
  {
    id: '8',
    name: 'Chance Hoodie',
    price: 16895.0,
    merchant: 'Chance',
    imageUrl:
      'https://pricehunt101.s3.us-east-2.amazonaws.com/todays-deals/hoodie.png',
    images: [ 'https://pricehunt101.s3.us-east-2.amazonaws.com/todays-deals/hoodie.png'],
    comments: 'Good, Strong material',
    description: 'Chance the Rapper Hoodie',
  },
  {
    id: '9',
    name: 'Graphic Headset',
    price: 2660.0,
    merchant: 'Beats',
    imageUrl:
      'https://pricehunt101.s3.us-east-2.amazonaws.com/todays-deals/headset.png',
    images: [ 'https://pricehunt101.s3.us-east-2.amazonaws.com/todays-deals/headset.png'],
    comments:
      'Great Car! Very fast, safe and reliable.I recommend you give it a try; I really enjoy driving it',
    description:
      "4MATIC is the Mercedes terminology for its four-wheel drive system, featured on some of Mercedes-Benz's car models. Put simply, it is the name given to Mercedes four-wheel drive or Mercedes all-wheel drive cars",
  },
  {
    id: '10',
    name: '4K TV',
    price: 150000.0,
    merchant: '4k',
    imageUrl:
      'https://pricehunt101.s3.us-east-2.amazonaws.com/todays-deals/4k+TV.webp',
    images: ['https://pricehunt101.s3.us-east-2.amazonaws.com/todays-deals/4k+TV.webp'],
    comments:
      'The good Even faster speed, improved battery life and fantastic video camera.',
    description:
      'With its 6.1-inch display, the iPhone 11 is between the 5.8-inch iPhone 11 Pro and 6.5-inch iPhone 11 Pro Max in size.',
  },
  {
    id: '11',
    name: 'AP Watch',
    price: 30000.0,
    merchant: 'AP',
    imageUrl:
      'https://pricehunt101.s3.us-east-2.amazonaws.com/todays-deals/watch.png',
    images: [
      'https://pricehunt101.s3.us-east-2.amazonaws.com/landing-items/images/iphone+1.jpg',
      'https://pricehunt101.s3.us-east-2.amazonaws.com/landing-items/images/iphone2.png',
      'https://pricehunt101.s3.us-east-2.amazonaws.com/landing-items/images/iphone3.webp',
    ],
    comments:
      'The good Even faster speed, improved battery life and fantastic video camera.',
    description:
      'With its 6.1-inch display, the iPhone 11 is between the 5.8-inch iPhone 11 Pro and 6.5-inch iPhone 11 Pro Max in size.',
  },
];

export const topViewedItems: Array<Item> = [
  {
    id: '12',
    name: 'Samsung S20 Ultra',
    price: 1850000.0,
    merchant: 'Samsung',
    thumbnailImage:
      'https://pricehunt101.s3.us-east-2.amazonaws.com/vpavic_052004_4007_0022.jpg',
    images: ['https://pricehunt101.s3.us-east-2.amazonaws.com/vpavic_052004_4007_0022.jpg'],
    comments:
      'The good Even faster speed, improved battery life and fantastic video camera.',
    description:
      'With its sleek display, the iPhone 11 is between the 5.8-inch and 6.5-inch in size.',
  },
  {
    id: '13',
    name: 'Razor Gaming Laptop',
    price: 234000.0,
    merchant: 'Razor',
    thumbnailImage:
      'https://pricehunt101.s3.us-east-2.amazonaws.com/Gaming-Laptops-For-Tech-Savvy-Entrepreneurs.jpg',
    images: [ 'https://pricehunt101.s3.us-east-2.amazonaws.com/Gaming-Laptops-For-Tech-Savvy-Entrepreneurs.jpg'],
    comments:
      'The good Even faster speed, improved battery life and fantastic video camera.',
    description:
      'With its sleek display, the Razor Laptop is between the 5.8-inch and 6.5-inch in size.',
  },
];

export const morePopularItems: Array<Item> = [
  {
    id: '12',
    name: 'Samsung S20 Ultra',
    price: 1850000.0,
    merchant: 'Samsung',
    imageUrl:
      'https://pricehunt101.s3.us-east-2.amazonaws.com/topvieweditems/s20.png',
    images: [],
    comments:
      'The good Even faster speed, improved battery life and fantastic video camera.',
    description:
      'With its sleek display, the iPhone 11 is between the 5.8-inch and 6.5-inch in size.',
  },
  {
    id: '13',
    name: 'Razor Gaming Laptop',
    price: 234000.0,
    merchant: 'Razor',
    imageUrl:
      'https://pricehunt101.s3.us-east-2.amazonaws.com/topvieweditems/razor.png',
    images: [],
    comments:
      'The good Even faster speed, improved battery life and fantastic video camera.',
    description:
      'With its sleek display, the Razor Laptop is between the 5.8-inch and 6.5-inch in size.',
  },
  {
    id: '15',
    name: 'Cantu Shea Butter',
    price: 1250.0,
    merchant: 'Cantu',
    imageUrl:
      'https://pricehunt101.s3.us-east-2.amazonaws.com/todays-deals/cantuu.png',
    images: [],
    comments:
      'The good Even faster speed, improved battery life and fantastic video camera.',
    description:
      'With its sleek display, the iPhone 11 is between the 5.8-inch and 6.5-inch in size.',
  },
];

export const ads: Array<any> = [
  {
    color: '#FB8200',
  },
  {
    color: '#13BEC6',
  },
  {
    color: '#2BA510',
  },
  {
    color: '#DF0C0C',
  },
];

export const userChatData = [
  {
    thumbnailImage:
      'https://pricehunt101.s3.us-east-2.amazonaws.com/courts.jpg',
    name: "Courts",
    status: 'online',
    messages: [
      {
        _id: 176578,
        text: 'Hi whats up',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          //avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 289987,
        text: "What', your query",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          // avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ],
  }
  /*{
    thumbnailImage:
      'https://pricehunt101.s3.us-east-2.amazonaws.com/singer.jpg',
    name: 'Singer',
    status: 'online',
    messages: [
      {
        _id: 1,
        text: 'How much is for the new Stainless Steel Stove?',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          //avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 12,
        text: "What's your query",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          // avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ],
  },
  {
    thumbnailImage:
      'https://pricehunt101.s3.us-east-2.amazonaws.com/courts.jpg',
    name: 'Courts',
    status: 'online',
    messages: [
      {
        _id: 1,
        text: 'Hi whats up',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          //avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 12,
        text: 'Yes we do',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          // avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ],
  },
  {
    thumbnailImage:
      'https://pricehunt101.s3.us-east-2.amazonaws.com/mega.jpg',
    name: 'Mega Mart',
    status: 'online',
    messages: [
      {
        _id: 1,
        text: "I'm Ordering a cake from your bakery",
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          //avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 12,
        text: "What's your query",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          // avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ],
  },
  {
    thumbnailImage:
      'https://pricehunt101.s3.us-east-2.amazonaws.com/apple.jpg',
    name: 'Apple',
    status: 'online',
    messages: [
      {
        _id: 1,
        text: 'How much for your new Iphone 12?',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          //avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 12,
        text: "What's your query",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          // avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ],
  },
  {
    thumbnailImage:
      'https://pricehunt101.s3.us-east-2.amazonaws.com/nike.jpg',
    name: 'Nike',
    status: 'online',
    messages: [
      {
        _id: 1,
        text: 'Nike Air Jordon 14 price?',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          //avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 12,
        text: "What's your query",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          // avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ],
  },
  {
    thumbnailImage:
      'https://pricehunt101.s3.us-east-2.amazonaws.com/hilo.jpg',
    name: 'Hilo',
    status: 'online',
    messages: [
      {
        _id: 1,
        text: 'Ordering 10 cases of ICool',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          //avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 12,
        text: "What's your query",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          // avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ],
  },
  {
    thumbnailImage:
      'https://pricehunt101.s3.us-east-2.amazonaws.com/mercdes.jpg',
    name: 'Mercedes',
    status: 'online',
    messages: [
      {
        _id: 1,
        text: 'Is the new Mercedes on the market?',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          //avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 12,
        text: "What's your query",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          // avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ],
  },
  {
    thumbnailImage:
      'https://pricehunt101.s3.us-east-2.amazonaws.com/samsung.png',
    name: 'Samsung',
    status: 'online',
    messages: [
      {
        _id: 1,
        text: 'The S20 has a 120HZ Screen?',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          //avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 12,
        text: "What's your query",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          // avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ],
  },
  {
    thumbnailImage:
      'https://pricehunt101.s3.us-east-2.amazonaws.com/jewel.jpg',
    name: 'Love Jewelry',
    status: 'online',
    messages: [
      {
        _id: 1,
        text: "I'm getting engaged I need one of your finest rings",
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          //avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 12,
        text: "What's your query",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          // avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ],
  },
  {
    thumbnailImage:
      'https://pricehunt101.s3.us-east-2.amazonaws.com/store.jpg',
    name: 'Missy Fashion Store',
    status: 'online',
    messages: [
      {
        _id: 1,
        text: 'I need a new pair of jeans',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          //avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 12,
        text: "What's your query",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          // avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ],
  },*/
];

export const allItems: Array<Item> = [
  {
    id: '1',
    name: 'Corsair Mouse',
    price: 3500.0,
    merchant: 'Mega Mart',
    imageUrl:
      'https://pricehunt101.s3.us-east-2.amazonaws.com/todays-deals/watch.png',
    images: [
      'https://pricehunt101.s3.us-east-2.amazonaws.com/landing-items/cosiar+mouse.jpg',
      'https://pricehunt101.s3.us-east-2.amazonaws.com/landing-items/images/mouse1.png',
      'https://pricehunt101.s3.us-east-2.amazonaws.com/landing-items/images/mouse2.jpg',
      'https://pricehunt101.s3.us-east-2.amazonaws.com/landing-items/images/mouse3.jpg',
    ],
    comments:
      'Great Mouse! Very fast, responsive and reliable.I recommend you give it a try; I really enjoy using it',
    description:
      'The CORSAIR M65 RGB ELITE tunable gaming mouse is CORSAIR’s most advanced FPS gaming mouse yet, built around a durable aluminum frame and equipped with a state-of-the-art 18,000 DPI optical sensor.',
  },
  {
    id: '2',
    name: 'Lays Potato Chips',
    price: 145.0,
    merchant: 'Mini Mart',
    imageUrl:
      'https://pricehunt101.s3.us-east-2.amazonaws.com/todays-deals/lays20.png',
    images: [
      'https://pricehunt101.s3.us-east-2.amazonaws.com/landing-items/lays.jpg',
      'https://pricehunt101.s3.us-east-2.amazonaws.com/landing-items/images/lays1.jpg',
      'https://pricehunt101.s3.us-east-2.amazonaws.com/landing-items/images/lays2.jpg',
      'https://pricehunt101.s3.us-east-2.amazonaws.com/landing-items/images/lays3.jpeg',
    ],
    comments:
      'We have liked these chips a lot for several years. They are good plain or with salsa and dips.',
    description:
      "As Lay's is the most popular brand of chip, it's fitting they make a good product you don't want to stop eating. For anyone unfamiliar with the Sour Cream & Onion flavor, it has dehydrated sour cream powder and onion powder sprinkled on each chip. The flavor is somewhat cool with the dairy and flavorful, yet not overpowering, with the onion powder.",
  },
  {
    id: '3',
    name: 'Nike Jumpman',
    price: 25800.0,
    merchant: 'Express Clothes',
    imageUrl:
      'https://pricehunt101.s3.us-east-2.amazonaws.com/todays-deals/nike1.png',
    images: [
      'https://pricehunt101.s3.us-east-2.amazonaws.com/landing-items/nike.jpg',
      'https://pricehunt101.s3.us-east-2.amazonaws.com/landing-items/images/nike2.jpg',
      'https://pricehunt101.s3.us-east-2.amazonaws.com/landing-items/images/nike3.jpg',
    ],
    comments:
      'For $110, this is a really good performer - highly recommended! Just watch out if you are playing a lot on really dusty courts.',
    description:
      'The Nike Jumpman is a modern sneaker that features design inspiration from the popular Air Jordan 14. They sport comfortable construction with asymmetrical zipper closure, midfoot shank, foam midsole, and a rubber outsole.',
  },
  {
    id: '4',
    name: 'Benz 4matic',
    price: 23045697.0,
    merchant: 'Mercedes',
    imageUrl:
      'https://pricehunt101.s3.us-east-2.amazonaws.com/todays-deals/benz.png',
    images: [
      'https://pricehunt101.s3.us-east-2.amazonaws.com/landing-items/benz.jpg',
      'https://pricehunt101.s3.us-east-2.amazonaws.com/todays-deals/2.jpg',
      'https://pricehunt101.s3.us-east-2.amazonaws.com/todays-deals/3.jpg',
      'https://pricehunt101.s3.us-east-2.amazonaws.com/todays-deals/1.jpg',
    ],
    comments:
      'Great Car! Very fast, safe and reliable.I recommend you give it a try; I really enjoy driving it',
    description:
      "4MATIC is the Mercedes terminology for its four-wheel drive system, featured on some of Mercedes-Benz's car models. Put simply, it is the name given to Mercedes four-wheel drive or Mercedes all-wheel drive cars",
  },
  {
    id: '5',
    name: 'Iphone 11',
    price: 200000.0,
    merchant: 'Apple',
    imageUrl:
      'https://pricehunt101.s3.us-east-2.amazonaws.com/todays-deals/iphone11.png',
    images: [
      'https://pricehunt101.s3.us-east-2.amazonaws.com/landing-items/images/iphone+1.jpg',
      'https://pricehunt101.s3.us-east-2.amazonaws.com/landing-items/images/iphone2.png',
      'https://pricehunt101.s3.us-east-2.amazonaws.com/landing-items/images/iphone3.webp',
    ],
    comments:
      'The good Even faster speed, improved battery life and fantastic video camera.',
    description:
      'With its 6.1-inch display, the iPhone 11 is between the 5.8-inch iPhone 11 Pro and 6.5-inch iPhone 11 Pro Max in size.',
  },
  {
    id: '6',
    name: 'Nike Air Jordans',
    price: 10000,
    merchant: 'Express Clothes',
    containerType: 1,
    imageUrl:
      'https://pricehunt101.s3.us-east-2.amazonaws.com/todays-deals/hiclipart.png',
    images: [
      'https://pricehunt101.s3.us-east-2.amazonaws.com/landing-items/images/nikeairr.webp',
      'https://pricehunt101.s3.us-east-2.amazonaws.com/landing-items/images/nikearr1.jpg',
      'https://pricehunt101.s3.us-east-2.amazonaws.com/landing-items/images/nikeair2.jpg',
      'https://pricehunt101.s3.us-east-2.amazonaws.com/landing-items/images/nikeair3.jpg',
    ],
    comments:
      'So comfortable these air Jordan’s 1 ret low slip are so cute . Definitely recommend these .',
    description:
      "Nike Jordan Men's Air Jordan 1 Mid White/White/Wolf Grey Basketball Shoe 9.5 Men US",
  },
  {
    id: '7',
    name: 'Frosted Flakes',
    price: 3500.0,
    merchant: 'Hilo Supermarket',
    containerType: 2,
    imageUrl:
      'https://pricehunt101.s3.us-east-2.amazonaws.com/todays-deals/frost+(1).webp',
    images: [
      'https://pricehunt101.s3.us-east-2.amazonaws.com/landing-items/frosted.jpeg',
      'https://pricehunt101.s3.us-east-2.amazonaws.com/landing-items/images/frosted1.png',
      'https://pricehunt101.s3.us-east-2.amazonaws.com/landing-items/images/frosted2.jpg',
    ],
    comments:
      "It is more like Frosted Flakes dusted with cocoa. The whole cereal isn't coated.",
    description:
      'Frosted Flakes or Frosties is a breakfast cereal, produced by the Kellogg Company and consisting of sugar-coated corn flakes. It was introduced in the United States, in 1952, as Sugar Frosted Flakes',
  },
  {
    id: '8',
    name: 'PS5 Controller',
    price: 16895.0,
    merchant: 'Sony',
    imageUrl:
      'https://pricehunt101.s3.us-east-2.amazonaws.com/todays-deals/ps5.png',
    images: [
      'https://pricehunt101.s3.us-east-2.amazonaws.com/todays-deals/sony-playstation5-ps5-white-controller-design-11586462157g95gtxdl0d.png',
      'https://pricehunt101.s3.us-east-2.amazonaws.com/todays-deals/ps5black.png',
      'https://pricehunt101.s3.us-east-2.amazonaws.com/todays-deals/ps5dual.png',
    ],
    comments:
      'The good Even faster speed, improved battery life and fantastic video camera.',
    description:
      'With its 6.1-inch display, the iPhone 11 is between the 5.8-inch iPhone 11 Pro and 6.5-inch iPhone 11 Pro Max in size.',
  },
  {
    id: '9',
    name: 'Range Rover',
    price: 23045697.0,
    merchant: 'Range Rover',
    imageUrl:
      'https://pricehunt101.s3.us-east-2.amazonaws.com/todays-deals/range123.png',
    images: [
      'https://pricehunt101.s3.us-east-2.amazonaws.com/landing-items/benz.jpg',
      'https://pricehunt101.s3.us-east-2.amazonaws.com/todays-deals/2.jpg',
      'https://pricehunt101.s3.us-east-2.amazonaws.com/todays-deals/3.jpg',
      'https://pricehunt101.s3.us-east-2.amazonaws.com/todays-deals/1.jpg',
    ],
    comments:
      'Great Car! Very fast, safe and reliable.I recommend you give it a try; I really enjoy driving it',
    description:
      "4MATIC is the Mercedes terminology for its four-wheel drive system, featured on some of Mercedes-Benz's car models. Put simply, it is the name given to Mercedes four-wheel drive or Mercedes all-wheel drive cars",
  },
  {
    id: '10',
    name: '4K TV',
    price: 150000.0,
    merchant: '4k',
    imageUrl:
      'https://pricehunt101.s3.us-east-2.amazonaws.com/todays-deals/tv.webp',
    images: [
      'https://pricehunt101.s3.us-east-2.amazonaws.com/landing-items/images/iphone+1.jpg',
      'https://pricehunt101.s3.us-east-2.amazonaws.com/landing-items/images/iphone2.png',
      'https://pricehunt101.s3.us-east-2.amazonaws.com/landing-items/images/iphone3.webp',
    ],
    comments:
      'The good Even faster speed, improved battery life and fantastic video camera.',
    description:
      'With its 6.1-inch display, the iPhone 11 is between the 5.8-inch iPhone 11 Pro and 6.5-inch iPhone 11 Pro Max in size.',
  },
  {
    id: '11',
    name: 'AP Watch',
    price: 30000.0,
    merchant: 'AP',
    imageUrl:
      'https://pricehunt101.s3.us-east-2.amazonaws.com/todays-deals/watch.png',
    images: [
      'https://pricehunt101.s3.us-east-2.amazonaws.com/landing-items/images/iphone+1.jpg',
      'https://pricehunt101.s3.us-east-2.amazonaws.com/landing-items/images/iphone2.png',
      'https://pricehunt101.s3.us-east-2.amazonaws.com/landing-items/images/iphone3.webp',
    ],
    comments:
      'The good Even faster speed, improved battery life and fantastic video camera.',
    description:
      'With its 6.1-inch display, the iPhone 11 is between the 5.8-inch iPhone 11 Pro and 6.5-inch iPhone 11 Pro Max in size.',
  },
  {
    id: '12',
    name: 'Samsung S20 Ultra',
    price: 1850000.0,
    merchant: 'Samsung',
    imageUrl:
      'https://pricehunt101.s3.us-east-2.amazonaws.com/topvieweditems/s20.png',
    images: [],
    comments:
      'The good Even faster speed, improved battery life and fantastic video camera.',
    description:
      'With its sleek display, the iPhone 11 is between the 5.8-inch and 6.5-inch in size.',
  },
  {
    id: '13',
    name: 'Razor Gaming Laptop',
    price: 234000.0,
    merchant: 'Razor',
    imageUrl:
      'https://pricehunt101.s3.us-east-2.amazonaws.com/topvieweditems/razor.png',
    images: [],
    comments:
      'The good Even faster speed, improved battery life and fantastic video camera.',
    description:
      'With its sleek display, the Razor Laptop is between the 5.8-inch and 6.5-inch in size.',
  },
];
