import React from 'react';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const backendUrl =
    process.env.REACT_APP_BACKEND_URL ||
    'https://relish-restaurant-chatbot.onrender.com';

  const placeOrder = () => {
    fetch(`${backendUrl}/items`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        const botMessage = createChatBotMessage(
          res.map((x, index) => (
            <div key={index}>
              Select {index + 1} to order {x.name} - ₦{x.price}
            </div>
          ))
        );

        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, botMessage],
        }));
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const setItemQty = (message) => {
    const botMessage = createChatBotMessage(
      <div>
        Select{' '}
        {message === '1'
          ? 'Meat pie'
          : message === '2'
          ? 'Chicken pie'
          : message === '3'
          ? 'Shawarma'
          : message === '4'
          ? 'Tasty Fried Chicken'
          : ''}{' '}
        quantity [0-9]
      </div>
    );

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const initialMessage = () => {
    const botMessage = createChatBotMessage(
      <div>
        <div>Select 1 to place order</div>
        <div>Select 99 to checkout order</div>
        <div>Select 98 to see order history</div>
        <div>Select 97 to see current order</div>
        <div>Select 0 to cancel order</div>
      </div>
    );

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const checkout = (orderItems) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderItems),
    };

    fetch(`${backendUrl}/orders`, options)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        // Store in local storage
        let orders;
        if (localStorage.getItem('orders')) {
          orders = JSON.parse(localStorage.getItem('orders'));
        } else {
          orders = [];
        }

        localStorage.setItem('orders', JSON.stringify([...orders, res]));

        const botMessage = createChatBotMessage(
          <div>
            <div className='subtitle'>Order Items</div>
            {res.items.map((x, index) => (
              <div key={index}>
                {x.quantity}x {x.name} - ₦{x.total}
              </div>
            ))}
            <div className='total'>
              Total = ₦
              {res.items.reduce((prev, curr) => {
                prev += curr.total;
                return prev;
              }, 0)}
            </div>
          </div>
        );
        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, botMessage],
        }));

        setTimeout(() => {
          initialMessage();
        }, 3000);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const orderHistory = () => {
    let orderHistory;
    if (localStorage.getItem('orders')) {
      orderHistory = JSON.parse(localStorage.getItem('orders'));
    } else {
      orderHistory = [];
    }

    const botMessage = createChatBotMessage(
      <div>
        {orderHistory.length > 0 && (
          <div className='subtitle'>Order History</div>
        )}

        {orderHistory.length ? (
          orderHistory.map((history, index) => {
            return (
              <div className='order-history' key={index}>
                <div className='order-date'>
                  {history.created_at.slice(0, 10)}
                </div>
                {history.items.map((item, index) => {
                  return (
                    <div key={index}>
                      {item.quantity}x {item.name} - ₦{item.total}
                    </div>
                  );
                })}

                <div className='total'>
                  Total = ₦
                  {history.items.reduce((prev, curr) => {
                    prev += curr.total;
                    return prev;
                  }, 0)}
                </div>
              </div>
            );
          })
        ) : (
          <div>No order</div>
        )}
      </div>
    );
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));

    setTimeout(() => {
      initialMessage();
    }, 3000);
  };

  const currentOrder = () => {
    let currOrder;
    if (localStorage.getItem('orderItems')) {
      currOrder = JSON.parse(localStorage.getItem('orderItems'));
    } else {
      currOrder = [];
    }

    const botMessage = createChatBotMessage(
      <div>
        {currOrder.length > 0 && <div>Current Order</div>}
        {currOrder.length ? (
          currOrder.map((x, index) => (
            <div key={index}>
              {x.quantity}x {x.name} - ₦{x.total}
            </div>
          ))
        ) : (
          <div>No current order</div>
        )}

        {currOrder.length > 0 && (
          <div>
            Total = ₦
            {currOrder.reduce((prev, curr) => {
              prev += curr.total;
              return prev;
            }, 0)}
          </div>
        )}
      </div>
    );
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));

    setTimeout(() => {
      initialMessage();
    }, 3000);
  };

  const cancelOrder = () => {
    let botMessage;
    let currOrder = JSON.parse(localStorage.getItem('orderItems'));
    if (currOrder.length > 0) {
      localStorage.setItem('orderItems', JSON.stringify([]));
      botMessage = createChatBotMessage(<div>Order canceled</div>);
    } else {
      botMessage = createChatBotMessage(<div>No order to cancel</div>);
    }

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));

    setTimeout(() => {
      initialMessage();
    }, 3000);
  };

  const invalidInput = (message) => {
    const botMessage = createChatBotMessage(<div>{message}</div>);

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            placeOrder,
            setItemQty,
            initialMessage,
            checkout,
            orderHistory,
            currentOrder,
            cancelOrder,
            invalidInput,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;