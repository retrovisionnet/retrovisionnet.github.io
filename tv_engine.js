const channels = [
    { name: "CH 01: GOLDEN AGE TOONS (Classic Cartoons: Popeye, Bugs Bunny)", videoId: "dQw4w9WgXcQ" }, 
    { name: "CH 02: 90s/00s CARTOON VAULT (Nickelodeon & Cartoon Network Blocks)", videoId: "4isAsbWep64" }, 
    { name: "CH 03: FAMILY RETRO VAULT (Vintage Fairy Tales & Magic Movies)", videoId: "p87wz_L7v_c" }, 
    { name: "CH 04: MTV 80s BROADCAST (Original 1980s Airtime with Retro Commercials)", videoId: "KRp0hBLqhX8" }, 
    { name: "CH 05: MTV 90s ALTERNATIVE (Grunge, Rock Era & VHS Video Clips)", videoId: "683O-C7vE6Y" }, 
    { name: "CH 06: CLASSIC SITCOMS (Old School Comedies of Golden TV Era)", videoId: "2M6E7O5m-uA" }, 
    { name: "CH 07: MIDNIGHT HORROR (24/7 Retro Creepshows, Monsters & Aliens)", videoId: "5vVbCH_kY6A" }, 
    { name: "CH 08: DRIVE-IN THEATER (Vintage Western Movies & Classic Cowboys)", videoId: "ZpP7O78B_0A" }, 
    { name: "CH 09: MYSTERY TV (Paranormal Archives, UFOs & Twilight Zone Vibes)", videoId: "yS74vS_77Q4" }, 
    { name: "CH 10: VINTAGE TRUE CRIME (Historical US Criminal Investigations)", videoId: "GZ70uVreL-E" }, 
    { name: "CH 11: RETRO ACTION (80s Action Movies, Muscle Car Chases & Explosions)", videoId: "W0I_SskESwU" }, 
    { name: "CH 12: DEEP OCEAN RELAX 🔥 (Dolphins, Whales, Waves & Deep Sleep Ambience)", videoId: "R73vS2l8R_8" }  
];

let currentChannelIndex = 0;
let isUnmuted = false;

// CLICK INTERCEPTION AND VOLUME RE-ROUTE RULES
function unmuteTelevision() {
    isUnmuted = true;
    
    // 1. Destroy overlay blocker asset
    const overlay = document.getElementById('unmuteOverlay');
    if (overlay) overlay.remove();

    // 2. Reload current track with sound ON and forced autoplay
    const iframe = document.getElementById('yt_embed_player');
    if (iframe) {
        iframe.src = `https://www.youtube.com/embed/${channels[currentChannelIndex].videoId}?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1&iv_load_policy=3`;
    }

    // 3. System feed response text update
    const statusText = document.getElementById('videoStatus');
    if (statusText) statusText.innerText = "SIGNAL LOCK: ONLINE (AUDIO AUDIO LEVEL 100%)";
}

// STATION MATRIX TUNER
function switchChannel(index) {
    if (index < 0 || index >= channels.length) return;
    currentChannelIndex = index;

    const nowPlayingElement = document.getElementById('nowPlaying');
    if (nowPlayingElement) {
        nowPlayingElement.innerText = channels[index].name;
    }
    
    const buttons = document.querySelectorAll('.btn-ch');
    buttons.forEach((btn, i) => {
        if (i === index) btn.classList.add('active');
        else btn.classList.remove('active');
    });

    const iframe = document.getElementById('yt_embed_player');
    if (iframe) {
        // If user already unmuted the stream, load next target with sound on, else keep it muted
        const muteParam = isUnmuted ? "mute=0" : "mute=1";
        iframe.src = `https://www.youtube.com/embed/${channels[index].videoId}?autoplay=1&${muteParam}&controls=1&rel=0&modestbranding=1&iv_load_policy=3`;
    }
}