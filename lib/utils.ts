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

export function truncateSummary(
  text?: string,
  maxLength = 160,
  locale?: string,
) {
  if (!text) {
    return '';
  }

  if (text.length <= maxLength) {
    return text;
  }

  if (locale === 'en') {
    // 英文：在 maxLength 之前，找最后一个空格
    const truncated = text.slice(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');
    return (lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated) + '…';
  }

  // 中文：直接按字符截断
  return text.slice(0, maxLength) + '…';
}

interface CountWordsOptions {
  locale?: string;
  zhCharsPerMin?: number;
  enWordsPerMin?: number;
  round?: 'ceil' | 'round';
}

export function countWords(str: string, opts: CountWordsOptions = {}) {
  const {
    locale = 'zh',
    zhCharsPerMin = 300,
    enWordsPerMin = 220,
    round = 'ceil',
  } = opts

  // 中文：统计汉字（含常用 CJK 扩展）
  // 基础范围：\u4E00-\u9FFF
  // 扩展：\u3400-\u4DBF（CJK Ext A）
  const chChars =
    (str.match(/[\u3400-\u4DBF\u4E00-\u9FFF]/g) ?? []).length;

  // 英文：统计“词”
  // 规则：
  // - 允许字母数字
  // - 允许内部出现 ' 或 -（don't, long-term）
  const enWords =
    (str.match(/[A-Za-z0-9]+(?:['-][A-Za-z0-9]+)*/g) ?? []).length;

  // 估算时间：分别按语言阅读速度计算，再合并
  const minutesFloat =
    (chChars / zhCharsPerMin) + (enWords / enWordsPerMin);

  const minutes =
    round === 'round' ? Math.round(minutesFloat) : Math.ceil(minutesFloat);

  // 按 locale 输出文案
  let text: string;
  if (locale === 'en') {
    text = minutes < 1 ? 'Less than 1 min' : `${minutes} min read`;
  } else {
    text = minutes < 1 ? '小于 1 分钟' : `${minutes} 分钟`;
  }

  return {
    // 保留拆分结果
    chChars,
    enWords,
    // 综合量，用于排序/统计
    words: chChars + enWords,
    minutes,
    text,
  }
}
