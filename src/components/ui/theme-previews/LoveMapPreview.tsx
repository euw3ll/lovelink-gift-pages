// src/components/ui/theme-previews/LoveMapPreview.tsx

import { PreviewProps } from "./types";

const LoveMapPreview = ({ name1, name2, uploadedImage }: PreviewProps) => {
  const coupleNames = name1 && name2 ? `${name1} & ${name2}` : "Nossa Jornada";

  return (
    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-lg min-h-[400px] font-sans relative pointer-events-none">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-cyan-900">{coupleNames}</h1>
        <p className="text-cyan-700 text-sm">Mapa dos Nossos Momentos</p>
      </div>
      <div className="relative bg-blue-100 rounded-lg h-80 flex items-center justify-center border-2 border-cyan-200">
        <div className="p-2 bg-white rounded-lg shadow-lg">
          <div className="w-20 h-20 bg-cyan-200 rounded flex items-center justify-center overflow-hidden">
            {uploadedImage ? (
              <img
                src={uploadedImage}
                alt="Nosso amor"
                className="w-full h-full object-cover rounded"
              />
            ) : (
              <div className="text-2xl">🗺️</div>
            )}
          </div>
        </div>
        {/* Placeholder pins */}
        <div className="absolute top-[20%] left-[30%] text-2xl">💕</div>
        <div className="absolute top-[40%] left-[60%] text-2xl">💋</div>
        <div className="absolute top-[65%] left-[25%] text-2xl">✈️</div>
      </div>
    </div>
  );
};

export default LoveMapPreview;
