import React, { useState, useEffect } from 'react';

const MessageParser = ({ children, actions }) => {
  const backendUrl =
    process.env.REACT_APP_BACKEND_URL ||
    'https://relish-restaurant-chatbot.onrender.com';

  const [items, setItems] = useState([]);
  const [placeOrder, setPlaceOrder] = useState(false);
  const [itemQty, setItemQty] = useState(false);
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    fetch(`${backendUrl}/items`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setItems(res);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [backendUrl]);

  const parse = (message) => {
    if (!placeOrder && message === '1') {
      // Place order
      actions.placeOrder();
      setPlaceOrder(true);
    } else if (
      placeOrder &&
      !itemQty &&
      (message === '1' || message === '2' || message === '3' || message === '4')
    ) {
      // Select Food item
      const selection = items.find((food) => food.id === message);
      setOrderItems([...orderItems, selection]);
      actions.setItemQty(message);
      setItemQty(true);
    } else if (
      placeOrder &&
      itemQty &&
      Number(message) > 0 &&
      Number(message) < 10
    ) {
      // Selected item quantity and collate order
      const selectedItemIndex = orderItems[orderItems.length - 1];
      selectedItemIndex.quantity = message;
      selectedItemIndex.total =
        selectedItemIndex.price * selectedItemIndex.quantity;
      // Store data in localstorage
      localStorage.setItem('orderItems', JSON.stringify(orderItems));

      actions.initialMessage();
      setPlaceOrder(false);
      setItemQty(false);
    } else if (orderItems.length && message === '99') {
      // Checkout
      actions.checkout(orderItems);
      setPlaceOrder(false);
      setItemQty(false);
      setOrderItems([]);
      // Update data in localstorage
      localStorage.setItem('orderItems', JSON.stringify([]));
    } else if (!orderItems.length && message === '99') {
      actions.invalidInput('No current order to checkout');
    } else if (!placeOrder && message === '98') {
      // Get order history
      actions.orderHistory();
    } else if (!placeOrder && message === '97') {
      // See current order
      actions.currentOrder();
    } else if (message === '0') {
      //Cancel current order
      actions.cancelOrder();
      setPlaceOrder(false);
      setItemQty(false);
      setOrderItems([]);
    } else if (message === '') {
      actions.invalidInput('Please enter a valid input');
    } else {
      actions.invalidInput('Invalid input. Please enter the correct input');
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions: {},
        });
      })}
    </div>
  );
};

export default MessageParser;
