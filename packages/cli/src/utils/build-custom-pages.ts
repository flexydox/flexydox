import { CustomPageData } from '@flexydox/doc-schema';
import { loadCustomPage } from './load-custom-page';
import { resolveAllPageFiles } from './resolve-files';

export async function buildCustomPages(): Promise<CustomPageData[]> {
  const pageUrls = await resolveAllPageFiles();

  const pagePromises = pageUrls.map(async (pageUrl) => {
    return await loadCustomPage(pageUrl);
  });
  return await Promise.all(pagePromises);
}
