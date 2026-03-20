/**
 * Extracts WhatsApp "Contratar" links from WordPress HTML content.
 * Uses regex instead of cheerio (cheerio requires Node.js built-ins unavailable in React Native).
 */
export const mapHtml = (data) => {
  const linksArray = [];

  data.forEach(item => {
    if (item.content && item.content.rendered) {
      let html = item.content.rendered;

      // Match all <a ...>Contratar</a> tags and extract href
      const anchorRegex = /<a\s+([^>]*?)>(Contratar)<\/a>/gi;
      let match;

      while ((match = anchorRegex.exec(html)) !== null) {
        const attrs = match[1];
        const hrefMatch = attrs.match(/href=["']([^"']+)["']/i);
        if (hrefMatch) {
          const link = hrefMatch[1];
          const name = item.yoast_head_json?.title?.split("|")[0]?.trim() ?? "";
          linksArray.push({ name, whatsapp: link });
        }
      }

      // Remove the <a>Contratar</a> tags from the rendered HTML
      item.content.rendered = html.replace(/<a\s+[^>]*?>Contratar<\/a>/gi, "");
    }
  });

  return { linksArray, data };
};
