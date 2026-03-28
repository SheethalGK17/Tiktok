import { useEffect, useMemo, useRef, useState } from 'react';
import ActionBar from './ActionBar';
import LoadingSkeleton from './LoadingSkeleton';
import UserOverlay from './UserOverlay';
import {
  HeartIcon,
  PauseIcon,
  PlayIcon,
  VolumeOffIcon,
  VolumeOnIcon,
} from './Icons';

function VideoCard({
  item,
  active,
  shouldLoad,
  muted,
  interactionState,
  onToggleLike,
  onToggleSave,
  onToggleFollow,
  onToggleExpand,
  onToggleMute,
  onAdvance,
}) {
  const videoRef = useRef(null);
  const longPressTimerRef = useRef(null);
  const playbackTimerRef = useRef(null);
  const heartTimerRef = useRef(null);
  const tapTimerRef = useRef(null);
  const longPressTriggeredRef = useRef(false);
  const resumeAfterPressRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(active);
  const [progress, setProgress] = useState(0);
  const [showPlaybackIcon, setShowPlaybackIcon] = useState(null);
  const [showHeartBurst, setShowHeartBurst] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasStartedLoading, setHasStartedLoading] = useState(active);
  const lastTapRef = useRef(0);

  useEffect(() => {
    if (shouldLoad) {
      setHasStartedLoading(true);
    }
  }, [shouldLoad]);

  useEffect(() => () => {
    window.clearTimeout(longPressTimerRef.current);
    window.clearTimeout(playbackTimerRef.current);
    window.clearTimeout(heartTimerRef.current);
    window.clearTimeout(tapTimerRef.current);
  }, []);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return undefined;
    }

    video.muted = muted;

    if (active) {
      const playAttempt = video.play();

      if (playAttempt && typeof playAttempt.catch === 'function') {
        playAttempt.catch(() => {});
      }

      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }

    return undefined;
  }, [active, muted]);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return undefined;
    }

    const updateProgress = () => {
      if (!video.duration) {
        setProgress(0);
        return;
      }

      setProgress((video.currentTime / video.duration) * 100);
    };

    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('loadedmetadata', updateProgress);

    return () => {
      video.removeEventListener('timeupdate', updateProgress);
      video.removeEventListener('loadedmetadata', updateProgress);
    };
  }, []);

  const playbackGlyph = useMemo(() => {
    if (showPlaybackIcon === 'play') {
      return <PlayIcon />;
    }

    if (showPlaybackIcon === 'pause') {
      return <PauseIcon />;
    }

    return null;
  }, [showPlaybackIcon]);

  const flashPlaybackIcon = (mode) => {
    setShowPlaybackIcon(mode);
    window.clearTimeout(playbackTimerRef.current);
    playbackTimerRef.current = window.setTimeout(() => {
      setShowPlaybackIcon(null);
    }, 650);
  };

  const togglePlayback = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (video.paused) {
      const playAttempt = video.play();

      if (playAttempt && typeof playAttempt.catch === 'function') {
        playAttempt.catch(() => {});
      }

      setIsPlaying(true);
      flashPlaybackIcon('play');
      return;
    }

    video.pause();
    setIsPlaying(false);
    flashPlaybackIcon('pause');
  };

  const handlePointerUp = () => {
    window.clearTimeout(longPressTimerRef.current);

    if (longPressTriggeredRef.current) {
      longPressTriggeredRef.current = false;
      const video = videoRef.current;

      if (active && resumeAfterPressRef.current && video && video.paused) {
        const playAttempt = video.play();

        if (playAttempt && typeof playAttempt.catch === 'function') {
          playAttempt.catch(() => {});
        }

        setIsPlaying(true);
        flashPlaybackIcon('play');
      }

      return;
    }
  };

  const handleLongPressStart = () => {
    const video = videoRef.current;

    if (!video || video.paused) {
      return;
    }

    resumeAfterPressRef.current = true;
    longPressTriggeredRef.current = false;
    window.clearTimeout(longPressTimerRef.current);
    longPressTimerRef.current = window.setTimeout(() => {
      video.pause();
      setIsPlaying(false);
      longPressTriggeredRef.current = true;
      flashPlaybackIcon('pause');
    }, 320);
  };

  const handleTap = () => {
    if (longPressTriggeredRef.current) {
      longPressTriggeredRef.current = false;
      return;
    }

    const now = Date.now();

    if (now - lastTapRef.current < 260) {
      window.clearTimeout(tapTimerRef.current);

      if (!interactionState.liked) {
        onToggleLike();
      }

      setShowHeartBurst(true);
      window.clearTimeout(heartTimerRef.current);
      heartTimerRef.current = window.setTimeout(() => setShowHeartBurst(false), 780);
      lastTapRef.current = 0;
      return;
    }

    lastTapRef.current = now;
    window.clearTimeout(tapTimerRef.current);
    tapTimerRef.current = window.setTimeout(() => {
      if (lastTapRef.current === now) {
        togglePlayback();
        lastTapRef.current = 0;
      }
    }, 260);
  };

  return (
    <article className="video-card">
      {!isLoaded && <LoadingSkeleton />}

      <video
        ref={videoRef}
        className="video-card__media"
        src={hasStartedLoading ? item.src : undefined}
        playsInline
        muted={muted}
        preload={active ? 'auto' : shouldLoad ? 'metadata' : 'none'}
        onLoadedData={() => setIsLoaded(true)}
        onError={() => setIsLoaded(true)}
        onEnded={() => {
          setProgress(0);
          onAdvance();
        }}
      />

      <button
        type="button"
        className="video-touch-surface"
        onPointerDown={handleLongPressStart}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onClick={handleTap}
        aria-label="Toggle video playback"
      />

      <div className={`playback-feedback${showPlaybackIcon ? ' is-visible' : ''}`}>
        {playbackGlyph}
      </div>

      <div className={`heart-feedback${showHeartBurst ? ' is-visible' : ''}`}>
        <HeartIcon filled />
      </div>

      <div className="video-gradient video-gradient--top" />
      <div className="video-gradient video-gradient--bottom" />

      <div className="video-card__chrome">
        <button
          type="button"
          className="mute-toggle"
          onClick={onToggleMute}
          aria-label={muted ? 'Unmute video' : 'Mute video'}
        >
          {muted ? <VolumeOffIcon /> : <VolumeOnIcon />}
        </button>

        <UserOverlay
          item={item}
          expanded={interactionState.expanded}
          onToggleExpanded={onToggleExpand}
        />

        <ActionBar
          likes={interactionState.likes}
          comments={interactionState.comments}
          shares={interactionState.shares}
          saves={interactionState.saves}
          liked={interactionState.liked}
          saved={interactionState.saved}
          followed={interactionState.followed}
          onToggleLike={onToggleLike}
          onToggleSave={onToggleSave}
          onToggleFollow={onToggleFollow}
        />

        <div className="music-disc" aria-hidden="true">
          <div className="music-disc__label">{item.music}</div>
        </div>
      </div>

      <div className="progress-track" aria-hidden="true">
        <span className="progress-track__bar" style={{ width: `${progress}%` }} />
      </div>
    </article>
  );
}

export default VideoCard;
