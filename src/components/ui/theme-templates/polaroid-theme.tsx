import { ThemeComponentProps, SimpleThemeData } from "./types";

const formatDate = (dateString?: string) => {
  if (!dateString) return new Date().toLocaleDateString("pt-BR");
  const date = new Date(dateString);
  date.setDate(date.getDate() + 1);
  return new Intl.DateTimeFormat("pt-BR").format(date);
};

const PolaroidTheme = ({ data }: ThemeComponentProps<SimpleThemeData>) => {
  const { uploadedImage, caption, date } = data;
  const displayCaption = caption || `Nosso momento especial ❤️`;
  const displayDate = formatDate(date);
  const altText = `Foto Polaroid: ${caption}`;

  return (
    <div className="bg-gradient-to-br from-amber-100 to-orange-200 p-8 rounded-lg min-h-[400px] flex items-center justify-center font-sans">
      <div className="bg-white p-4 pb-20 shadow-xl rounded-sm transform -rotate-2 relative w-72">
        <div className="aspect-square bg-gray-200 flex items-center justify-center overflow-hidden">
          {uploadedImage ? (
            <img
              src={uploadedImage}
              alt={altText}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-6xl text-gray-400">💕</div>
          )}
        </div>
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
