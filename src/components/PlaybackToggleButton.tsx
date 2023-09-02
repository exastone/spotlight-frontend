interface PlaybackToggleButtonProps {
    player: any; // Update with the correct type for the player instance
}

const PlaybackToggleButton: React.FC<PlaybackToggleButtonProps> = ({ player }) => {

    const togglePlayback = () => {
        if (player) {
            player.togglePlay().then(() => {
                console.log("Playback toggled");
            }).catch((error: Error) => {
                console.error("Error toggling playback", error);
            });
        }
    };

    return (
        <button onClick={togglePlayback}>Toggle Playback</button>
    );
};

export default PlaybackToggleButton;
