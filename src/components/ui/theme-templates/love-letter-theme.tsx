import { ThemeComponentProps, SimpleThemeData } from "./types";

const LoveLetterTheme = ({ data }: ThemeComponentProps<SimpleThemeData>) => {
  const { name1, name2, uploadedImage } = data;
  const recipient = name2 || "Meu Amor";
  const sender = name1 || "Com amor";

  return (
    <div className="bg-gradient-to-b from-rose-50 to-pink-50 p-8 rounded-lg min-h-[400px] font-serif relative overflow-hidden">
      <div className="relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-2xl text-rose-800 mb-2">Para {recipient}</h1>
        </div>
        <div className="max-w-md mx-auto space-y-6">
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
                  <div className="text-4xl">💕</div>
                )}
              </div>
            </div>
          </div>
          <p className="text-sm text-justify text-rose-900">
            Cada dia ao seu lado é um presente. Você trouxe cores para a minha
            vida que eu nem sabia que existiam. Obrigado(a) por ser exatamente
            quem você é.
          </p>
          <div className="text-right mt-8">
            <p className="text-lg text-rose-800">
              Com todo meu amor,{" "}
              <span className="font-handwriting text-2xl">{sender} ❤️</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoveLetterTheme;
