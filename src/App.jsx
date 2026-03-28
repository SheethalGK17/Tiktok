import { useMemo, useState } from 'react';
import BottomNav from './components/BottomNav';
import HeaderNav from './components/HeaderNav';
import VideoFeed from './components/VideoFeed';
import { videoItems } from './data/videos';

const discoverTopics = [
  { title: 'Travel reels', meta: '1.2M posts' },
  { title: 'Street food', meta: '890K posts' },
  { title: 'Dance trends', meta: '2.8M posts' },
  { title: 'Night edits', meta: '614K posts' },
  { title: 'Outfit edits', meta: '740K posts' },
  { title: 'Study routine', meta: '520K posts' },
  { title: 'Photo dump', meta: '1.1M posts' },
  { title: 'Cafe finds', meta: '468K posts' },
];

const searchEntities = [
  { type: 'Creator', title: '@aesthetic.frames', subtitle: 'Cinematic edits and color grading' },
  { type: 'Sound', title: 'Late Night Drive', subtitle: 'Trending in travel and car edits' },
  { type: 'Hashtag', title: '#campusvibes', subtitle: 'Students, routines, and everyday moments' },
  { type: 'Creator', title: '@food.trails', subtitle: 'Street food, hidden cafes, and quick reviews' },
  { type: 'Hashtag', title: '#summerescape', subtitle: 'Beach clips, flights, and destination edits' },
  { type: 'Sound', title: 'Soft Beat Loop', subtitle: 'Popular in GRWM and vlog content' },
  { type: 'Creator', title: '@sheethalgk', subtitle: 'Edits, campus moments, and daily vertical clips' },
  { type: 'Hashtag', title: '#transitioncheck', subtitle: 'Quick before-and-after edit styles' },
  { type: 'Sound', title: 'Campus Mornings', subtitle: 'Used in routines and mini vlogs' },
  { type: 'Creator', title: '@street.notes', subtitle: 'Slow pans, warm colors, and city detail shots' },
  { type: 'Hashtag', title: '#foodhunt', subtitle: 'Fast food cuts and cafe recommendations' },
  { type: 'Sound', title: 'Soft Pop Hook', subtitle: 'High retention audio for fashion clips' },
  { type: 'Creator', title: '@urban.canvas', subtitle: 'Street visuals, neon lights, and city edits' },
  { type: 'Hashtag', title: '#reelitfeelit', subtitle: 'Fast edits, hooks, and swipe-friendly clips' },
  { type: 'Sound', title: 'Sunset Echo', subtitle: 'Soft audio used in travel and memory edits' },
  { type: 'Creator', title: '@collegecuts', subtitle: 'Campus life, friends, exams, and funny moments' },
  { type: 'Hashtag', title: '#minivlog', subtitle: 'Quick day-in-my-life vertical content' },
  { type: 'Sound', title: 'Midnight Transition', subtitle: 'Popular for before and after clips' },
  { type: 'Creator', title: '@platesandplaces', subtitle: 'Food recommendations and aesthetic cafe shots' },
  { type: 'Hashtag', title: '#viraltransition', subtitle: 'Trending transitions used across fashion and beauty' },
  { type: 'Sound', title: 'Looped Beat 03', subtitle: 'Used in dance, comedy, and meme edits' },
  { type: 'Creator', title: '@dailyframes_', subtitle: 'Lifestyle clips with soft motion and warm grading' },
  { type: 'Hashtag', title: '#photodumpedit', subtitle: 'Memories, stills, and scrolling photo edits' },
  { type: 'Sound', title: 'Coffee Shop Hum', subtitle: 'Popular ambient audio for morning routines' },
  { type: 'Creator', title: '@fitcheck.now', subtitle: 'Outfit checks, fashion transitions, and mirror clips' },
  { type: 'Hashtag', title: '#foodreel', subtitle: 'Short-form food reviews and cafe recommendations' },
  { type: 'Sound', title: 'Vlog Hook 12', subtitle: 'Strong first-second hook for retention' },
  { type: 'Creator', title: '@motionrepeat', subtitle: 'Loop edits, smooth speed ramps, and motion studies' },
  { type: 'Hashtag', title: '#studyflow', subtitle: 'Study desk setups, notes, and productivity routines' },
  { type: 'Sound', title: 'Rain Window', subtitle: 'Moody audio for late-night and indoor clips' },
];

const notifications = [
  { title: '@skyshots liked your post', meta: '2m ago' },
  { title: '@travelgram started following you', meta: '18m ago' },
  { title: 'Your video hit 10K views', meta: '1h ago' },
  { title: '@streetlens mentioned you in a comment', meta: '3h ago' },
  { title: '@dailyframe saved your video', meta: '5h ago' },
  { title: '@motioncut shared your post', meta: '7h ago' },
  { title: '@campusvibes replied to your comment', meta: '9h ago' },
  { title: 'New followers from your latest reel', meta: '12h ago' },
  { title: '@nighttones tagged you in a post', meta: '1d ago' },
  { title: 'Your profile reached 25K views this week', meta: '2d ago' },
  { title: '@dailymoods commented: "This color grade is so clean"', meta: '2d ago' },
  { title: '@campuscutz mentioned you in a reel', meta: '3d ago' },
  { title: '@travelgram saved your sunset video', meta: '3d ago' },
  { title: '@food.trails liked 3 of your posts', meta: '4d ago' },
  { title: 'Your reel was added to Favorites by 28 people', meta: '4d ago' },
  { title: '@motionrepeat sent you a message request', meta: '5d ago' },
  { title: '@aesthetic.frames followed you back', meta: '5d ago' },
  { title: 'Your profile got 1,240 visits in the last 7 days', meta: '6d ago' },
  { title: '@street.notes shared your video to their story', meta: '6d ago' },
  { title: '@late.night.loops replied with 4 heart emojis', meta: '1w ago' },
  { title: 'You were tagged in a compilation post', meta: '1w ago' },
  { title: '@frames.by.ana invited you to collaborate', meta: '1w ago' },
  { title: '@campusvibes liked your comment', meta: '1w ago' },
  { title: 'Your latest upload crossed 50K impressions', meta: '1w ago' },
];

const draftItems = [
  'Morning campus walk draft',
  'Cafe transition edit',
  'Weekend outing cut',
  'Color-grade practice reel',
];

const searchCollections = [
  'Trending sounds',
  'Popular creators',
  'Nearby cafes',
  'Fashion transitions',
  'Editing tutorials',
  'Travel inspiration',
  'Campus life',
  'Photography reels',
  'Workout clips',
  'Study setup videos',
  'Food reviews',
  'Night drive edits',
];

const profileHighlights = [
  'Travel',
  'Campus',
  'Food',
  'Edits',
  'Sunsets',
  'Friends',
];

const savedCollections = [
  'Inspiration',
  'Audio ideas',
  'Transitions',
  'Outfits',
  'Food spots',
  'Travel shots',
  'Campus edits',
  'Color references',
  'Hooks to try',
  'Weekend plans',
  'Creator ideas',
  'Draft concepts',
];

const profileInsights = [
  { label: 'Profile views', value: '25.4K', note: 'Last 30 days' },
  { label: 'Video views', value: '184.2K', note: 'Across all posts' },
  { label: 'Comments', value: '3.8K', note: 'Audience engagement' },
  { label: 'Shares', value: '1.6K', note: 'Strongest on travel clips' },
  { label: 'Average watch', value: '18.4s', note: 'Per reel' },
  { label: 'Completion rate', value: '61%', note: 'Best in morning uploads' },
  { label: 'New followers', value: '1.2K', note: 'This month' },
  { label: 'Saved posts', value: '846', note: 'Most from edit tutorials' },
];

const profileAbout = [
  { label: 'Profession', value: 'Student and content creator' },
  { label: 'Interests', value: 'Video editing, travel, food, storytelling' },
  { label: 'Languages', value: 'English, Kannada, Hindi' },
  { label: 'Education', value: 'CMRIT' },
  { label: 'Content style', value: 'Short-form vertical reels and daily edits' },
  { label: 'Preferred niche', value: 'Lifestyle, campus, and aesthetic transitions' },
];

const inboxGroups = [
  {
    title: 'Messages',
    items: [
      '3 unread chats from followers',
      '1 collaboration request from @frames.by.ana',
      '2 replies to your recent story',
      'New message from @travelgram',
      'Pinned chat with @aesthetic.frames',
      'Audio suggestion shared by @motionrepeat',
    ],
  },
  {
    title: 'Creator updates',
    items: [
      '@food.trails uploaded 2 new reels',
      '@street.notes went live',
      '@urban.canvas posted a new tutorial',
      '@campuscutz shared a behind-the-scenes clip',
      '@fitcheck.now launched a new hashtag challenge',
      '@dailyframes_ saved your latest post',
    ],
  },
];

const followerList = [
  '@aesthetic.frames',
  '@travelgram',
  '@dailymoods',
  '@street.notes',
  '@food.trails',
  '@motionrepeat',
  '@urban.canvas',
  '@fitcheck.now',
  '@late.night.loops',
  '@campuscutz',
  '@platesandplaces',
  '@vibewithme',
  '@reelcraft',
  '@cozycorners',
  '@sunsetsignal',
  '@citywalks',
  '@snapandstroll',
  '@softfocusvids',
  '@frames.by.ana',
  '@cutscene.daily',
];

const initialProfile = {
  handle: '@sheethalgk',
  name: 'Sheethal GK',
  bio: 'Daily edits, campus stories, travel clips, and saved moments in vertical format.',
  location: 'Bengaluru, India',
  website: 'sheethalgk.creates',
  email: 'sheethalgk@example.com',
  phone: '+91 98765 43210',
};

function SearchScreen() {
  const [query, setQuery] = useState('');
  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
      return searchEntities;
    }

    return searchEntities.filter(
      (item) =>
        item.title.toLowerCase().includes(normalized) ||
        item.subtitle.toLowerCase().includes(normalized) ||
        item.type.toLowerCase().includes(normalized),
    );
  }, [query]);

  return (
    <main className="tab-screen">
      <div className="tab-screen__glow" aria-hidden="true" />
      <header className="tab-screen__header tab-screen__header--compact">
        <div className="search-shell">
          <input
            className="search-input"
            type="search"
            placeholder="Search creators, sounds, hashtags"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
      </header>

      <section className="topic-row" aria-label="Trending">
        {discoverTopics.map((topic) => (
          <article key={topic.title} className="topic-pill">
            <strong>{topic.title}</strong>
            <span>{topic.meta}</span>
          </article>
        ))}
      </section>

      <section className="tab-screen__stack">
        <article className="section-heading">
          <strong>Top searches</strong>
          <span>Updated for you</span>
        </article>
      </section>

      <section className="tab-screen__stack">
        {results.map((item) => (
          <article key={`${item.type}-${item.title}`} className="tab-card tab-card--search">
            <div>
              <p className="tab-card__eyebrow">{item.type}</p>
              <strong>{item.title}</strong>
              <p>{item.subtitle}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="tab-screen__stack">
        <article className="section-heading">
          <strong>Suggested accounts</strong>
          <span>Based on your watch history</span>
        </article>
        {followerList.map((handle, index) => (
          <article key={handle} className="tab-card tab-card--notification">
            <span className="tab-card__avatar" aria-hidden="true" />
            <div>
              <strong>{handle}</strong>
              <p>{8 + index} mutual connections</p>
            </div>
          </article>
        ))}
      </section>

      <section className="tab-screen__stack">
        <article className="section-heading">
          <strong>Collections</strong>
          <span>Explore more</span>
        </article>
        {searchCollections.map((item) => (
          <article key={item} className="tab-card">
            <span className="tab-card__dot" aria-hidden="true" />
            <span>{item}</span>
          </article>
        ))}
      </section>
    </main>
  );
}

function AddScreen() {
  return (
    <main className="tab-screen">
      <div className="tab-screen__glow" aria-hidden="true" />
      <header className="tab-screen__header">
        <p className="tab-screen__eyebrow">Create</p>
        <h1>Post a video</h1>
        <p>Choose your clip, cover frame, caption, and audience settings.</p>
      </header>

      <section className="composer-card">
        <div className="composer-preview">9:16</div>
        <div className="composer-fields">
          <article className="tab-card"><span className="tab-card__dot" aria-hidden="true" /><span>Upload video</span></article>
          <article className="tab-card"><span className="tab-card__dot" aria-hidden="true" /><span>Add caption</span></article>
          <article className="tab-card"><span className="tab-card__dot" aria-hidden="true" /><span>Select sound</span></article>
          <article className="tab-card"><span className="tab-card__dot" aria-hidden="true" /><span>Post settings</span></article>
        </div>
      </section>

      <section className="tab-screen__stack">
        <article className="section-heading">
          <strong>Drafts</strong>
          <span>Continue editing</span>
        </article>
        {draftItems.map((draft) => (
          <article key={draft} className="tab-card">
            <span className="tab-card__dot" aria-hidden="true" />
            <span>{draft}</span>
          </article>
        ))}
      </section>

      <section className="tab-screen__stack">
        <article className="section-heading">
          <strong>Posting checklist</strong>
          <span>Before publishing</span>
        </article>
        {['Add a cover image', 'Choose who can comment', 'Turn on captions', 'Pick a location tag'].map((item) => (
          <article key={item} className="tab-card">
            <span className="tab-card__dot" aria-hidden="true" />
            <span>{item}</span>
          </article>
        ))}
      </section>
    </main>
  );
}

function InboxScreen() {
  return (
    <main className="tab-screen">
      <div className="tab-screen__glow" aria-hidden="true" />
      <header className="tab-screen__header">
        <p className="tab-screen__eyebrow">Inbox</p>
        <h1>Activity</h1>
        <p>Latest likes, follows, mentions, and milestones for your account.</p>
      </header>

      <section className="tab-screen__stack">
        <article className="section-heading">
          <strong>Recent updates</strong>
          <span>Newest first</span>
        </article>
        {notifications.map((item) => (
          <article key={item.title} className="tab-card tab-card--notification">
            <span className="tab-card__avatar" aria-hidden="true" />
            <div>
              <strong>{item.title}</strong>
              <p>{item.meta}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="tab-screen__stack">
        <article className="section-heading">
          <strong>Earlier</strong>
          <span>Last 30 days</span>
        </article>
        {followerList.map((handle, index) => (
          <article key={`${handle}-${index}`} className="tab-card tab-card--notification">
            <span className="tab-card__avatar" aria-hidden="true" />
            <div>
              <strong>{handle} interacted with your content</strong>
              <p>{index + 2} weeks ago</p>
            </div>
          </article>
        ))}
      </section>

      {inboxGroups.map((group) => (
        <section key={group.title} className="tab-screen__stack">
          <article className="section-heading">
            <strong>{group.title}</strong>
            <span>More details</span>
          </article>
          {group.items.map((item) => (
            <article key={item} className="tab-card">
              <span className="tab-card__dot" aria-hidden="true" />
              <span>{item}</span>
            </article>
          ))}
        </section>
      ))}
    </main>
  );
}

function ProfileScreen({ profile, onProfileChange }) {
  const [isEditing, setIsEditing] = useState(false);

  const updateField = (field, value) => {
    onProfileChange((current) => ({
      ...current,
      [field]: value,
    }));
  };

  return (
    <main className="tab-screen">
      <div className="tab-screen__glow" aria-hidden="true" />
      <section className="profile-hero">
        <div className="profile-avatar" aria-hidden="true">SG</div>
        <h1>{profile.handle}</h1>
        <p className="profile-name">{profile.name}</p>
        <div className="profile-stats">
          <article><strong>15</strong><span>Posts</span></article>
          <article><strong>24.8K</strong><span>Followers</span></article>
          <article><strong>312</strong><span>Following</span></article>
          <article><strong>198.4K</strong><span>Likes</span></article>
        </div>
        <p className="profile-bio">{profile.bio}</p>
        <div className="profile-meta-list">
          <article className="profile-meta-item">
            <span>Location</span>
            <strong>{profile.location}</strong>
          </article>
          <article className="profile-meta-item">
            <span>Website</span>
            <strong>{profile.website}</strong>
          </article>
          <article className="profile-meta-item">
            <span>Email</span>
            <strong>{profile.email}</strong>
          </article>
          <article className="profile-meta-item">
            <span>Phone</span>
            <strong>{profile.phone}</strong>
          </article>
        </div>
        <div className="profile-actions">
          <button
            type="button"
            className="profile-button profile-button--primary"
            onClick={() => setIsEditing((current) => !current)}
          >
            {isEditing ? 'Close editor' : 'Edit profile'}
          </button>
          <button type="button" className="profile-button">Share profile</button>
        </div>
      </section>

      <section className="tab-screen__stack">
        <article className="section-heading">
          <strong>Profile details</strong>
          <span>Visible information</span>
        </article>
        <div className="profile-meta-list">
          <article className="profile-meta-item">
            <span>Location</span>
            <strong>{profile.location}</strong>
          </article>
          <article className="profile-meta-item">
            <span>Website</span>
            <strong>{profile.website}</strong>
          </article>
          <article className="profile-meta-item">
            <span>Email</span>
            <strong>{profile.email}</strong>
          </article>
          <article className="profile-meta-item">
            <span>Phone</span>
            <strong>{profile.phone}</strong>
          </article>
        </div>
      </section>

      <section className="tab-screen__stack">
        <article className="section-heading">
          <strong>Insights</strong>
          <span>Performance overview</span>
        </article>
        <div className="insight-grid">
          {profileInsights.map((item) => (
            <article key={item.label} className="insight-card">
              <span>{item.label}</span>
              <strong>{item.value}</strong>
              <p>{item.note}</p>
            </article>
          ))}
        </div>
      </section>

      {isEditing ? (
        <section className="tab-screen__stack">
          <article className="section-heading">
            <strong>Edit details</strong>
            <span>Changes update instantly</span>
          </article>
          <div className="profile-editor">
            <label className="profile-field">
              <span>Handle</span>
              <input
                value={profile.handle}
                onChange={(event) => updateField('handle', event.target.value)}
              />
            </label>
            <label className="profile-field">
              <span>Name</span>
              <input
                value={profile.name}
                onChange={(event) => updateField('name', event.target.value)}
              />
            </label>
            <label className="profile-field">
              <span>Bio</span>
              <textarea
                rows="4"
                value={profile.bio}
                onChange={(event) => updateField('bio', event.target.value)}
              />
            </label>
            <label className="profile-field">
              <span>Location</span>
              <input
                value={profile.location}
                onChange={(event) => updateField('location', event.target.value)}
              />
            </label>
            <label className="profile-field">
              <span>Website</span>
              <input
                value={profile.website}
                onChange={(event) => updateField('website', event.target.value)}
              />
            </label>
            <label className="profile-field">
              <span>Email</span>
              <input
                value={profile.email}
                onChange={(event) => updateField('email', event.target.value)}
              />
            </label>
            <label className="profile-field">
              <span>Phone</span>
              <input
                value={profile.phone}
                onChange={(event) => updateField('phone', event.target.value)}
              />
            </label>
          </div>
        </section>
      ) : null}

      <section className="tab-screen__stack">
        <article className="section-heading">
          <strong>Highlights</strong>
          <span>Stories you saved</span>
        </article>
        <div className="mini-chip-row">
          {profileHighlights.map((item) => (
            <article key={item} className="mini-chip">
              <span className="mini-chip__circle" aria-hidden="true" />
              <span>{item}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="tab-screen__stack">
        <article className="section-heading">
          <strong>About</strong>
          <span>More information</span>
        </article>
        {profileAbout.map((item) => (
          <article key={item.label} className="tab-card tab-card--search">
            <div>
              <p className="tab-card__eyebrow">{item.label}</p>
              <strong>{item.value}</strong>
            </div>
          </article>
        ))}
      </section>

      <section className="profile-grid" aria-label="Posts">
        {videoItems.map((item) => (
          <article
            key={item.id}
            className="profile-tile"
            style={{
              backgroundImage: `linear-gradient(160deg, hsl(${item.avatarSeed * 18} 72% 54%), hsl(${item.avatarSeed * 12 + 60} 72% 28%))`,
            }}
          >
            <span>{item.username}</span>
          </article>
        ))}
      </section>

      <section className="tab-screen__stack">
        <article className="section-heading">
          <strong>Saved collections</strong>
          <span>Private</span>
        </article>
        {savedCollections.map((item) => (
          <article key={item} className="tab-card">
            <span className="tab-card__dot" aria-hidden="true" />
            <span>{item}</span>
          </article>
        ))}
      </section>

      <section className="tab-screen__stack">
        <article className="section-heading">
          <strong>Followers</strong>
          <span>Top interactions</span>
        </article>
        {followerList.map((handle, index) => (
          <article key={`${handle}-profile`} className="tab-card tab-card--notification">
            <span className="tab-card__avatar" aria-hidden="true" />
            <div>
              <strong>{handle}</strong>
              <p>{index % 2 === 0 ? 'Follows you' : 'Mutual friend and frequent viewer'}</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState('For You');
  const [darkMode, setDarkMode] = useState(true);
  const [activePage, setActivePage] = useState('Home');
  const [profile, setProfile] = useState(initialProfile);

  return (
    <div className={`app-shell${darkMode ? ' theme-dark' : ' theme-light'}`}>
      <div className="device-frame">
        {activePage === 'Home' ? (
          <>
            <HeaderNav
              activeTab={activeTab}
              onTabChange={setActiveTab}
              darkMode={darkMode}
              onToggleDarkMode={() => setDarkMode((current) => !current)}
            />
            <VideoFeed items={videoItems} />
          </>
        ) : activePage === 'Search' ? (
          <SearchScreen />
        ) : activePage === 'Add' ? (
          <AddScreen />
        ) : activePage === 'Inbox' ? (
          <InboxScreen />
        ) : activePage === 'Profile' ? (
          <ProfileScreen profile={profile} onProfileChange={setProfile} />
        ) : (
          <SearchScreen />
        )}
        <BottomNav activePage={activePage} onNavigate={setActivePage} />
      </div>
    </div>
  );
}

export default App;
