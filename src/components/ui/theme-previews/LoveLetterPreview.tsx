// src/components/ui/theme-previews/LoveLetterPreview.tsx

import { PreviewProps } from "./types";

const LoveLetterPreview = ({ name1, name2, uploadedImage }: PreviewProps) => {
  const recipient = name2 || "Meu Amor";
  const sender = name1 || "Com amor";

  return (
    <div className="bg-gradient-to-b from-rose-50 to-pink-50 p-8 rounded-lg min-h-[400px] font-serif relative pointer-events-none">
      <div className="text-center mb-6">
        <h1 className="text-2xl text-rose-800 mb-2">Para {recipient}</h1>
      </div>
      <div className="max-w-md mx-auto space-y-4">
        <div className="text-center">
          <div className="inline-block p-2 bg-white shadow-sm">
            <div className="w-32 h-32 bg-rose-200 flex items-center justify-center overflow-hidden">
              {uploadedImage ? (
                <img
                  src={uploadedImage}
                  alt="Nossa foto"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-4xl">💌</div>
              )}
            </div>
          </div>
        </div>
        <p className="text-sm text-center text-rose-900 leading-relaxed">
          "Cada dia ao seu lado é um presente. Você trouxe cores para a minha
          vida que eu nem sabia que existiam..."
        </p>
        <div className="text-right mt-4">
          <p className="text-lg text-rose-800">
            Com amor,{" "}
            <span className="font-handwriting text-2xl">{sender} ❤️</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoveLetterPreview;
