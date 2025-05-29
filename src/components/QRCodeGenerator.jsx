import { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { validateInput } from '../utils/validation';
import ColorPicker from './ColorPicker';
import '../styles/QRCodeGenerator.css';

function QRCodeGenerator({ qrData, setQRData }) {
  const [inputValue, setInputValue] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateQRCode = async (text) => {
    if (!text.trim()) {
      setQRData({
        ...qrData,
        text: '',
        qrCodeDataURL: null,
        error: null
      });
      return;
    }

    const validation = validateInput(text);
    if (!validation.isValid) {
      setQRData({
        ...qrData,
        error: validation.error
      });
      return;
    }

    setIsGenerating(true);
    try {
      const options = {
        width: qrData.size,
        margin: 1,
        color: {
          dark: qrData.foregroundColor,
          light: qrData.backgroundColor
        }
      };
      
      const dataURL = await QRCode.toDataURL(text, options);
      
      setQRData({
        ...qrData,
        text: text,
        qrCodeDataURL: dataURL,
        error: null
      });
    } catch (err) {
      setQRData({
        ...qrData,
        error: 'Failed to generate QR code. Please try again.'
      });
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    // Generate QR code whenever customization changes
    if (qrData.text) {
      generateQRCode(qrData.text);
    }
  }, [qrData.size, qrData.foregroundColor, qrData.backgroundColor]);

  const handleSubmit = (e) => {
    e.preventDefault();
    generateQRCode(inputValue);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSizeChange = (e) => {
    setQRData({
      ...qrData,
      size: parseInt(e.target.value, 10)
    });
  };

  const handleForegroundColorChange = (color) => {
    setQRData({
      ...qrData,
      foregroundColor: color
    });
  };

  const handleBackgroundColorChange = (color) => {
    setQRData({
      ...qrData,
      backgroundColor: color
    });
  };

  return (
    <div className="qr-generator">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="qr-input">Enter URL, text, or contact details</label>
          <input
            id="qr-input"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="https://example.com"
            className={qrData.error ? 'input-error' : ''}
          />
          {qrData.error && <p className="error-message">{qrData.error}</p>}
        </div>
        
        <button 
          type="submit" 
          className="generate-button"
          disabled={isGenerating || !inputValue.trim()}
        >
          {isGenerating ? 'Generating...' : 'Generate QR Code'}
        </button>
        
        <div className="customization-section">
          <h3>Customize</h3>
          
          <div className="size-control">
            <label htmlFor="size-slider">Size</label>
            <input
              id="size-slider"
              type="range"
              min="100"
              max="400"
              step="10"
              value={qrData.size}
              onChange={handleSizeChange}
            />
            <span className="size-value">{qrData.size}px</span>
          </div>
          
          <div className="color-controls">
            <ColorPicker 
              label="Foreground Color"
              color={qrData.foregroundColor}
              onChange={handleForegroundColorChange}
              id="foreground-color"
            />
            <ColorPicker 
              label="Background Color"
              color={qrData.backgroundColor}
              onChange={handleBackgroundColorChange}
              id="background-color"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default QRCodeGenerator;