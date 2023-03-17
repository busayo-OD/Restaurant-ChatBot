import { createChatBotMessage } from 'react-chatbot-kit';

const config = {
  initialMessages: [
    createChatBotMessage(
      <div>
        <div>Hello</div>
        <div>Select 1 to place order</div>
        <div>Select 99 to checkout order</div>
        <div>Select 98 to see order history</div>
        <div>Select 97 to see current order</div>
        <div>Select 0 to cancel order</div>
      </div>
    ),
  ],
};

export default config;
