import { useState } from 'react';
import Header from './components/Header';
import QRCodeGenerator from './components/QRCodeGenerator';
import QRCodeDisplay from './components/QRCodeDisplay';
import Footer from './components/Footer';
import './styles/App.css';

function App() {
  const [qrData, setQRData] = useState({
    text: '',
    size: 250,
    foregroundColor: '#000000',
    backgroundColor: '#FFFFFF',
    qrCodeDataURL: null,
    error: null,
  });

  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <div className="qr-generator-wrapper">
          <QRCodeGenerator 
            qrData={qrData} 
            setQRData={setQRData} 
          />
          <QRCodeDisplay 
            qrData={qrData} 
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;