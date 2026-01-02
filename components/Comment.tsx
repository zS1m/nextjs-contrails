'use client';

import type { WalineInitOptions } from '@waline/client';

import { useEffect, useRef } from 'react';
import { useLocale } from 'next-intl';
import { usePathname } from '@/i18n/navigation';
import { initWalineOnce } from '@/lib/waline-singleton';

import '@waline/client/style';

export type WalineOptions = Omit<WalineInitOptions, 'el'>;

const WalineComment = (props: WalineOptions) => {
  const locale = useLocale();
  const pathname = usePathname();

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    initWalineOnce({
      ...props,
      el: containerRef.current,
      lang: locale,
      path: pathname,
      dark: '.dark',
      emoji: [
        'https://cdn.jsdelivr.net/gh/walinejs/emojis@1.0.0/weibo',
        'https://cdn.jsdelivr.net/gh/walinejs/emojis@1.0.0/alus'
      ],
      requiredMeta: ['nick'],
      pageview: process.env.NODE_ENV === 'production', // 浏览量统计
    });
  }, [locale, pathname]);

  return <div id="waline" ref={containerRef} />;
};

export default WalineComment;
