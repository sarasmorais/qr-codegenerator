import { useState, useRef, useEffect } from 'react';
import '../styles/ColorPicker.css';

function ColorPicker({ label, color, onChange, id }) {
  const [isOpen, setIsOpen] = useState(false);
  const pickerRef = useRef(null);
  
  const handleColorChange = (e) => {
    onChange(e.target.value);
  };

  const handleClickOutside = (event) => {
    if (pickerRef.current && !pickerRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const presetColors = [
    '#000000', '#FFFFFF', '#0066CC', '#FF3B30',
    '#34C759', '#FF9500', '#AF52DE', '#FF2D55'
  ];

  return (
    <div className="color-picker" ref={pickerRef}>
      <div className="color-picker-label">{label}</div>
      <div className="color-picker-container">
        <button 
          type="button"
          className="color-swatch"
          style={{ backgroundColor: color }}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={`Select ${label}`}
        ></button>
        <input 
          type="text" 
          value={color} 
          onChange={handleColorChange}
          id={id}
          className="color-value"
        />
      </div>
      
      {isOpen && (
        <div className="color-picker-popover">
          <input 
            type="color" 
            value={color} 
            onChange={handleColorChange}
            className="color-input"
          />
          
          <div className="color-presets">
            {presetColors.map((presetColor, index) => (
              <button
                key={index}
                className="preset-color"
                style={{ backgroundColor: presetColor }}
                onClick={() => {
                  onChange(presetColor);
                  setIsOpen(false);
                }}
                aria-label={`Use color ${presetColor}`}
              ></button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ColorPicker;