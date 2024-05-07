import { Marked } from 'marked';

export async function renderMarkdown(markdown: string): Promise<string> {
  const marked = new Marked({
    gfm: true,
    breaks: true,
    pedantic: false
  });
  const result = await marked.parse(markdown);
  return result;
}
