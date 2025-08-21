import { Card } from "@/components/ui/card";

interface LoveMapThemeProps {
  name1: string;
  name2: string;
  uploadedImage?: string;
}

const LoveMapTheme = ({ name1, name2, uploadedImage }: LoveMapThemeProps) => {
  const coupleNames = name1 && name2 ? `${name1} & ${name2}` : "Nossa Jornada";

  const locations = [
    {
      name: "Primeiro Encontro",
      emoji: "💕",
      position: { top: "20%", left: "30%" },
    },
    {
      name: "Primeiro Beijo",
      emoji: "💋",
      position: { top: "40%", left: "60%" },
    },
    {
      name: "Primeira Viagem",
      emoji: "✈️",
      position: { top: "65%", left: "25%" },
    },
    {
      name: "Lugar Especial",
      emoji: "🌟",
      position: { top: "30%", left: "75%" },
    },
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-lg min-h-[400px] font-sans relative overflow-hidden">
      {/* Map Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="grid"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 10 0 L 0 0 0 10"
                fill="none"
                stroke="#0891b2"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      {/* Map Header */}
      <div className="relative z-10 text-center mb-6">
        <h1 className="text-2xl font-bold text-cyan-900 mb-2">{coupleNames}</h1>
        <p className="text-cyan-700 text-sm">
          Mapa dos Nossos Momentos Especiais
        </p>
        <div className="w-24 h-px bg-cyan-300 mx-auto mt-2"></div>
      </div>

      {/* Map Container */}
      <div className="relative bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg h-80 overflow-hidden border-2 border-cyan-200">
        {/* Photo in Center */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="p-2 bg-white rounded-lg shadow-lg transform hover:scale-105 transition-transform">
            <div className="w-20 h-20 bg-gradient-to-br from-cyan-200 to-blue-300 rounded flex items-center justify-center overflow-hidden">
              {uploadedImage ? (
                <img
                  src={uploadedImage}
                  alt="Nosso amor"
                  className="w-full h-full object-cover rounded"
                />
              ) : (
                <div className="text-2xl">💕</div>
              )}
            </div>
          </div>
        </div>

        {/* Location Pins */}
        {locations.map((location, index) => (
          <div
            key={index}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10"
            style={location.position}
          >
            <div className="relative">
              {/* Pin */}
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-xs shadow-lg transform group-hover:scale-110 transition-transform">
                <MapPin size={16} />
              </div>

              {/* Emoji */}
              <div className="absolute -top-2 -right-2 text-lg">
                {location.emoji}
              </div>

              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-white px-2 py-1 rounded shadow-lg border text-xs whitespace-nowrap text-gray-700">
                  {location.name}
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
              </div>
            </div>
          </div>
        ))}

        {/* Routes between locations */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <linearGradient
              id="routeGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          <path
            d="M 30% 20% Q 45% 30% 60% 40% Q 40% 50% 25% 65% Q 55% 55% 75% 30%"
            stroke="url(#routeGradient)"
            strokeWidth="2"
            fill="none"
            strokeDasharray="5,5"
            className="animate-pulse"
          />
        </svg>
      </div>

      {/* Legend */}
      <div className="mt-4 text-center">
        <div className="inline-flex items-center gap-4 bg-white/80 px-4 py-2 rounded-full text-xs text-cyan-800">
          <div className="flex items-center gap-1">
            <Heart size={12} className="text-red-500" />
            <span>Lugares especiais do nosso amor</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoveMapTheme;
