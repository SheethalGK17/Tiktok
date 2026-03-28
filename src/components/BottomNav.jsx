import {
  HomeIcon,
  InboxIcon,
  PlusIcon,
  ProfileIcon,
  SearchIcon,
} from './Icons';

const navItems = [
  { label: 'Home', icon: HomeIcon },
  { label: 'Search', icon: SearchIcon },
  { label: 'Add', icon: PlusIcon, accent: true },
  { label: 'Inbox', icon: InboxIcon },
  { label: 'Profile', icon: ProfileIcon },
];

function BottomNav({ activePage, onNavigate }) {
  return (
    <nav className="bottom-nav" aria-label="Primary">
      {navItems.map(({ label, icon: Icon, accent }) => (
        <button
          key={label}
          type="button"
          className={`bottom-nav__item${activePage === label ? ' is-active' : ''}${accent ? ' is-accent' : ''}`}
          aria-label={label}
          aria-pressed={activePage === label}
          onClick={() => onNavigate(label)}
        >
          <span className="bottom-nav__icon">
            <Icon />
          </span>
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}

export default BottomNav;
