import { Store } from '../stores/store.model';

export const STORES: Store[] = [
    {
        id: 1,
        name: 'Apple retail store.',
        address: '1607 Walnut St, Philadelphia, PA 19103, USA',
        mode: '9AM - 9PM',
        products: [
            {
            name: 'iPhone',
            description: 'iPhone is a smartphone made by Apple that combines an iPod, \
            a tablet PC, a digital camera and a cellular phone. The device includes \
            Internet browsing and networking capabilities.'
            },
            {
                name: 'iPad',
                description: 'The iPad is a 9.7 inch touch screen tablet PC made by Apple. \
                The iPad is basically a netbook without a keyboard.  It has a multi-touch \
                LED-backlit 9.7 x 7.5 inch front display and weighs 1.5 pounds, with a battery that lasts up to ten hours. '
            }
        ]
    },
    {
        id: 2,
        name: 'Urban clothing & footwear store.',
        address: '417-421 South St, Philadelphia, PA 19147, USA',
        mode: '9AM - 8PM',
        products: [{
            name: 'Stocking sneakers',
            description: 'Sweet orange oranges'
        },
        {
            name: 'Branded athletic apparel',
            description: 'Sportswear or activewear is clothing, \
            including footwear, worn for sport or physical exercise.'

        },
        {
            name: 'Jeans',
            description: 'Hard-wearing casual trousers made of denim or other cotton fabric.'
        },
        {
            name: 'Casualwear',
            description: 'Articles of clothing suitable for informal occasions or situations.'
        }
        ]
    },
    {
        id: 3,
        name: 'Chain retailer',
        address: '2300 S Christopher Columbus Blvd, Philadelphia, PA 19148, USA',
        mode: '10AM - 9PM',
        products: [{
            name: 'Computers',
            description: 'A computer is a device that can be instructed to carry \
            out an arbitrary set of arithmetic or logical operations automatically. '
        },
        {
            name: 'Electronics',
            description: 'Different electronic gadgets'
        }]
    }

];