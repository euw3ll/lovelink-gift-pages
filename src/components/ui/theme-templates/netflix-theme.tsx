// src/components/ui/theme-templates/netflix-theme.tsx

import { useState } from "react";
import { ThemeComponentProps, NetflixThemeData } from "./types";
import NetflixProfiles from "./netflix/NetflixProfiles";
import NetflixHome from "./netflix/NetflixHome";

// Este componente agora controla o fluxo de visualização do tema Netflix
const NetflixTheme = ({ data }: ThemeComponentProps<NetflixThemeData>) => {
  const [profileSelected, setProfileSelected] = useState(false);

  if (!profileSelected) {
    return (
      <NetflixProfiles
        data={data}
        onProfileSelect={() => setProfileSelected(true)}
      />
    );
  }

  return <NetflixHome data={data} />;
};

export default NetflixTheme;
