import './App.scss';
import { useEffect } from 'react';
import Chat from './components/Chat';

const App = () => {
  localStorage.setItem('orderItems', JSON.stringify([]));

  useEffect(() => {
    document.querySelector('.react-chatbot-kit-chat-header').textContent = 'Talk To Us';
  }, []);

  return (
    <div className='app'>
      <header className='app-header'>
        <div className='logo'>Relish</div>
      </header>
      <div className='chat-container'>
        <Chat />
      </div>
    </div>
  );
};

export default App;
