import { Card } from "@/components/ui/card";

interface LoveLetterThemeProps {
  name1: string;
  name2: string;
  uploadedImage?: string;
}

const LoveLetterTheme = ({ name1, name2, uploadedImage }: LoveLetterThemeProps) => {
  const recipient = name2 || "Meu Amor";
  const sender = name1 || "Com amor";
  
  return (
    <div className="bg-gradient-to-b from-rose-50 to-pink-50 p-8 rounded-lg min-h-[400px] font-serif relative overflow-hidden">
      {/* Paper Texture */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
      
      {/* Letter Header */}
      <div className="relative z-10">
        <div className="text-center mb-8">
          <div className="text-rose-400 text-2xl mb-2">💌</div>
          <h1 className="text-2xl font-elegant text-rose-800 mb-2">
            Para {recipient}
          </h1>
          <div className="w-24 h-px bg-rose-300 mx-auto"></div>
        </div>

        {/* Letter Content */}
        <div className="max-w-md mx-auto space-y-6">
          {/* Photo Section */}
          <div className="text-center">
            <div className="inline-block p-2 bg-white shadow-sm transform -rotate-1 hover:rotate-0 transition-transform duration-300">
              <div className="w-32 h-32 bg-gradient-to-br from-rose-200 to-pink-300 flex items-center justify-center overflow-hidden">
                {uploadedImage ? (
                  <img 
                    src={uploadedImage} 
                    alt="Nossa foto especial" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-4xl">💕</div>
                )}
              </div>
            </div>
          </div>

          {/* Letter Text */}
          <div className="space-y-4 text-rose-900 leading-relaxed">
            <p className="font-handwriting text-lg text-center italic">
              "Meu querido {recipient},"
            </p>
            
            <p className="text-sm text-justify">
              Cada dia ao seu lado é um presente. Você trouxe cores para a minha vida 
              que eu nem sabia que existiam. Obrigado(a) por ser exatamente quem você é.
            </p>
            
            <p className="text-sm text-justify">
              Nossos momentos juntos são os meus tesouros mais preciosos. 
              Desde o nosso primeiro encontro até este momento, 
              cada lembrança é uma joia guardada no meu coração.
            </p>
            
            <div className="text-center mt-8">
              <p className="text-sm italic text-rose-700">
                "O amor não é só olhar um para o outro, 
                é olhar juntos na mesma direção."
              </p>
            </div>
          </div>

          {/* Signature */}
          <div className="text-right mt-8">
            <div className="inline-block">
              <p className="font-handwriting text-lg text-rose-800 mb-2">
                Com todo meu amor,
              </p>
              <p className="font-signature text-2xl text-rose-600">
                {sender} ❤️
              </p>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-4 right-4 text-rose-300/50 transform rotate-12">
          <div className="text-3xl">🌹</div>
        </div>
        <div className="absolute bottom-4 left-4 text-rose-300/50 transform -rotate-12">
          <div className="text-2xl">💝</div>
        </div>
      </div>
    </div>
  );
};

export default LoveLetterTheme;