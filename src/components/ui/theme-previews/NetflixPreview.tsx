// src/components/ui/theme-previews/NetflixPreview.tsx

import { Play, Plus } from "lucide-react";

// Interface de props simplificada, apenas para o preview
interface PreviewProps {
  name1: string;
  name2: string;
  uploadedImage: string | null;
}

const NetflixPreview = ({ name1, name2, uploadedImage }: PreviewProps) => {
  const bannerTitle =
    name1 && name2 ? `${name1} & ${name2}` : "Nossa História de Amor";
  const bannerDescription =
    "Uma série de momentos inesquecíveis, risadas e muito carinho.";

  return (
    <div className="bg-black text-white min-h-[400px] font-sans pointer-events-none">
      {/* Header simplificado */}
      <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 to-transparent z-10 flex justify-between items-center">
        <div className="text-red-600 font-bold text-xl uppercase tracking-widest">
          Netflix
        </div>
      </div>

      {/* Hero Banner */}
      <div className="relative h-72">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent z-10 flex flex-col justify-center p-8">
          <h1 className="text-4xl font-extrabold mb-2">{bannerTitle}</h1>
          <p className="text-sm max-w-md text-gray-200 mb-4">
            {bannerDescription}
          </p>
          <div className="flex gap-2">
            <button className="bg-white text-black px-6 py-2 rounded flex items-center gap-2 font-semibold">
              <Play size={20} className="fill-black" />
              Assistir
            </button>
            <button className="bg-gray-700/80 text-white px-6 py-2 rounded flex items-center gap-2">
              <Plus size={20} />
              Minha Lista
            </button>
          </div>
        </div>
        <img
          src={
            uploadedImage ||
            "https://via.placeholder.com/1200x480/FF0000/000000?text=Sua+Foto+Aqui"
          }
          alt="Banner Preview"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black"></div>
      </div>

      {/* Movie Grid Falso */}
      <div className="p-4 -mt-10 relative z-10">
        <h2 className="font-semibold mb-2">Nossos Momentos</h2>
        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="aspect-[2/3] bg-neutral-800 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NetflixPreview;
