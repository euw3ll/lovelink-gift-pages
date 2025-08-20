import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from "lucide-react";

interface InstagramThemeProps {
  name1: string;
  name2: string;
  uploadedImage?: string;
  caption?: string;
}

const InstagramTheme = ({ name1, name2, uploadedImage, caption }: InstagramThemeProps) => {
  const username = name1 ? name1.toLowerCase().replace(" ", "_") : "nosso_amor";
  
  return (
    <div className="bg-white rounded-lg overflow-hidden min-h-[400px] font-sans border">
      {/* Instagram Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-400 p-1">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-lg">
              💕
            </div>
          </div>
          <div>
            <div className="font-semibold text-sm">{username}</div>
            <div className="text-xs text-gray-500">
              {name2 ? `com ${name2}` : "Local especial"}
            </div>
          </div>
        </div>
        <MoreHorizontal size={20} />
      </div>

      {/* Post Image */}
      <div className="aspect-square bg-gradient-to-br from-pink-200 to-purple-300 flex items-center justify-center">
        {uploadedImage ? (
          <img 
            src={uploadedImage} 
            alt="Nosso momento" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-8xl">💕</div>
        )}
      </div>

      {/* Post Actions */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <Heart size={24} className="text-red-500 fill-red-500" />
            <MessageCircle size={24} />
            <Send size={24} />
          </div>
          <Bookmark size={24} />
        </div>

        <div className="space-y-2">
          <div className="font-semibold text-sm">2.847 curtidas</div>
          <div className="text-sm">
            <span className="font-semibold">{username}</span>{" "}
            <span>
              {caption || "Cada momento ao seu lado é especial 💕"}
              {name2 && ` @${name2.toLowerCase().replace(" ", "_")}`}
            </span>
          </div>
          <div className="text-gray-500 text-xs">Ver todos os 42 comentários</div>
          <div className="text-xs text-gray-500">Há 2 horas</div>
        </div>
      </div>

      {/* Stories Preview */}
      <div className="border-t p-4">
        <div className="text-xs text-gray-500 mb-2">Stories em destaque</div>
        <div className="flex gap-3">
          {['Primeiro encontro', 'Viagens', 'Momentos'].map((story, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-400 p-1">
                <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center text-xs">
                  {index === 0 ? '📸' : index === 1 ? '✈️' : '💕'}
                </div>
              </div>
              <div className="text-xs mt-1 text-gray-600 truncate max-w-[48px]">
                {story}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstagramTheme;