import React from "react";
import { useEffect, useState } from "react";

import { PlayIcon } from "@heroicons/react/24/solid";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

function RecentlyPlayedList({ setView, setGlobalPlaylistId }) {
  const { data: session } = useSession();
  const [playlists, setPlaylists] = useState([]);

  function setplaylistfunct(playlist) {
    console.log("setplaylistfunct");
    setGlobalPlaylistId(playlist.id);
    setView("playlist");
  }

  useEffect(() => {
    async function fetchPlaylists() {
      if (session && session.accessToken) {
        const response = await fetch(
          "https://api.spotify.com/v1/me/playlists?limit=6&offset=1",
          {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          }
        );
        const data = await response.json();
        setPlaylists(data.items);
      }
    }
    fetchPlaylists();
  }, [session]);

  return (
    <div className="flex flex-col  bg-gradient-to-b from-indigo-500  pt-24 gap-4 px-8 ">
      <div className="flex flex-wrap gap-6">
        {playlists&&playlists.length > 0 ? (
          playlists.map((playlist) => (
            <div
              key={playlist.id}
              onClick={() => setplaylistfunct(playlist)}
              className="cursor-pointer relative group flex flex-row flex-grow flex-wrap gap-6 items-center justify-start bg-gray-500 bg-opacity-40 backdrop-blur-lg hover:bg-gray-600 hover:bg-opacity-70 rounded-md"
            >
              <div className="absolute opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-200 shadow-2xl shadow-neutral-900 z-10 h-12 w-12 flex items-center justify-center rounded-full bg-green-500 top-[10px] group-hover:top-[15px] right-3">
                <PlayIcon className="h-6 w-6 text-black" />
              </div>
              <Image
                width={500}
                height={500}
                className="w-20 h-20 shadow-sm rounded-s-lg"
                src={playlist.images[0].url}
                alt={playlist.name}
              />
              <p className="text-base text-white w-[180px] flex flex-wrap pr-1">
                {playlist.name}
              </p>
            </div>
          ))
        ) : (
          <div className="text-white">No recently played playlists</div>
        )}
      </div>
    </div>
  );
}

export default RecentlyPlayedList;

{
  /* <div
key={playlist.id}
onClick={() => setplaylistfunct(playlist)}
className="cursor-pointer relative group flex flex-row flex-grow flex-wrap gap-6 items-center justify-start bg-gray-500 bg-opacity-40 backdrop-blur-lg hover:bg-gray-600 hover:bg-opacity-70 rounded-md"
>
<div className="absolute opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-200 shadow-2xl shadow-neutral-900 z-10 h-12 w-12 flex items-center justify-center rounded-full bg-green-500 top-[10px] group-hover:top-[15px] right-3">
  <PlayIcon className="h-6 w-6 text-black" />
</div>
<Image
  width={500}
  height={500}
  className="w-20 h-20 shadow-sm rounded-s-lg"
  src={playlist.images[0].url}
  alt={playlist.name}
/>
<p className="text-base text-white w-[180px] flex flex-wrap pr-1">
  {playlist.name}
</p>
</div> */
}
