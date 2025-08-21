// Caminho: src/components/ui/theme-templates/polaroid-theme.tsx

// A interface importada está correta, não precisa mexer.
import { ThemeComponentProps } from "./types";

// Função auxiliar para formatar a data de forma amigável
const formatDate = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  // Adiciona um dia para corrigir problemas comuns de fuso horário com inputs de data
  date.setDate(date.getDate() + 1);
  return new Intl.DateTimeFormat("pt-BR").format(date);
};

// AQUI ESTÁ A CORREÇÃO: Adicionamos name1 e name2 na lista de props
const PolaroidTheme = ({
  name1,
  name2,
  uploadedImage,
  caption,
  date,
}: ThemeComponentProps) => {
  // Define textos padrão caso os campos opcionais não sejam preenchidos
  const displayCaption = caption || `Nosso momento especial ❤️`;
  const displayDate = date
    ? formatDate(date)
    : new Date().toLocaleDateString("pt-BR");
  const altText = `Foto de ${name1 || "nós"} e ${name2 || "nosso amor"}`;

  return (
    // Container principal que simula uma "mesa" ou "mural"
    <div className="bg-gradient-to-br from-amber-100 to-orange-200 p-8 rounded-lg min-h-[400px] flex items-center justify-center font-sans">
      {/* A "foto" polaroid com sombra e um pouco de rotação */}
      <div
        className="
          bg-white p-4 pb-20 shadow-xl rounded-sm
          transform -rotate-2 hover:rotate-0 transition-transform duration-300
          relative w-72" // A base da polaroid
      >
        {/* Área da imagem (quadrada) */}
        <div className="aspect-square bg-gray-200 flex items-center justify-center overflow-hidden">
          {uploadedImage ? (
            <img
              src={uploadedImage}
              alt={altText} // Usamos os nomes para o texto alternativo da imagem
              className="w-full h-full object-cover"
            />
          ) : (
            // Placeholder caso não haja imagem
            <div className="text-6xl text-gray-400">💕</div>
          )}
        </div>

        {/* Área de texto da polaroid */}
        <div className="absolute bottom-4 left-4 right-4 text-center">
          <p
            className="font-handwriting text-amber-900 text-lg truncate"
            title={displayCaption}
          >
            {displayCaption}
          </p>
          <p className="text-xs text-gray-500 mt-1">{displayDate}</p>
        </div>
      </div>
    </div>
  );
};

export default PolaroidTheme;
