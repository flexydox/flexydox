import { basename } from 'path';
import { CustomPageData } from '@flexydox/doc-schema';
import { readFile } from 'fs/promises';
import matter from 'gray-matter';
import _ from 'lodash';

export async function loadCustomPage(fileUrl: string): Promise<CustomPageData> {
  const { createMarkdownProcessor } = await import('@astrojs/markdown-remark');
  const rawContent = await readFile(fileUrl, {
    encoding: 'utf-8'
  });

  const { data, content } = matter(rawContent);

  const processor = await createMarkdownProcessor();

  const result = await processor.render(content);
  const slug = data.slug ? data.slug : _.kebabCase(data.title ?? basename(fileUrl, '.md'));
  const title = data.title ?? basename(fileUrl, '.md') ?? slug;
  return {
    content: result.code,
    slug: slug,
    title: title
  };
}
