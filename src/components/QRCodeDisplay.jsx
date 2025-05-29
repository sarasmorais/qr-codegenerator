import { useRef } from 'react';
import QRCode from 'qrcode';
import { saveAs } from 'file-saver';
import '../styles/QRCodeDisplay.css';

function QRCodeDisplay({ qrData }) {
  const canvasRef = useRef(null);

  const handleDownload = async (format) => {
    if (!qrData.text) return;

    try {
      if (format === 'png') {
        // Convert dataURL to blob and download
        if (qrData.qrCodeDataURL) {
          const response = await fetch(qrData.qrCodeDataURL);
          const blob = await response.blob();
          saveAs(blob, `qrcode-${Date.now()}.png`);
        }
      } else if (format === 'svg') {
        // Generate SVG string
        const options = {
          width: qrData.size,
          margin: 1,
          color: {
            dark: qrData.foregroundColor,
            light: qrData.backgroundColor
          },
          type: 'svg'
        };
        
        const svgString = await QRCode.toString(qrData.text, options);
        const blob = new Blob([svgString], {type: 'image/svg+xml'});
        saveAs(blob, `qrcode-${Date.now()}.svg`);
      }
    } catch (error) {
      console.error('Error downloading QR code:', error);
    }
  };

  if (!qrData.qrCodeDataURL) {
    return (
      <div className="qr-display empty">
        <div className="placeholder">
          <div className="placeholder-icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 3H9V9H3V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15 3H21V9H15V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 15H9V21H3V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15 15H21V21H15V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <p>Enter text or URL to generate a QR code</p>
        </div>
      </div>
    );
  }

  return (
    <div className="qr-display">
      <div className="qr-image-container">
        <img 
          src={qrData.qrCodeDataURL} 
          alt="Generated QR Code" 
          className="qr-image"
          style={{ 
            width: `${qrData.size}px`, 
            height: `${qrData.size}px`,
            maxWidth: '100%'
          }}
        />
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
      
      <div className="download-options">
        <button 
          onClick={() => handleDownload('png')} 
          className="download-button png"
          aria-label="Download as PNG"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          PNG
        </button>
        <button 
          onClick={() => handleDownload('svg')} 
          className="download-button svg"
          aria-label="Download as SVG"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          SVG
        </button>
      </div>

      {qrData.text && (
        <div className="qr-data">
          <p>QR code contains:</p>
          <div className="qr-content">{qrData.text}</div>
        </div>
      )}
    </div>
  );
}

export default QRCodeDisplay;