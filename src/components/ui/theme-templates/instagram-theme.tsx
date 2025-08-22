import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
} from "lucide-react";
import { ThemeComponentProps, SimpleThemeData } from "./types";

const InstagramTheme = ({ data }: ThemeComponentProps<SimpleThemeData>) => {
  const { name1, name2, uploadedImage, caption } = data;
  const username = name1
    ? name1.toLowerCase().replace(/ /g, "_")
    : "nosso.amor";
  const displayCaption = caption || `Cada momento ao seu lado é especial 💕`;

  return (
    <div className="bg-white rounded-lg overflow-hidden min-h-[400px] font-sans border">
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
      <div className="aspect-square bg-gradient-to-br from-pink-200 to-purple-300 flex items-center justify-center">
        {uploadedImage ? (
          <img
            src={uploadedImage}
            alt={`Post de ${username}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-8xl">💕</div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <Heart size={24} className="text-red-500 fill-red-500" />
            <MessageCircle size={24} />
            <Send size={24} />
          </div>
          <Bookmark size={24} />
        </div>
        <div className="text-sm break-words">
          <span className="font-semibold">{username}</span>{" "}
          <span>{displayCaption}</span>
        </div>
      </div>
    </div>
  );
};

export default InstagramTheme;
