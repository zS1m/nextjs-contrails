import type { Post } from 'contentlayer/generated';

const defaultDateOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
}

export function formatDate(date: string, locale = 'zh', options = defaultDateOptions) {
  const formattedLocale = locale === 'en' ? 'en-US' : 'zh-CN';

  const optionsWithDefaults = { ...defaultDateOptions, ...options };

  return new Date(date).toLocaleDateString(formattedLocale, optionsWithDefaults);
}

export function sortPosts(posts: Post[]) {
  return posts.sort((a, b) => a.date < b.date ? 1 : -1);
}

export function truncateSummary(text?: string, maxLength = 160) {
  if (!text) {
    return '';
  } else if (text.length <= maxLength) {
    return text;
  } else {
    return text.slice(0, maxLength) + '...';
  }
}

export function countWords(str: string) {
  const chWords = Array.from(str)
      .filter((char) => /[\u4e00-\u9fa5]/.test(char))
      .length

  const enWords = Array.from(str)
      .map((char) => /[a-zA-Z0-9\s]/.test(char) ? char : ' ')
      .join('').split(/\s+/).filter(s => s)
      .length

  const words = chWords + enWords;
  const minutes = Math.round(words / 300);
  const text = minutes < 1 ?  '小于一分钟' : `${minutes} 分钟`;

  return {
    words,
    minutes,
    text
  };
}
