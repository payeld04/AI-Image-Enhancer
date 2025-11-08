import { LucideWand, Wand, Wand2, Wand2Icon, WandSparklesIcon } from 'lucide-react';

function Header() {
  return (
    <div className="header">
      <div className="header-content">
        <Wand className="header-icon" />
        <h1 className="header-title">AI Image Enhancer</h1>
      </div>
      <p className="header-subtitle">
        Professional-grade image enhancement powered by advanced filters
      </p>
    </div>
  );
}

export default Header;