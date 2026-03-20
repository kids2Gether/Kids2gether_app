/**
 * Estilos compartilhados para react-native-render-html
 * Baseados nos estilos do site WordPress kids2gether.com.br
 */

// Cores do site WordPress
const COLORS = {
  primary: '#7CB342',      // Verde principal (botões, links)
  text: '#333333',         // Texto principal
  textLight: '#666666',    // Texto secundário
  textMuted: '#b3b3b3',    // Texto muted (separadores)
  background: '#ffffff',
};

// Estilos para tags HTML
export const tagsStyles = {
  // Texto base
  body: {
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.text,
  },
  p: {
    marginVertical: 8,
    fontSize: 16,
    lineHeight: 24,
  },
  // Headings (como wp-block-heading do WordPress)
  h1: {
    fontSize: 26,
    fontWeight: 'bold',
    marginVertical: 12,
    color: COLORS.text,
  },
  h2: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  h3: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  h4: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 6,
  },
  // Imagens - usar aspectRatio para manter proporção
  img: {
    marginVertical: 10,
    borderRadius: 8,
    alignSelf: 'center',
  },
  // Figure - container das imagens no WordPress
  figure: {
    marginVertical: 12,
    marginHorizontal: 0,
    alignItems: 'center',
    width: '100%',
    overflow: 'hidden',
  },
  figcaption: {
    fontSize: 14,
    color: COLORS.textLight,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 4,
  },
  // Listas (como wp-block-list do WordPress)
  ul: {
    marginVertical: 8,
    paddingLeft: 16,
  },
  ol: {
    marginVertical: 8,
    paddingLeft: 16,
  },
  li: {
    marginVertical: 4,
    fontSize: 16,
    lineHeight: 22,
  },
  // Links
  a: {
    color: COLORS.primary,
    textDecorationLine: 'none',
  },
  // Strong/Bold
  strong: {
    fontWeight: 'bold',
  },
  b: {
    fontWeight: 'bold',
  },
  // Blockquote
  blockquote: {
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
    paddingLeft: 16,
    marginVertical: 12,
    fontStyle: 'italic',
  },
};

// Estilos para classes CSS do WordPress
export const classesStyles = {
  // WordPress Block: Image - CRÍTICO para não estourar
  'wp-block-image': {
    marginVertical: 12,
    alignItems: 'center',
    width: '100%',
    overflow: 'hidden',
  },
  // WordPress Block: Heading
  'wp-block-heading': {
    marginVertical: 10,
  },
  // WordPress Block: List (listas em uppercase do site)
  'wp-block-list': {
    marginVertical: 10,
    paddingLeft: 8,
  },
  // WordPress Block: Button container
  'wp-block-buttons': {
    marginVertical: 16,
    alignItems: 'center',
  },
  // WordPress Block: Button
  'wp-block-button': {
    marginVertical: 8,
  },
  // WordPress Block: Button link (botão "QUERO RESERVAR")
  'wp-block-button__link': {
    backgroundColor: COLORS.primary,
    color: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 8,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    overflow: 'hidden',
  },
  // WordPress Block: Group
  'wp-block-group': {
    marginVertical: 16,
  },
  // WordPress: Alignments
  'aligncenter': {
    alignSelf: 'center',
    width: '100%',
  },
  'alignleft': {
    alignSelf: 'flex-start',
  },
  'alignright': {
    alignSelf: 'flex-end',
  },
  // WordPress: Image sizes - forçar 100% para não estourar
  'size-full': {
    width: '100%',
    maxWidth: '100%',
  },
  'size-large': {
    width: '100%',
    maxWidth: '100%',
  },
  // Cores customizadas do WordPress
  'has-custom-principal-color': {
    color: COLORS.primary,
  },
  'has-custom-marcador-background-color': {
    backgroundColor: COLORS.primary,
  },
  // Separador (linha tracejada entre seções)
  'wp-block-boldblocks-icon-separator': {
    marginVertical: 20,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.textMuted,
    borderStyle: 'dashed',
  },
};

// Props padrão para texto
export const defaultTextProps = {
  selectable: true,
};

// Props para renderizadores - CRÍTICO para controlar imagens
export const renderersProps = {
  img: {
    enableExperimentalPercentWidth: true,
  },
  a: {
    // Abrir links no navegador externo
  },
};

/**
 * Gera renderersProps com largura máxima calculada
 * Isso é CRÍTICO para forçar imagens a não estourarem
 * @param {number} contentWidth - Largura do conteúdo disponível
 * @returns {object} renderersProps configurado
 */
export const getRenderersProps = (contentWidth) => ({
  img: {
    enableExperimentalPercentWidth: true,
  },
});

/**
 * Função para computar largura máxima de elementos embeddeds (imagens, iframes)
 * @param {number} contentWidth - Largura do conteúdo
 * @returns {Function} Função que retorna a largura máxima
 */
export const computeEmbeddedMaxWidth = (contentWidth) => (tagName) => {
  // Sempre retorna a largura do conteúdo para limitar imagens
  return contentWidth;
};

/**
 * Função para ignorar elementos DOM indesejados (como inline styles de largura fixa)
 * @param {object} node - Nó do DOM
 * @returns {boolean} true para ignorar, false para processar
 */
export const ignoredDomTags = ['style', 'script'];

/**
 * Estilos CSS que devem ser ignorados para evitar overflow
 * O react-native-render-html tentará aplicar esses estilos do HTML
 * mas serão ignorados
 */
export const ignoredStyles = ['width', 'height'];

/**
 * System fonts para evitar erros
 */
export const systemFonts = ['System', 'FredokaOne'];

// Variante para Marketplace (usa fonte FredokaOne)
export const marketplaceTagsStyles = {
  ...tagsStyles,
  p: {
    ...tagsStyles.p,
    fontSize: 18,
    fontFamily: 'FredokaOne',
  },
};

/**
 * Retorna a largura do conteúdo baseada na largura da tela
 * @param {number} screenWidth - Largura da tela (useWindowDimensions)
 * @param {number} horizontalPadding - Padding horizontal total (padrão: 20)
 * @returns {number} Largura do conteúdo
 */
export const getContentWidth = (screenWidth, horizontalPadding = 20) => {
  return screenWidth - horizontalPadding;
};
