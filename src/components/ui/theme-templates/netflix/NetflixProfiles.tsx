// src/components/ui/theme-templates/netflix/NetflixProfiles.tsx

import { User } from "lucide-react";
import { NetflixThemeData } from "../types";

interface NetflixProfilesProps {
  data: NetflixThemeData;
  onProfileSelect: () => void; // Função para ser chamada quando um perfil é clicado
}

const NetflixProfiles = ({ data, onProfileSelect }: NetflixProfilesProps) => {
  const { name1, profileImage1, name2, profileImage2 } = data;

  const Profile = ({ name, image }: { name: string; image: string | null }) => (
    <div
      className="flex flex-col items-center gap-2 cursor-pointer group"
      onClick={onProfileSelect}
    >
      <div className="w-24 h-24 md:w-36 md:h-36 rounded-md overflow-hidden bg-gray-700 group-hover:border-4 border-gray-400 transition-all flex items-center justify-center">
        {image ? (
          <img
            src={image}
            alt={`Perfil de ${name}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <User size={48} className="text-gray-500" />
        )}
      </div>
      <p className="text-gray-400 group-hover:text-white transition-colors">
        {name}
      </p>
    </div>
  );

  return (
    <div className="bg-neutral-900 min-h-[400px] flex flex-col items-center justify-center gap-8 p-8 font-sans text-white">
      <h1 className="text-3xl md:text-5xl font-semibold">
        Quem está assistindo?
      </h1>
      <div className="flex flex-col sm:flex-row gap-8">
        <Profile name={name1 || "Perfil 1"} image={profileImage1} />
        <Profile name={name2 || "Perfil 2"} image={profileImage2} />
      </div>
    </div>
  );
};

export default NetflixProfiles;
