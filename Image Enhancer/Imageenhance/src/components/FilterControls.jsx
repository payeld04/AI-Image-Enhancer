import { Sliders } from 'lucide-react';
import FilterSlider from './FilterSlider';

function FilterControls({ filters, onFilterChange, disabled }) {
  const filterConfig = [
    { name: 'brightness', label: 'Brightness', min: 0, max: 200 },
    { name: 'contrast', label: 'Contrast', min: 0, max: 200 },
    { name: 'saturation', label: 'Saturation', min: 0, max: 200 },
    { name: 'sharpen', label: 'Sharpen', min: 0, max: 100 },
    { name: 'blur', label: 'Blur', min: 0, max: 20 },
    { name: 'hueRotate', label: 'Hue Rotate', min: 0, max: 360 },
    { name: 'grayscale', label: 'Grayscale', min: 0, max: 100 },
    { name: 'sepia', label: 'Sepia', min: 0, max: 100 },
    { name: 'invert', label: 'Invert', min: 0, max: 100 },
    { name: 'opacity', label: 'Opacity', min: 0, max: 100 }
  ];

  return (
    <div className="panel">
      <h3 className="panel-title">
        <Sliders className="panel-icon" />
        Advanced Controls
      </h3>
      <div className="filter-list">
        {filterConfig.map(config => (
          <FilterSlider
            key={config.name}
            label={config.label}
            value={filters[config.name]}
            onChange={(value) => onFilterChange(config.name, value)}
            min={config.min}
            max={config.max}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}

export default FilterControls;