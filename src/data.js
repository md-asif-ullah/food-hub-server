const users = [
    {
        name: "John Doe",
        email: "john.doe@example.com",
        password: "MyP@ssw0rd!",
    },
    {
        name: "Jane Smith",
        email: "jane.smith@example.com",
        password: "SecurePassword!1",
    },
    {
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
        password: "StrongP@ss1",
    },
    {
        name: "Bob Roberts",
        email: "bob.roberts@example.com",
        password: "Password123!",
    },
    {
        name: "Emily Brown",
        email: "emily.brown@example.com",
        password: "BrownE!987",
    },
];

const products = [
    {
        name: "Margherita Pizza",
        price: 12.99,
        description:
            "Classic Margherita pizza with fresh tomatoes, mozzarella cheese, and basil.",
        category: "Pizza",
        quantity: 20,
        shipping: 2.99,
        image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cGl6emF8ZW58MHx8MHx8fDA%3D",
        rating: 4.8,
    },
    {
        name: "Pepperoni Pizza",
        price: 14.99,
        description:
            "Pepperoni pizza with mozzarella cheese and a crispy crust.",
        category: "Pizza",
        quantity: 15,
        shipping: 3.49,
        image: "https://images.unsplash.com/photo-1588315029754-2dd089d39a1a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHBpenphfGVufDB8fDB8fHww",
        rating: 4.7,
    },
    {
        name: "Spaghetti Bolognese",
        price: 11.99,
        description:
            "Traditional spaghetti with Bolognese sauce made with ground beef, tomatoes, and herbs.",
        category: "Noodles",
        quantity: 25,
        shipping: 2.79,
        image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Tm9vZGxlc3xlbnwwfHwwfHx8MA%3D%3D",
        rating: 4.6,
    },
    {
        name: "Pad Thai",
        price: 10.99,
        description:
            "Thai stir-fried noodles with tofu, bean sprouts, peanuts, and egg.",
        category: "Noodles",
        quantity: 30,
        shipping: 2.49,
        image: "https://images.unsplash.com/photo-1555126634-323283e090fa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fE5vb2RsZXN8ZW58MHx8MHx8fDA%3D",
        rating: 4.5,
    },
    {
        name: "Cheeseburger",
        price: 11.99,
        description:
            "Juicy beef burger with cheddar cheese, lettuce, tomato, and onion.",
        category: "Burger",
        quantity: 40,
        shipping: 2.49,
        image: "https://images.unsplash.com/photo-1596662951482-0c4ba74a6df6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJ1cmdlcnxlbnwwfHwwfHx8MA%3D%3D",
        rating: 4.6,
    },
    {
        name: "Chicken Burger",
        price: 12.99,
        description:
            "Grilled chicken breast burger with lettuce, tomato, and mayo.",
        category: "Burger",
        quantity: 35,
        shipping: 2.79,
        image: "https://plus.unsplash.com/premium_photo-1667682209935-b6c87cced668?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YnVyZ2VyfGVufDB8fDB8fHww",
        rating: 4.7,
    },
    {
        name: "Chocolate Cake",
        price: 6.99,
        description:
            "Rich and moist chocolate cake topped with chocolate ganache.",
        category: "Dessert",
        quantity: 25,
        shipping: 1.99,
        image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZGVzc2VydHxlbnwwfHwwfHx8MA%3D%3D",
        rating: 4.9,
    },
    {
        name: "Tiramisu",
        price: 7.99,
        description:
            "Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cheese.",
        category: "Dessert",
        quantity: 30,
        shipping: 2.19,
        image: "https://images.unsplash.com/photo-1560180474-e8563fd75bab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGRlc3NlcnR8ZW58MHx8MHx8fDA%3D",
        rating: 4.8,
    },
    {
        name: "Espresso",
        price: 2.49,
        description: "Strong and rich espresso shot.",
        category: "Coffee",
        quantity: 100,
        shipping: 0.99,
        image: "https://plus.unsplash.com/premium_photo-1669374537810-f88d8ad82818?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGNvZmZlZXxlbnwwfHwwfHx8MA%3D%3D",
        rating: 4.5,
    },
    {
        name: "Cappuccino",
        price: 3.49,
        description:
            "Espresso topped with frothy steamed milk and a dusting of cocoa powder.",
        category: "Coffee",
        quantity: 90,
        shipping: 1.09,
        image: "https://plus.unsplash.com/premium_photo-1673261160611-b060865138c3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y29mZmVlfGVufDB8fDB8fHww",
        rating: 4.6,
    },
];

export { users, products };
