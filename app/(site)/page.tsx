import getSongs from "@/actions/getSongs";

import Header from "@/components/Header";
import ListItem from "@/components/ListItem";

export const revalidate = 0; // No re cache this page

export default async function Home() {
  const songs = await getSongs();

  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header>
        <div className="mb-2">
          <h1 className="text-white text-3xl font-semibold">
            Bienvenido otra vez
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
            <ListItem
              image="/images/liked.png"
              name="Tus me gusta"
              href="liked"
            />
          </div>
        </div>
      </Header>
      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">
            Nuevas canciones
          </h1>
        </div>
        <div>
          {songs.map((song) => (
            <div key={song.id}>{song.title}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
