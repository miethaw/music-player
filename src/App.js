import React, { Children, useEffect, useState } from "react";
import {
  Search,
  Home,
  Music,
  ListMusic,
  User,
  BarChart2,
  Plus,
  Play,
  SkipBack,
  SkipForward,
  Repeat,
  Volume2,
  Maximize2,
  Bell,
  CirclePlus,
  ListVideo,
  Heart,
  DotIcon,
  Ellipsis,
  ArrowDownNarrowWide,
  ChevronDown,
  CirclePause,
} from "lucide-react";

import user from "./assets/images/user.jpg";
import music from "./assets/images/music.webp";
import { fetchAlbumData } from "./service/MusicPlayerService";

import moment from "moment";
import ReactPlayer from "react-player";
import { Toaster, toast } from 'sonner'

const App = () => {
  const [trackList, setTrackList] = useState([]);
  const [selectedMusic, setSelectedMusic] = useState(null);
  const [savedToFavorite, setSaveToFavorite] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [played, setPlayed] = useState(0);
  const getAlbumData = async () => {
    const data = await fetchAlbumData();
    setTrackList(data?.mvids);
  };
  useEffect(() => {
    getAlbumData();
  }, []);

  const toggleFavorite = (track) => {
    setSaveToFavorite((prevFavorites) => {
      // Check if the track is already in the favorites list
      if (prevFavorites.find((fav) => fav.idTrack === track.idTrack)) {
        // If it is, remove it from the favorites
        return prevFavorites.filter((fav) => fav.idTrack !== track.idTrack);
      } else {
        // If it isn’t, add it to the favorites
        return [...prevFavorites, track];
      }
    });
  };

  const handleProgress = (state) => {
    setPlayed(state.played); // Update played percentage
  };

  const handleDuration = (duration) => {
    setDuration(duration); // Set the duration once the player loads
  };

  const handleSeek = (e) => {
    const progressBar = e.target;
    const clickPosition = e.clientX - progressBar.getBoundingClientRect().left; // Position of click
    const newPlayed = clickPosition / progressBar.offsetWidth; // Calculate the new played fraction
    setPlayed(newPlayed);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };


  return (
    <div className="min-h-screen bg-gray-100">
      {/* Left Sidebar */}
      <Toaster position="top-right" />
      <div
        className="flex bg-white z-20 relative shadow-lg  rounded-3xl"
        style={{ marginBottom: -60 }}
      >
        <aside
          className="w-64 bg-white fixed left-0 top-0 border-gray-200 px-6 py-7 z-20"
          style={{ borderBottomLeftRadius: 30 }}
        >
          {/* User Profile */}
          <div className="flex items-center space-x-3 mb-11">
            <img
              src={user}
              alt={"user"}
              className=" w-12 h-12 rounded-full object-fit "
            />
            <div>
              <div className="font-semibold flex items-center">
                Joshua
                <ChevronDown className="w-5 h-5 pl-1" />
              </div>
              <p className=" text-sm border px-1">PREMIUM</p>
            </div>
          </div>

          {/* Navigation */}
          <div className=" space-y-14 mb-10">
            {/* Browse Section */}
            <div>
              <h2 className="text-md font-semibold text-gray-400 mb-4">
                BROWSE
              </h2>
              <ul className=" space-y-5 font-semibold">
                <ListItem itemName={"Home"}>
                  <Home size={20} />
                </ListItem>
                <ListItem itemName={"Songs"}>
                  <Music size={20} />
                </ListItem>
                <ListItem itemName={"Playlists"}>
                  <ListMusic size={20} />
                </ListItem>
                <ListItem itemName={"Just for You"}>
                  <User size={20} />
                </ListItem>
                <ListItem itemName={"Top Charts"}>
                  <BarChart2 size={20} />
                </ListItem>
              </ul>
            </div>

            {/* Playlists Section */}
            <div>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-md font-semibold text-gray-400">
                  YOUR PLAYLISTS
                </h2>
                <CirclePlus className="text-gray-400 cursor-pointer h-5 w-5 hover:text-gray-600" />
              </div>
              <ul className="space-y-5  font-semibold text-gray-500">
                <ListItem itemName={" Workout Mix"}>
                  <ListVideo className="w-5 h-5" />
                </ListItem>
                <ListItem itemName={" Chillin' at Home"}>
                  <ListVideo className="w-5 h-5" />
                </ListItem>
                <ListItem itemName={" Booping at Adobe"}>
                  <ListVideo className="w-5 h-5" />
                </ListItem>
                <ListItem itemName={" XD 4 Life"}>
                  <ListVideo className="w-5 h-5" />
                </ListItem>
              </ul>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="ml-64 flex-1 p-8 mb-20 z-20">
          {/* Top Search Bar */}
          <div className="flex justify-between items-center mb-8">
            <div className="relative flex-1 max-w-2xl">
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search for songs, artists, albums"
                className="w-full pl-10 pr-4 py-2 border rounded-full bg-white"
              />
            </div>
            <div className="ml-4 relative">
              <Bell className="text-gray-600 cursor-pointer" size={20} />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-pink-500 rounded-full"></div>
            </div>
          </div>

          {/* Featured Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl p-8 text-white cursor-pointer transition-transform hover:scale-[1.02]">
              <h2 className="text-4xl font-bold mb-2">GET LOST</h2>
              <p className="text-pink-100 mb-4">in your music.</p>
              <button className="p-3 bg-white/20 rounded-full hover:bg-white/30">
                <Play className="text-white" size={24} />
              </button>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-8 text-white cursor-pointer transition-transform hover:scale-[1.02]">
              <h2 className="text-4xl font-bold mb-2">MEL</h2>
              <p className="text-blue-100 mb-4">beats.</p>
              <button className="p-3 bg-white/20 rounded-full hover:bg-white/30">
                <Play className="text-white" size={24} />
              </button>
            </div>
          </div>

          {/* Recently Played Section */}
          <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 md:grid-cols-1 sm:grid-cols-1">
            <div className="mb-8 basis-1/2">
              <h3 className="text-xl font-semibold mb-4">Recently Played</h3>
              <div className="space-y-3">
                {trackList?.length > 0 &&
                  trackList &&
                  trackList.slice(0, 5)?.map((track, index) => {
                    const duration = moment.duration(track.intDuration);

                    const minutes = Math.floor(duration.asMinutes());
                    const seconds = duration.seconds();
                    return (
                      <div
                        key={track.idTrack}
                        className="flex items-center w-full justify-between bg-white p-4 rounded-lg hover:bg-gray-50 cursor-pointer"
                        onClick={() => {setSelectedMusic(track);setIsPlaying(false);}}
                      >
                        <div className="basis-11/12 grid  grid-cols-6  space-x-4 space-y-4">
                          {/* <div className="w-12 h-12 bg-gray-200 rounded col-span-1"></div> */}
                          <img
                            src={music}
                            alt={"music"}
                            className=" w-12 h-12 rounded-full object-fit "
                          />
                          <div className="font-semibold col-span-2 text-left">
                            {track.strTrack}
                          </div>
                          <div className="text-sm text-gray-500 col-span-1">
                            {track.strArtist}
                          </div>
                          <div className="text-sm text-gray-500 col-div-1">
                            {minutes + ":" + seconds}
                          </div>
                          <div
                            className="col-span-1"
                            onClick={() => toggleFavorite(track)}
                          >
                            <Heart
                              className={`w-4 h-4 ${
                                savedToFavorite?.length > 0 &&
                                savedToFavorite?.filter(
                                  (c) => c.idTrack === track.idTrack
                                )?.length > 0
                                  ? "text-red-600 font-extrabold"
                                  : "text-black"
                              }`}
                            />
                          </div>
                        </div>
                        <div className=" basis-1/12  flex justify-end">
                          <Ellipsis className="w-4 h-4" />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Recommendations Section */}
            <div className="basis-1/2 mx-3">
              <h3 className="text-xl font-semibold mb-2">
                Recommended For You
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {trackList?.length > 0 &&
                  trackList &&
                  trackList.slice(10, 13)?.map((item, index) => (
                    <div
                      key={index}
                      className="bg-white p-4 rounded-lg hover:bg-gray-50 cursor-pointer"
                      onClick={() => {setSelectedMusic(item); setIsPlaying(false);}}
                    >
                      <div className="w-full aspect-square bg-gray-200 rounded-lg mb-4"></div>
                      <p className="font-medium">{item.strTrack}</p>
                      <p className="text-sm text-gray-500">{item.strArtist}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Player Bar */}
      <div
        className=" bottom-0 left-0 right-0 bg-pink-400 border-t border-gray-200 p-5 "
        style={{ marginTop: 50 }}
      >
        <div className="flex items-center justify-between max-w-screen-2xl mx-auto">
          <div className="flex items-center space-x-4">
           
            <img
              src={music}
              alt={"music"}
              className=" w-12 h-12 rounded-full object-fit "
              style={{
                animation: isPlaying ? 'rotate 10s linear infinite' : 'none',
              }}
            />
            <div>
              <p className="font-medium">
                {selectedMusic ? selectedMusic?.strTrack : "No song selected!"}
              </p>
              <p className="text-sm text-gray-500">
                {selectedMusic ? selectedMusic?.strArtist : "No song selected!"}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <SkipBack size={20} className="text-gray-600 cursor-pointer" />
            <div className="p-2 bg-pink-500 rounded-full cursor-pointer">
              {isPlaying ? (
                <CirclePause
                  size={24}
                  className="text-white"
                  onClick={() => setIsPlaying(!isPlaying)}
                />
              ) : (
                <Play
                  size={24}
                  className="text-white"
                  onClick={() =>{selectedMusic ? setIsPlaying(!isPlaying) : toast.warning('Please select music first!') }}
                />
              )}
            </div>
            <SkipForward size={20} className="text-gray-600 cursor-pointer" />
          </div>

          <div className="flex  basis-1/4 items-center space-x-4">
            <p style={{ textAlign: "center", marginTop: "10px" }}>
              {formatTime(Math.floor(played * duration))}
            </p>
            <div
              style={{
                width: "100%",
                height: "10px",
                background: "#ddd",
                position: "relative", 
                marginTop: "10px",
                borderRadius: 10,
              }}
            >
              <div
                style={{
                  width: `${played * 100}%`, // Width of the progress based on the played fraction
                  height: "100%",
                  background: "deeppink", // Progress color
                  transition: "width 0.1s ease", // Smooth transition for the progress
                  position: "relative",
                  borderRadius: 10,
                }}
              ></div>
            </div>
            <p style={{ textAlign: "center", marginTop: "10px" }}>
              {formatTime(Math.floor(duration))}
            </p>
           
          </div>
        </div>
      </div>
      {selectedMusic && (
        <ReactPlayer
          url={selectedMusic?.strMusicVid}
          playing={isPlaying}
          onProgress={handleProgress}
          onDuration={handleDuration}
          width="1px"
          height="1px"
        />
      )}
    </div>
  );
};

export default App;

const ListItem = ({ itemName, children }) => {
  return (
    <li
      className={`flex items-center space-x-3 ${
        itemName == "Home" ? "text-gray-700" : "text-gray-500"
      } hover:text-gray-900 cursor-pointer`}
    >
      {children}
      <span>{itemName}</span>
    </li>
  );
};
