import { Upload, UploadCloudIcon } from 'lucide-react';

function ImageUpload({ onImageUpload, fileInputRef }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="upload-container">
      <div 
        className="upload-area"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <svg className="upload-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="upload-text">Upload an image to get started</p>
        <p className="upload-subtext">Drag and drop or click to browse</p>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="upload-button"
        >
          <UploadCloudIcon className="button-icon" />
          Choose Image
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="file-input"
        />
      </div>
    </div>
  );
}

export default ImageUpload;