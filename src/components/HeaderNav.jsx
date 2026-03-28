import { MoonIcon, SunIcon } from './Icons';

function HeaderNav({ activeTab, onTabChange, darkMode, onToggleDarkMode }) {
  return (
    <header className="top-nav">
      <div className="top-nav__scrim" aria-hidden="true" />
      <button
        className="theme-toggle"
        type="button"
        onClick={onToggleDarkMode}
        aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {darkMode ? <SunIcon /> : <MoonIcon />}
      </button>

      <div className="feed-switch" role="tablist" aria-label="Content feed">
        {['Following', 'For You'].map((tab) => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={activeTab === tab}
            className={activeTab === tab ? 'is-active' : ''}
            onClick={() => onTabChange(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    </header>
  );
}

export default HeaderNav;
