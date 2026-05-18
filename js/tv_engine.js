// ==========================================================================
// RETROVISION NET - CORE 12-CHANNEL ENGINE WITH VALID USA VIDEO IDs
// ==========================================================================

const channels = [
    { name: "CH 01: SATURDAY MORNING TOONS", videoId: "89_vfeS9_9U", title: "Classic Toons" },      // Looney Tunes / Popeye Archive
    { name: "CH 02: MTV RETRO VAULT",        videoId: "A732Z7Nf_nU", title: "80s MTV Live" },      // 80s MTV Broadcast
    { name: "CH 03: MIDNIGHT HORROR",       videoId: "V_gOk3wE-6Q", title: "Classic Horror" },    // Retro Monster Movies
    { name: "CH 04: RETRO GAMING ZONE",     videoId: "m9IIn7-Q9_E", title: "Arcade History" },    // 90s Gaming VHS
    { name: "CH 05: SYNTHWAVE CHILL RADIO",  videoId: "4xDzrJKXOOY", title: "Neon Cyber Drive" },  // Synthwave radio
    { name: "CH 06: VINTAGE COMMERCIALS",    videoId: "z3fK2N8kS8U", title: "80s-90s USA Ads" },   // Old commercials pack
    { name: "CH 07: CLASSIC SITCOMS",       videoId: "yS74vS_77Q4", title: "Vintage TV Shows" },  // Public domain sitcoms
    { name: "CH 08: MYSTERY & UFO REPORT",   videoId: "GZ70uVreL-E", title: "Paranormal Files" },  // 90s UFO / Bigfoot
    { name: "CH 09: VINTAGE TRUE CRIME",     videoId: "ZpP7O78B_0A", title: "Cold Case VHS" },     // Old FBI cases
    { name: "CH 10: RETRO ACTION CINEMA",    videoId: "R73vS2l8R_8", title: "80s Action Reel" },   // Classic action loops
    { name: "CH 11: DEEP OCEAN RELAXATION",  videoId: "W0I_SskESwU", title: "Whales & Dolphins" }, // Ocean Relax Soundscapes
    { name: "CH 12: RETRO SPACE CHILL",      videoId: "N3oCS85HvpY", title: "Ambient Space Loop" } // Cosmic retro mix
];

let currentChannelIndex = 0;
let ytPlayer = null;

function onYouTubeIframeAPIReady() {
    ytPlayer = new YT.Player('yt_embed_player', {
        height: '100%',
        width: '100%',
        videoId: channels[currentChannelIndex].videoId,
        playerVars: {
            'autoplay': 1,
            'controls': 0,
            'disablekb': 1,
            'modestbranding': 1,
            'rel': 0,
            'showinfo': 0,
            'iv_load_policy': 3,
            'fs': 0
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    event.target.playVideo();
    switchChannel(0);
    initAntiPauseHack();
    setInterval(updateTimecode, 1000);
}

function onPlayerStateChange(event) {
    const status = document.getElementById('videoStatus');
    if (event.data === YT.PlayerState.PLAYING) {
        status.innerText = "SIGNAL LOCK: BROADCAST OK";
        status.style.color = "#00ff66";
    }
    if (event.data === YT.PlayerState.BUFFERING) {
        status.innerText = "TUNING FEED: BUFFERING SIGNAL";
        status.style.color = "#ffaa00";
    }
    if (event.data === YT.PlayerState.PAUSED) {
        status.innerText = "SIGNAL HOLD: STANDBY";
        status.style.color = "#ff0055";
        ytPlayer.playVideo(); // Force play through accidental freezes
    }
}

function switchChannel(index) {
    if (index < 0 || index >= channels.length) return;
    currentChannelIndex = index;

    document.getElementById('nowPlaying').innerText = channels[index].name;
    document.getElementById('videoStatus').innerText = "TUNING FEED...";
    document.getElementById('videoStatus').style.color = "#ffaa00";

    const buttons = document.querySelectorAll('.btn-ch');
    buttons.forEach((btn, i) => {
        if (i === index) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    if (ytPlayer && typeof ytPlayer.loadVideoById === 'function') {
        // Random start offset to simulate real dynamic channel flipping
        const randomStart = Math.floor(Math.random() * 1800);
        ytPlayer.loadVideoById({
            videoId: channels[currentChannelIndex].videoId,
            startSeconds: randomStart
        });
    }
}

function initAntiPauseHack() {
    setInterval(() => {
        window.dispatchEvent(new Event('mousemove'));
        window.dispatchEvent(new Event('scroll'));
    }, 60000); 
}

function updateTimecode() {
    if (ytPlayer && typeof ytPlayer.getCurrentTime === 'function') {
        const totalSecs = Math.floor(ytPlayer.getCurrentTime()) || 0;
        const h = Math.floor(totalSecs / 3600).toString().padStart(2, '0');
        const m = Math.floor((totalSecs % 3600) / 60).toString().padStart(2, '0');
        const s = (totalSecs % 60).toString().padStart(2, '0');
        document.getElementById('streamTime').innerText = `BROADCAST TIMECODE: ${h}:${m}:${s}`;
    }
}

document.getElementById('unmuteBtn').addEventListener('click', function() {
    this.style.background = "#00ff66";
    this.style.color = "#000";
    this.innerText = "✓ RETRO DECODER ENGAGED. AUDIO ONLINE.";
    
    setTimeout(() => {
        this.style.display = 'none';
        if (ytPlayer && typeof ytPlayer.unMute === 'function') {
            ytPlayer.unMute();
            ytPlayer.setVolume(80);
            ytPlayer.playVideo();
        }
    }, 800);
});