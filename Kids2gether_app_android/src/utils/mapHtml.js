import * as cheerio from 'cheerio';

export const mapHtml = (data) => {
  const linksArray = [];

  data.forEach(item => {
    if (item.content && item.content.rendered) {
      const $ = cheerio.load(item.content.rendered, { decodeEntities: false });

      $('div').each((index, div) => {
        $(div).find('a').each((index, a) => {
          const text = $(a).text().trim();
          if (text === 'Contratar') {
            const link = $(a).attr('href');
            linksArray.push({
              name: item.yoast_head_json.title.split("|")[0].trim(),
              whatsapp: link
            });
            $(a).remove(); // Remove o elemento <a> do DOM
          }
        });
      });

      // Atualiza o conteúdo renderizado no item com as mudanças feitas pelo Cheerio
      item.content.rendered = $.html();
    }
  });

  // Retornar tanto o array de links encontrados quanto o data modificado
  return { linksArray, data };
};