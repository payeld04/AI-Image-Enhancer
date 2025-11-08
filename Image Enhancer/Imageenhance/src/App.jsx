import { useState, useRef } from 'react';
import Header from './components/Header';
import ImageUpload from './components/ImageUpload';
import ImageCanvas from './components/ImageCanvas';
import PresetPanel from './components/PresetPanel';
import FilterControls from './components/FilterControls';
import './App.css';

function App() {
  const [image, setImage] = useState(null);
  const [originalImage, setOriginalImage] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [filters, setFilters] = useState({
    brightness: 100,
    contrast: 100,
    saturation: 100,
    blur: 0,
    sharpen: 0,
    hueRotate: 0,
    grayscale: 0,
    sepia: 0,
    invert: 0,
    opacity: 100
  });
  
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new window.Image();
        img.onload = () => {
          setOriginalImage(img);
          setImage(img);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const applyPreset = (preset) => {
    setProcessing(true);
    setTimeout(() => {
      let newFilters = { ...filters };
      switch(preset) {
        case 'vivid':
          newFilters = { ...filters, brightness: 110, contrast: 120, saturation: 150 };
          break;
        case 'vintage':
          newFilters = { ...filters, sepia: 50, contrast: 90, brightness: 95 };
          break;
        case 'blackwhite':
          newFilters = { ...filters, grayscale: 100, contrast: 120 };
          break;
        case 'cool':
          newFilters = { ...filters, hueRotate: 180, saturation: 120 };
          break;
        case 'warm':
          newFilters = { ...filters, hueRotate: -30, brightness: 110 };
          break;
        case 'dramatic':
          newFilters = { ...filters, contrast: 150, brightness: 80, saturation: 80 };
          break;
        default:
          break;
      }
      setFilters(newFilters);
      setProcessing(false);
    }, 500);
  };

  const autoEnhance = () => {
    setProcessing(true);
    setTimeout(() => {
      setFilters({
        ...filters,
        brightness: 105,
        contrast: 115,
        saturation: 120,
        sharpen: 20
      });
      setProcessing(false);
    }, 800);
  };

  const resetFilters = () => {
    setFilters({
      brightness: 100,
      contrast: 100,
      saturation: 100,
      blur: 0,
      sharpen: 0,
      hueRotate: 0,
      grayscale: 0,
      sepia: 0,
      invert: 0,
      opacity: 100
    });
  };

  const downloadImage = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = 'enhanced-image.png';
    link.href = canvasRef.current.toDataURL();
    link.click();
  };

  return (
    <div className="app-container">
      <Header />
      
      <div className="main-content">
        <div className="canvas-section">
          {!image ? (
            <ImageUpload 
              onImageUpload={handleImageUpload}
              fileInputRef={fileInputRef}
            />
          ) : (
            <ImageCanvas
              image={image}
              filters={filters}
              canvasRef={canvasRef}
              processing={processing}
              onAutoEnhance={autoEnhance}
              onReset={resetFilters}
              onDownload={downloadImage}
              onNewImage={() => fileInputRef.current?.click()}
              fileInputRef={fileInputRef}
              onImageUpload={handleImageUpload}
            />
          )}
        </div>

        <div className="controls-section">
          <PresetPanel
            onApplyPreset={applyPreset}
            disabled={!image || processing}
          />
          
          <FilterControls
            filters={filters}
            onFilterChange={handleFilterChange}
            disabled={!image}
          />
        </div>
      </div>
    </div>
  );
}

export default App;