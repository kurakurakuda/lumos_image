import ImageList from 'components/ImageList';
import NotFound from 'components/NotFound';
import { useEffect } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { io, Socket } from 'socket.io-client';
import './css/App.css';
import IQueueResultDto from 'dto/interface/IQueueResultDto';
import { v4 } from 'uuid';
import Home from './components/Home';

const App = () => {
  const socket: Socket = io('http://localhost:8000');
  const clientId: string = v4();

  console.log(`clientId: ${clientId}`);

  useEffect(() => {
    function onConnect() {
      console.log('onConnect');
    }

    function onDisconnect() {
      console.log('onDisconnect');
    }

    function onUploadResultEvent(value: string) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      console.log(`onUploadResultEvent: ${value}`);
      const result = JSON.parse(value) as IQueueResultDto;
      // eslint-disable-next-line no-alert
      void alert(
        `アップロードが完了しました。 相関ID: ${result.correlationId}`
      );
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on(`${clientId}-upload`, onUploadResultEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off(`${clientId}-upload`, onUploadResultEvent);
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
          <Route path="/" element={<Home clientId={clientId} />} />
          <Route path="/images" element={<ImageList />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
