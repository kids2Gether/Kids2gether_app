import React, { useState } from "react";
import { Image as ExpoImage } from "expo-image";
import { useContentWidth } from "react-native-render-html";

/**
 * Renderizador customizado de <img> para react-native-render-html.
 *
 * O <Image> nativo do RN deixa imagens remotas validas em branco/cinza no iOS.
 * Aqui usamos expo-image (SDWebImage), que renderiza de forma confiavel.
 *
 * A altura e calculada pela proporcao: usa os atributos width/height do HTML
 * quando existem; caso contrario, descobre via onLoad apos a imagem carregar.
 */
export function HTMLImageRenderer({ tnode }) {
  const contentWidth = useContentWidth();
  const src = tnode?.attributes?.src;
  const attrW = parseFloat(tnode?.attributes?.width);
  const attrH = parseFloat(tnode?.attributes?.height);
  const [ratio, setRatio] = useState(
    attrW > 0 && attrH > 0 ? attrW / attrH : null
  );

  if (!src) return null;

  const width = contentWidth || 300;
  const height = ratio ? Math.round(width / ratio) : Math.round(width * 0.6);

  return (
    <ExpoImage
      source={{ uri: src }}
      style={{
        width,
        height,
        borderRadius: 8,
        marginVertical: 10,
        alignSelf: "center",
      }}
      contentFit="cover"
      transition={150}
      onLoad={(e) => {
        const d = e?.source;
        if (!ratio && d?.width > 0 && d?.height > 0) {
          setRatio(d.width / d.height);
        }
      }}
    />
  );
}

// Objeto de renderers para passar ao componente <HTML renderers={htmlRenderers} />
export const htmlRenderers = {
  img: HTMLImageRenderer,
};
