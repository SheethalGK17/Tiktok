function UserOverlay({
  item,
  expanded,
  onToggleExpanded,
}) {
  return (
    <div className="user-overlay">
      <div className="user-overlay__text">
        <div className="user-overlay__meta">
          <p className="user-overlay__username">{item.username}</p>
          <span className="user-overlay__dot" aria-hidden="true" />
          <span className="user-overlay__tag">For You</span>
        </div>
        <p className={`user-overlay__caption${expanded ? ' is-expanded' : ''}`}>
          {item.caption}
        </p>
        <button type="button" className="more-button" onClick={onToggleExpanded}>
          {expanded ? 'Less' : 'More'}
        </button>
        <p className="music-label">
          <span aria-hidden="true">♪</span> {item.music}
        </p>
      </div>
    </div>
  );
}

export default UserOverlay;
