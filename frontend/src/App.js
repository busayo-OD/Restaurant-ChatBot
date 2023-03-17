import './App.scss';
import Chat from './components/Chat';

const App = () => {
  localStorage.setItem('orderItems', JSON.stringify([]));

  return (
    <div className='app'>
      <header className='app-header'>Logo</header>
      <div className='chat-container'>
        <Chat />
      </div>
    </div>
  );
};

export default App;
