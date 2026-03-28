import { useEffect, useMemo, useRef, useState } from 'react';
import VideoCard from './VideoCard';

function createInteractionState(items) {
  return items.reduce((accumulator, item) => {
    accumulator[item.id] = {
      likes: item.likes,
      comments: item.comments,
      shares: item.shares,
      saves: item.saves,
      liked: false,
      saved: false,
      followed: false,
      expanded: false,
    };

    return accumulator;
  }, {});
}

function VideoFeed({ items }) {
  const tripledItems = useMemo(() => [...items, ...items, ...items], [items]);
  const middleIndex = items.length;
  const containerRef = useRef(null);
  const recenteringRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(middleIndex);
  const [muted, setMuted] = useState(false);
  const [interactionState, setInteractionState] = useState(() =>
    createInteractionState(items),
  );

  const getPageHeight = () => containerRef.current?.clientHeight || window.innerHeight;

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return undefined;
    }

    const jumpToIndex = middleIndex;
    container.scrollTop = jumpToIndex * getPageHeight();
    setActiveIndex(jumpToIndex);

    return undefined;
  }, [middleIndex]);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return undefined;
    }

    let frameId = 0;

    const syncActiveIndex = () => {
      const pageHeight = getPageHeight();
      const rawIndex = Math.round(container.scrollTop / pageHeight);
      setActiveIndex(rawIndex);

      if (rawIndex <= Math.floor(items.length / 2) || rawIndex >= items.length * 2 + Math.floor(items.length / 2)) {
        recenteringRef.current = true;
        const normalizedIndex = ((rawIndex % items.length) + items.length) % items.length;
        const nextIndex = middleIndex + normalizedIndex;
        container.scrollTo({
          top: nextIndex * pageHeight,
          behavior: 'auto',
        });
        setActiveIndex(nextIndex);
        requestAnimationFrame(() => {
          recenteringRef.current = false;
        });
      }
    };

    const handleScroll = () => {
      if (recenteringRef.current) {
        return;
      }

      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(syncActiveIndex);
    };

    const handleResize = () => {
      container.scrollTo({
        top: activeIndex * getPageHeight(),
        behavior: 'auto',
      });
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [activeIndex, items.length, middleIndex]);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return undefined;
    }

    const step = (direction) => {
      const nextIndex = activeIndex + direction;
      container.scrollTo({
        top: nextIndex * getPageHeight(),
        behavior: 'smooth',
      });
    };

    const handleKeyDown = (event) => {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        step(1);
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        step(-1);
      } else if (event.code === 'Space') {
        event.preventDefault();
        const activeButton = container.querySelectorAll('.video-touch-surface')[activeIndex];
        activeButton?.click();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeIndex]);

  const updateVideoState = (id, updater) => {
    setInteractionState((currentState) => ({
      ...currentState,
      [id]: updater(currentState[id]),
    }));
  };

  const advanceTo = (direction) => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const nextIndex = activeIndex + direction;
    container.scrollTo({
      top: nextIndex * getPageHeight(),
      behavior: 'smooth',
    });
  };

  return (
    <main className="feed-shell">
      <section className="feed-container" ref={containerRef} aria-label="Video feed">
        {tripledItems.map((item, index) => {
          const state = interactionState[item.id];

          return (
            <section className="feed-snap" key={`${item.id}-${index}`}>
              <VideoCard
                item={item}
                active={index === activeIndex}
                shouldLoad={Math.abs(index - activeIndex) <= 1}
                muted={muted}
                interactionState={state}
                onToggleLike={() =>
                  updateVideoState(item.id, (current) => ({
                    ...current,
                    liked: !current.liked,
                    likes: current.likes + (current.liked ? -1 : 1),
                  }))
                }
                onToggleSave={() =>
                  updateVideoState(item.id, (current) => ({
                    ...current,
                    saved: !current.saved,
                    saves: current.saves + (current.saved ? -1 : 1),
                  }))
                }
                onToggleFollow={() =>
                  updateVideoState(item.id, (current) => ({
                    ...current,
                    followed: !current.followed,
                  }))
                }
                onToggleExpand={() =>
                  updateVideoState(item.id, (current) => ({
                    ...current,
                    expanded: !current.expanded,
                  }))
                }
                onToggleMute={() => setMuted((current) => !current)}
                onAdvance={() => advanceTo(1)}
              />
            </section>
          );
        })}
      </section>
    </main>
  );
}

export default VideoFeed;
