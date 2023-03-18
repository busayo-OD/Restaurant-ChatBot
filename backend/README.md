# Relish Restaurant Chatbot Backend

---
## Setup
- Install NodeJS
- pull this repo
- Open the project on vscode
- In your vscode terminal cd into the backend folder, that is, `cd backend`
- run `npm install`
- run `npm run dev`

---
## Base URL
-localhost: http://localhost:5000

-live link: https://relish-restaurant-chatbot.onrender.com

---

## APIs
### Get items
This endpoint returns all the items in the restaurant

- Route: http://localhost:5000/items
- Method: GET

- Responses
status: 200

```
[
    {
        "id": "1",
        "name": "Meat pie",
        "price": 500
    },
    {
        "id": "2",
        "name": "Chicken pie",
        "price": 500
    },
    {
        "id": "3",
        "name": "Shawarma",
        "price": 2000
    },
    {
        "id": "4",
        "name": "Tasty Fried Chicken",
        "price": 1600
    }
]
```

### Get an item by id
This endpoint returns the item with the given id
- Route: http://localhost:5000/items/1
- Method: GET

- Responses
status: 200 OK

```
{
    "id": "1",
    "name": "Meat pie",
    "price": 500
}
```

### Checkout order
This endpoint helps to generate order details when a customer selects the option to checkout an order.

- Route: http://localhost:5000/orders
- Method: POST

Body: (Array of items selected by the customer)
```
[
    {
        "id": "1",
        "name": "Meat pie",
        "price": 500,
        "quantity": 4,
        "total_price": 2000
    },
    {
        "id": "3",
        "name": "Chicken pie",
        "price": 600,
        "quantity": 2,
        "total_price": 1200
    }
]
```
- Responses

status: 200 OK

```
{
    "items": [
        {
            "id": "1",
            "name": "Meat pie",
            "price": 500,
            "quantity": 4,
            "total_price": 2000
        },
        {
            "id": "3",
            "name": "Chicken pie",
            "price": 600,
            "quantity": 2,
            "total_price": 1200
        }
    ],
    "total": 3200,
    "created_at": "2023-03-18T12:40:00.950Z"
}

```