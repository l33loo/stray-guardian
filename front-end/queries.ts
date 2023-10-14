export function getPins() {
    const pins = [
        {
            animalType: 'cat',
            listingType: 'lost',
            color: 'orange',
            email: 'sdf',
            phone: '123',
            observations: 'observations...',
            date: '12344',
            token: '243',
            photoUrl: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg',
            coordinate: {latitude: 38.662116, longitude: -27.221159},
        },
        {
            animalType: 'dog',
            listingType: 'found',
            email: 'sousa@gmail.com',
            phone: '908',
            observations:'she knows tricks',
            date: '12/09/2020',
            token: '679',
            photoUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
            color: 'brown',
            coordinate: {latitude: 38.659385, longitude: -27.228497},
        },
        {
            animalType: 'seagull',
            listingType: 'found',
            email: 'email@gmail.com',
            phone: '908',
            observations:'it flies and bites',
            date: '12/12/2012',
            token: '356',
            photoUrl: 'https://images.unsplash.com/photo-1531482922603-0a5dfa476444?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            color: 'white',
            coordinate: {latitude: 38.658832, longitude: -27.219614},
        },
    ];

    return pins;
}
