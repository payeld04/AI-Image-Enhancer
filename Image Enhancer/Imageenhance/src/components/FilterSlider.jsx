function FilterSlider({ label, value, onChange, min, max, disabled }) {
  return (
    <div className="filter-slider">
      <div className="slider-header">
        <label className="slider-label">{label}</label>
        <span className="slider-value">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        disabled={disabled}
        className="slider-input"
      />
    </div>
  );
}

export default FilterSlider;