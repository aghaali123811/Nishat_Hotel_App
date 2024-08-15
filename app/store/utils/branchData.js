import AppTheme from '../../styles/AppTheme';
import Routes from '../../navigations/Routes';
export const Themes = {
  'Nishat Johar Town': AppTheme.colors.black,
  // 'Nishat Gulberg': AppTheme.colors.goldenPrimary,
  'Nishat Gulberg': AppTheme.colors.black,
};

export const Rooms = {
  'Nishat Johar Town': [
    {
      name: 'Deluxe Rooms',
      images: [
        require('../../assets/deluxeRooms.png'),
        require('../../assets/deluxe_room14.jpg'),
      ],
      desc: 'The Nishat Hotel’s most popular category, our Deluxe Rooms are cosy, well-appointed and favoured by our leisure travellers. Stretching up to 27 sq. metres & set in cool greys with ultimately comfortable low-lying beds, it even gives our corporate guest the perfect atmosphere to unwind and get a good night’s sleep.',
      bedRooms: 1,
      guests: 2,
      bedType: 'King Size',
      bathrooms: 1,
      area: '27 sq. m',
    },

    {
      name: 'Executive Rooms',
      images: [
        require('../../assets/executive_room2.jpg'),
        require('../../assets/executive_room8.jpg'),
      ],
      desc: 'Affordably luxurious, our Executive Rooms are the first choice of our business travellers. Spaciously designed up to 33 sq. metres, with the option of twin-bedding, ample wardrobe space, luxuriously soft linen and indulgent marble bathrooms, our executive guest is sure to find its peaceful relaxation in one of these rooms.',
      bedRooms: 1,
      guests: 2,
      bedType: 'King Size',
      bathrooms: 1,
      area: '32 sq. m',
    },

    {
      name: 'Platinum Rooms',
      images: [
        require('../../assets/platinum_room8.jpg'),
        require('../../assets/platinum_room4.jpg'),
      ],
      desc: 'For guests who enjoy the luxury of space, our Platinum Rooms are generously proportioned for families with a comfortable seating area and muted furnishings. These airy bedrooms elongating to 40 sq. metres are the epitome of comfort with huge bathrooms ensuring you feel at home, away from home.',
      bedRooms: 1,
      guests: 2,
      bedType: 'King Size',
      bathrooms: 1,
      area: '45 sq. m',
    },

    {
      name: 'Royal Suite',
      images: [
        require('../../assets/suite7.jpg'),
        require('../../assets/suite6.jpg'),
      ],
      desc: 'The Nishat Hotel offers the contemporary, luxurious and beautiful selection of Royal Suites. The Royal Suite has elegantly furnished spacious bedroom and a lounge for your comfort and pleasure. The Royal Suite offers large screen TV sets in sedroom and lounge in addition to dining table and couches to make your stay memorable.',
      bedRooms: 1,
      guests: 2,
      bedType: 'King Size',
      bathrooms: 1,
      area: '61 sq. m',
      lounge: 1, //apply condition( ? ) on this
    },

    {
      name: 'Presidential Rooms',
      images: [
        require('../../assets/ps30.jpg'),
        require('../../assets/ps16.jpg'),
      ],
      desc: 'Nishat’s Presidential Suite is a stunning compliment to the hotel’s elegance and endless style. Suite features alavish corridor along with impressive lounge and master bedrooms. A grand marble bathroom features separate shower, bath and individual vanity. Guests will enjoy the services of a personal butler for the duration of their stay.',
      bedRooms: 3,
      guests: 6,
      bedType: 'King Size',
      bathrooms: 3,
      area: '90 sq m',
      lounge: 1,
    },
  ],

  'Nishat Gulberg': [
    {
      name: 'Deluxe Rooms',
      images: [
        require('../../assets/delux(6).jpg'),
        require('../../assets/delux(9).jpg'),
      ],
      desc: 'A well appointed, stylish and comfortable private space for our discerning clients, offering a comfortable Queen’-sized bed, en-suite marble bathroom and state of the art technology; perfect for both business and leisure traveler or those looking for an indulgent space for one. Connecting Rooms as well as Twin bedrooms are available on request.',
      bedRooms: 1,
      guests: 2,
      bedType: 'Queen Size',
      bathrooms: 1,
      area: '18 sq. m',
    },

    {
      name: 'Executive Rooms',
      images: [
        require('../../assets/exec(1).jpg'),
        require('../../assets/exec(2).jpg'),
      ],
      desc: 'A beautiful space complete with an impressive marble bathroom, generous wardrobe space and the latest in modern technology, these rooms are ideal for a business traveler.',
      bedRooms: 1,
      guests: 2,
      bedType: 'King Size',
      bathrooms: 1,
      area: '25.08 sq. m',
    },
    {
      name: 'Executive Twin Rooms',
      images: [
        require('../../assets/ex-twin-2.jpg'),
        require('../../assets/ex-twin-3.jpg'),
      ],
      desc: 'Featuring gold accents and neutral hues, our new executive twin rooms are absolutely ethereal. From modern decor to statement furniture, offering complimentary accessories and amenities to our guests is a retreat to slip into a plush bedding. These rooms are a perfect blend of relaxation and sophistication to create your ideal stay.',
      bedRooms: 1,
      guests: 2,
      bedType: 'King Size',
      bathrooms: 1,
      area: '25.08 sq. m',
    },

    {
      name: 'Junior Suite',
      images: [
        require('../../assets/junior-suite-2.jpg'),
        require('../../assets/junior-suite-4.jpg'),
      ],
      desc: 'Inspired by Mediterranean coast and art deco this iconic junior suite diffuses a hushed source of light providing a soothing atmosphere and offers a peaceful escape. This suite showcases technology, stunning vanity and signature bedding to ensure a comfortable stay. Situated at the heart of Lahore, experience modern conveniences and entertainment all inside your compass.',
      bedRooms: 1,
      guests: 2,
      bedType: 'King Size',
      bathrooms: 1,
      area: '25.08 sq. m',
    },

    {
      name: 'Nishat Suite',
      images: [
        require('../../assets/nishatSuite(2).jpg'),
        require('../../assets/nishatSuite(3).jpg'),
      ],
      desc: 'Spacious, graceful and contemporary suite is individually designed and beautifully furnished with separate dressing room along with upmost attention to detail, mixing the latest in communication and entertainment system.',
      bedRooms: 1,
      guests: 2,
      bedType: 'King Size',
      bathrooms: 1,
      area: '82 sq. m',
    },

    {
      name: 'Royal Suite',
      images: [
        require('../../assets/royal(1).jpg'),
        require('../../assets/royal(3).jpg'),
      ],
      desc: 'Spacious, graceful and contemporary-Each suite is individually designed and beautifully furnished with the upmost attention to detail, mixing the latest in communication and entertainment system.',
      bedRooms: 1,
      guests: 2,
      bedType: 'King Size',
      bathrooms: 1,
      area: '30.19 sq. m',
    },

    {
      name: 'Presidential Suite',
      images: [
        require('../../assets/pSuite(1).jpg'),
        require('../../assets/pSuite(15).jpg'),
      ],
      desc: 'The eponymously named Nishat’s Suites are a stunning tribute to the hotel’s elegance and timeless style. Each suite features an imposing entrance hall opening out onto an impressive sitting room and elegant bedroom. A grand marble bathroom features separate shower, bath and individual vanity. Guests will enjoy the services of a personal butler for the duration of their stay.',
      bedRooms: 1,
      guests: 4,
      bedType: 'King Size',
      bathrooms: 2,
      area: 'Room Size:\n 35.90sq m\nLounge size:\n 32.52sq m',
    },

    {
      name: '3 Bed Apartments',
      images: [
        require('../../assets/bed3(30).jpg'),
        require('../../assets/bed3(33).jpg'),
      ],
      desc: 'Luxury apartments in Lahore with barrel vaulted ceilings, an art-deco style with a choice of three bedrooms. All apartments are provided with beautiful TV lounge, dining space for up to eight guests and a fully equipped kitchenette with your own private butler.',
      bedRooms: 3,
      guests: 6,
      bedType: 'King Size',
      bathrooms: 3,
      area: 'Room Size:\n 20.90 sq. m\nLounge size:\n 18.95 sq. m',
    },

    {
      name: '2 Bed Apartments',
      images: [
        require('../../assets/bed2-1.jpg'),
        require('../../assets/bed2-10.jpg'),
      ],
      desc: 'Luxury apartments in Lahore with barrel vaulted ceilings, an art-deco style with a choice of two bedrooms. All apartments are provided with beautiful TV lounge, dining space for up to eight guests and a fully equipped kitchenette with your own private butler.',
      bedRooms: 2,
      guests: 4,
      bedType: 'King Size',
      bathrooms: 2,
      area: 'Room Size:\n 20.07 sq. m\nLounge size:\n 32.52 sq. m',
    },
  ],
};

export const Offers = {
  'Nishat Johar Town': [
    require('../../assets/offer2.png'),
    require('../../assets/offer1.png'),
    require('../../assets/offer3.png'),
  ],

  'Nishat Gulberg': [
    require('../../assets/offer2.png'),
    require('../../assets/offer1.png'),
  ],
};

export const ExploreHotel = {
  'Nishat Gulberg': [
    {
      name: 'Pool',
      image: require('../../assets/poolGulberg.jpg'),
      route: Routes.Wellness
    },
    {
      name: 'Fine Dining',
      image: require('../../assets/diningGulberg.jpg'),
      route: Routes.Dining
    },
    {
      name: 'Premium Guest Services',
      image: require('../../assets/pgsGulberg.jpg'),
      route: Routes.Cattering
    },
    {
      name: 'Exclusive Accommodation',
      image: require('../../assets/delux(6).jpg'),
      route: Routes.Rooms
    },
  ],

  'Nishat Johar Town': [
    // {
    //   name: 'Emporium Mall',
    //   image: require('../../assets/winter.png'),
    //   route:Routes.Wellness
    // },
    {
      name: 'Pool',
      image: require('../../assets/pool.png'),
      route: Routes.Wellness
    },
    {
      name: 'Fine Dining',
      image: require('../../assets/fineDining.png'),
      route: Routes.Dining
    },
    {
      name: 'Premium Guest Services',
      image: require('../../assets/premiumGuestServic.png'),
      route: Routes.Cattering
    },
    {
      name: 'Exclusive Acommodation',
      image: require('../../assets/platinum_room8.jpg'),
      route: Routes.Rooms
    },
  ],
};

export const Experiences = {
  'Nishat Johar Town': [
    {
      name: 'Pool',
      image: require('../../assets/pool.png'),
      route: Routes.Wellness
    },
    {
      name: 'Gym',
      image: require('../../assets/gym.jpg'),
      route: Routes.Wellness
    },
    {
      name: 'Fine Dining',
      image: require('../../assets/fineDining.png'),
      route: Routes.Dining
    },
  ],

  'Nishat Gulberg': [
    {
      name: 'Pool',
      image: require('../../assets/poolGulberg.jpg'),
      route: Routes.Wellness
    },
    {
      name: 'Gym',
      image: require('../../assets/gymGulberg.jpg'),
      route: Routes.Wellness
    },
    {
      name: 'Fine Dining',
      image: require('../../assets/diningGulberg.jpg'),
      route: Routes.Dining
    },
  ],
};

export const Restaurants = {
  gulberg: [
    {
      name: 'Dining',
      image: require('../../assets/room-service.png'),
    },
    {
      name: 'Cube',
      image: require('../../assets/cube.png'),
    },
    {
      name: 'Green Room',
      image: require('../../assets/green-Room2.png'),
    },
  ],
  johartown: [
    {
      name: 'Dining',
      image: require('../../assets/room-service.png'),
    },
    {
      name: 'Bistro',
      image: require('../../assets/green-room.png'),
    },
    {
      name: 'MISOSO',
      image: require('../../assets/restaurantnew.png'),
    },
  ]
};

export const HotelImages = {
  'Nishat Johar Town': [
    require('../../assets/rectangle.png'),
    require('../../assets/bg.png'),
    require('../../assets/hotelMisc.jpg'),
    require('../../assets/bg2.png'),
    require('../../assets/pool.png'),
    require('../../assets/gym.jpg'),
  ],

  'Nishat Gulberg': [
    require('../../assets/nishatGulbergMisc-1.jpg'),
    require('../../assets/nishatGulbergMisc-2.jpg'),
    require('../../assets/nishatGulbergMisc-3.jpg'),
    require('../../assets/nishatGulbergMisc-4.jpg'),
    require('../../assets/poolGulberg.jpg'),
    require('../../assets/gymGulberg.jpg'),
  ],
};

export const Corporate = {
  'Nishat Johar Town': [
    require('../../assets/conference5.jpg'),
    require('../../assets/conference8.jpg'),
    require('../../assets/conference10.jpg'),
  ],

  'Nishat Gulberg': [
    require('../../assets/conference_gulberg1.jpg'),
    require('../../assets/conference_gulberg2.jpg'),
    require('../../assets/conference_gulberg3.jpg'),
  ],
};

export const Dining = {
  'Nishat Johar Town': [
    {
      images: [
        require('../../assets/bistro.png'),
        require('../../assets/bistro2.jpg'),
      ],
      name: 'Bistro',
      desc: 'The enormous iridescent chandelier and modern furniture transforms the restaurant into a magical dining space in Johar Town. Our delicious menus are extensive, yet refreshingly simple. The very best in fusion cuisine, traditional Chinese and Char grilled steaks!',
    },

    {
      images: [
        require('../../assets/cucina1.jpg'),
        require('../../assets/cucina2.png'),
      ],
      name: 'La Cucina',
      desc: 'The enormous iridescent chandelier and modern furniture transforms the restaurant into a magical dining space in Johar Town. Our delicious menus are extensive, yet refreshingly simple. The very best in fusion cuisine, traditional Chinese and Char grilled steaks!',
    },
  ],

  'Nishat Gulberg': [
    {
      images: [
        require('../../assets/in_room1.jpg'),
        require('../../assets/in_room2.jpg'),
      ],
      name: 'In Room Dining',
      desc: 'Our gourmet in-room dining menu is available. Your food is served in your room exactly as you would like it. You may choose from our selection of authentic Pakistani cuisine or a variety of snacks, pizzas, pastas and delicious steaks',
    },

    {
      images: [require('../../assets/greenRoomLogo.jpg')],
      name: 'Green Room Dining',
    },

    {
      images: [require('../../assets/cubeLogo.jpg')],
      name: 'Cube Dining',
    },
  ],
};

export const Wellness = {
  'Nishat Johar Town': [
    {
      images: [require('../../assets/pool.png')],
      name: 'Pool',
      desc: '24 hour heated pool equipped with professionally trained instructors.',
    },

    {
      images: [require('../../assets/gym.jpg')],
      name: 'Gym',
      desc: 'Providing our guests with fitness goals, the right dose of inspiration, ultra-modern equipment and the best fitness trainers – our gym is the beacon of health and fitness!',
    },
  ],

  'Nishat Gulberg': [
    {
      images: [require('../../assets/poolGulberg.jpg')],
      name: 'Pool',
      desc: 'JOIN THE BEAT!\nOur Pool & Gym membership package Call now +92 423 5984000\n24 hours heated pool equipped with professionally trained instructors. Take a dip and unwind yourself\nfrom daily hustle and bustle reaching your full physical potential.',
    },

    {
      images: [require('../../assets/gymGulberg.jpg')],
      name: 'Gym',
      desc: "JOIN THE BEAT!\nOur Pool & Gym membership package Call now +92 423 5984000\nState of the art gymnasium. From getting great abs, to losing weight, to getting motivated it's not just a workout but a complete body transformation.",
    },
  ],
};

export const Banquets = {
  'Nishat Johar Town': [
    require('../../assets/banquets1.jpg'),
    require('../../assets/banquets2.jpg'),
    require('../../assets/banquets3.jpg'),
  ],

  'Nishat Gulberg': [
    require('../../assets/banquets_gulberg.png'),
    require('../../assets/banquets_gulberg2.png'),
    require('../../assets/banquets_gulberg3.jpg'),
  ],
};
