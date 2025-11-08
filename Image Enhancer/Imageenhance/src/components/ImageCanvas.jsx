import { useEffect } from 'react';
import { Sparkles, RotateCw, Download } from 'lucide-react';

function ImageCanvas({ 
  image, 
  filters, 
  canvasRef, 
  processing, 
  onAutoEnhance, 
  onReset, 
  onDownload,
  onNewImage,
  fileInputRef,
  onImageUpload
}) {
  
  useEffect(() => {
    drawImage();
  }, [image, filters]);

  const drawImage = () => {
    if (!image || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const maxWidth = 800;
    const maxHeight = 600;
    let width = image.width;
    let height = image.height;
    
    if (width > maxWidth || height > maxHeight) {
      const ratio = Math.min(maxWidth / width, maxHeight / height);
      width *= ratio;
      height *= ratio;
    }
    
    canvas.width = width;
    canvas.height = height;
    
    ctx.filter = `
      brightness(${filters.brightness}%)
      contrast(${filters.contrast}%)
      saturate(${filters.saturation}%)
      blur(${filters.blur}px)
      hue-rotate(${filters.hueRotate}deg)
      grayscale(${filters.grayscale}%)
      sepia(${filters.sepia}%)
      invert(${filters.invert}%)
      opacity(${filters.opacity}%)
    `;
    
    ctx.drawImage(image, 0, 0, width, height);
    
    if (filters.sharpen > 0) {
      applySharpen(ctx, width, height, filters.sharpen);
    }
  };

  const applySharpen = (ctx, width, height, amount) => {
    const imageData = ctx.getImageData(0, 0, width, height);
    const factor = amount / 50;
    
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = width;
    tempCanvas.height = height;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.putImageData(imageData, 0, 0);
    
    ctx.filter = 'none';
    ctx.globalAlpha = 1 - factor;
    ctx.drawImage(tempCanvas, 0, 0);
    ctx.globalAlpha = factor;
    ctx.filter = 'contrast(200%)';
    ctx.drawImage(tempCanvas, 0, 0);
    ctx.globalAlpha = 1;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onImageUpload(file);
    }
  };

  return (
    <div className="canvas-container">
      <div className="canvas-header">
        <h3 className="canvas-title">Preview</h3>
        <div className="canvas-actions">
          <button
            onClick={onAutoEnhance}
            disabled={processing}
            className="btn btn-primary"
          >
            <Sparkles className="btn-icon" />
            {processing ? 'Processing...' : 'Auto Enhance'}
          </button>
          <button onClick={onReset} className="btn btn-secondary">
            <RotateCw className="btn-icon" />
            Reset
          </button>
          <button onClick={onDownload} className="btn btn-success">
            <Download className="btn-icon" />
            Download
          </button>
        </div>
      </div>
      
      <div className="canvas-wrapper">
        <canvas ref={canvasRef} className="canvas" />
      </div>
      
      <button onClick={onNewImage} className="btn-full">
        Upload Different Image
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="file-input"
      />
    </div>
  );
}

export default ImageCanvas;