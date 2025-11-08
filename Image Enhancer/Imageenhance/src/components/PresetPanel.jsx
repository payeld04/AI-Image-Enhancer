import { Sparkles, Palette, Contrast, Droplets, Sun, Zap } from 'lucide-react';

function PresetPanel({ onApplyPreset, disabled }) {
  const presets = [
    { id: 'vivid', name: 'Vivid', icon: Sparkles, color: '#fbed2bff' },
    { id: 'vintage', name: 'Vintage', icon: Palette, color: '#a687edff' },
    { id: 'blackwhite', name: 'B&W', icon: Contrast, color: '#80858eff' },
    { id: 'cool', name: 'Cool', icon: Droplets, color: '#84aef0ff' },
    { id: 'warm', name: 'Warm', icon: Sun, color: '#ec9658ff' },
    { id: 'dramatic', name: 'Dramatic', icon: Zap, color: '#ec4899' }
  ];

  return (
    <div className="panel">
      <h3 className="panel-title">
        <Sparkles className="panel-icon" />
        Quick Presets
      </h3>
      <div className="preset-grid">
        {presets.map(preset => {
          const Icon = preset.icon;
          return (
            <button
              key={preset.id}
              onClick={() => onApplyPreset(preset.id)}
              disabled={disabled}
              className="preset-button"
              style={{ borderLeft: `4px solid ${preset.color}` }}
            >
              <Icon className="preset-icon" style={{ color: preset.color }} />
              <span className="preset-name">{preset.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default PresetPanel;