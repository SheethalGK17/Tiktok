import {
  BookmarkIcon,
  CommentIcon,
  HeartIcon,
  ShareIcon,
} from './Icons';

function ActionBar({
  likes,
  comments,
  shares,
  saves,
  liked,
  saved,
  followed,
  onToggleLike,
  onToggleSave,
  onToggleFollow,
}) {
  const items = [
    {
      label: liked ? 'Unlike video' : 'Like video',
      count: likes,
      className: liked ? 'is-liked' : '',
      icon: <HeartIcon filled={liked} />,
      onClick: onToggleLike,
    },
    {
      label: 'Open comments',
      count: comments,
      icon: <CommentIcon />,
      onClick: () => {},
    },
    {
      label: 'Share video',
      count: shares,
      icon: <ShareIcon />,
      onClick: () => {},
    },
    {
      label: saved ? 'Remove bookmark' : 'Save video',
      count: saves,
      className: saved ? 'is-saved' : '',
      icon: <BookmarkIcon filled={saved} />,
      onClick: onToggleSave,
    },
  ];

  return (
    <aside className="action-bar">
      <button
        type="button"
        className={`creator-chip${followed ? ' is-following' : ''}`}
        onClick={onToggleFollow}
        aria-label={followed ? 'Following creator' : 'Follow creator'}
      >
        <span className="creator-chip__avatar" aria-hidden="true" />
        <span className="creator-chip__badge">{followed ? '✓' : '+'}</span>
      </button>

      {items.map(({ label, count, icon, onClick, className = '' }) => (
        <button
          key={label}
          type="button"
          className={`action-icon ${className}`.trim()}
          aria-label={label}
          onClick={onClick}
        >
          <span className="action-icon__circle">
            <span className="action-icon__glyph">{icon}</span>
          </span>
          <span className="action-icon__count">{count.toLocaleString()}</span>
        </button>
      ))}
    </aside>
  );
}

export default ActionBar;
