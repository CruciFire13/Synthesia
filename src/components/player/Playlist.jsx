import React from "react";
import "../../css/mainArea/Playlist.css";

const Playlist = ({ onSelectMood, selectedMood }) => {
  const items = [
    {
      id: 1,
      label: "Workout",
      img: "https://media.istockphoto.com/id/904837138/vector/folded-white-paper-heart-icon-with-shadow-on-red-background-minimal-flat-red-love-symbol.jpg?s=170667a&w=0&k=20&c=CmncVqn5htsD8x6ENBt2bLnhyUluMJuD8VpZbPEwHWE=",
    },
    {
      id: 2,
      label: "Chill",
      img: "https://media.istockphoto.com/id/1073941846/vector/3d-sound-waves-with-colored-dots-big-data-abstract-visualization.jpg?s=612x612&w=0&k=20&c=duxGn_eTDtlYqKyLvv0OAHibwv0dA5xRU3TGQEgGjwQ=",
    },
    {
      id: 3,
      label: "Happy",
      img: "https://thumbs.dreamstime.com/b/cassette-tape-eighties-inspired-retro-colors-vintage-music-theme-blended-modern-art-deep-space-elements-featuring-mix-414923588.jpg",
    },
    {
      id: 4,
      label: "Relaxing",
      img: "https://media.istockphoto.com/id/636342222/photo/man-running-outdoors.jpg?s=612x612&w=0&k=20&c=i-igbJRtN_-xux2ErLQMNUBQ9ekRsMxTymv_5TlVJgU=",
    },
    {
      id: 5,
      label: "Rock",
      img: "https://media.istockphoto.com/id/958707426/vector/monochrome-antique-hipster-vintage-label-badge-crest-rock-and-roll-for-flyer-poster-logo-or-t.jpg?s=1024x1024&w=is&k=20&c=bES_zaAIR4z4IcvRQQeUq9fjcc7pGGxzuV_2Hi_ziS4=",
    },
  ];

  return (
    <div className="playlist-root">
      <h2 className="playlist-title">Playlists</h2>
      <div className="playlist-wrapper">
        <div className="playlist-grid">
          {/* "All" Card to reset filter */}
          <div
            className={`playlist-card ${selectedMood === "All" ? "active-card" : ""}`}
            onClick={() => onSelectMood("All")}
            style={{
              minWidth: "100px",
              background:
                selectedMood === "All" ? "rgba(168, 85, 247, 0.3)" : "",
            }}
          >
            <div
              className="playlist-image"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#222",
              }}
            >
              <span>All</span>
            </div>
            <span className="playlist-label">All Songs</span>
          </div>

          {items.map((item) => (
            <div
              key={item.id}
              className={`playlist-card ${selectedMood === item.label ? "active-card" : ""}`}
              onClick={() => onSelectMood(item.label)}
              style={{
                // Highlight the active card
                border: selectedMood === item.label ? "1px solid #a855f7" : "",
                background:
                  selectedMood === item.label ? "rgba(168, 85, 247, 0.15)" : "",
              }}
            >
              <img src={item.img} alt={item.label} className="playlist-image" />
              <span className="playlist-label">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Playlist;
