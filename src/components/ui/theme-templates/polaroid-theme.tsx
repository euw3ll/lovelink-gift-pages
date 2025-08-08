import { Card } from "@/components/ui/card";

interface PolaroidThemeProps {
  name1: string;
  name2: string;
  uploadedImage?: string;
}

const PolaroidTheme = ({ name1, name2, uploadedImage }: PolaroidThemeProps) => {
  const coupleNames = name1 && name2 ? `${name1} & ${name2}` : "Nosso Amor";
  
  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-100 p-6 rounded-lg min-h-[400px] font-serif">
      {/* Cork Board Background */}
      <div className="relative">
        <h1 className="text-3xl font-bold text-amber-900 text-center mb-8 font-script">
          {coupleNames}
        </h1>
        
        {/* Polaroid Photos Grid */}
        <div className="grid grid-cols-2 gap-6 max-w-md mx-auto">
          {/* Main Photo */}
          <div className="col-span-2 transform rotate-1">
            <div className="bg-white p-3 shadow-lg transform hover:rotate-0 transition-transform duration-300">
              <div className="aspect-square bg-gradient-to-br from-amber-200 to-orange-300 flex items-center justify-center overflow-hidden">
                {uploadedImage ? (
                  <img 
                    src={uploadedImage} 
                    alt="Nosso momento especial" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-6xl">💕</div>
                )}
              </div>
              <div className="h-16 flex items-center justify-center">
                <p className="text-amber-800 text-center font-handwriting text-lg">
                  Nosso primeiro encontro
                </p>
              </div>
            </div>
          </div>
          
          {/* Small Photos */}
          <div className="transform -rotate-2">
            <div className="bg-white p-2 shadow-md">
              <div className="aspect-square bg-gradient-to-br from-pink-200 to-rose-300 flex items-center justify-center text-2xl">
                📸
              </div>
              <div className="h-8 flex items-center justify-center">
                <p className="text-xs text-amber-700 font-handwriting">
                  Primeira foto
                </p>
              </div>
            </div>
          </div>
          
          <div className="transform rotate-3">
            <div className="bg-white p-2 shadow-md">
              <div className="aspect-square bg-gradient-to-br from-purple-200 to-pink-300 flex items-center justify-center text-2xl">
                💌
              </div>
              <div className="h-8 flex items-center justify-center">
                <p className="text-xs text-amber-700 font-handwriting">
                  Primeira carta
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Vintage Elements */}
        <div className="mt-8 text-center">
          <div className="inline-block bg-amber-200 px-4 py-2 rounded transform -rotate-1 shadow-sm">
            <p className="text-amber-900 font-handwriting text-sm">
              "Alguns momentos merecem ser guardados para sempre" ✨
            </p>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 text-amber-600/30 transform rotate-12">
          <div className="text-6xl">📎</div>
        </div>
        <div className="absolute bottom-0 left-0 text-amber-600/30 transform -rotate-12">
          <div className="text-4xl">🌻</div>
        </div>
      </div>
    </div>
  );
};

export default PolaroidTheme;