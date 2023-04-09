import ImageList from 'components/ImageList';
import NotFound from 'components/NotFound';
import { useEffect } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { io } from 'socket.io-client';
import Home from './components/Home';
import './css/App.css';
import IQueueResultDto from 'dto/interface/IQueueResultDto';

const App = () => {
  const socket = io('http://localhost:8000');

  useEffect(() => {
    function onConnect() {
      console.log('onConnect');
    }

    function onDisconnect() {
      console.log('onDisconnect');
    }

    function onFooEvent(value: string) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      console.log(`onFooEvent: ${value}`);
      const result = JSON.parse(value) as IQueueResultDto;
      // eslint-disable-next-line no-alert
      void alert(
        `アップロードが完了しました。 相関ID: ${result.correlationId}`
      );
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('foo', onFooEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('foo', onFooEvent);
    };
  });

  return (
    <div className="App">
      <BrowserRouter>
        <div className="link-area">
          <Link to="/" className="link">
            Home
          </Link>
          <Link to="/images" className="link">
            List
          </Link>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/images" element={<ImageList />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
