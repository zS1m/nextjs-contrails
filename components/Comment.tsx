'use client'

import { useEffect, useRef } from 'react';
import { init, type WalineInstance, type WalineInitOptions } from '@waline/client';
import '@waline/client/dist/waline.css';

export type WalineOptions = Omit<WalineInitOptions, 'el'>;

const WalineComment = (props: WalineOptions) => {
  const walineInstanceRef = useRef<WalineInstance | null>(null);
  const containerRef = useRef<HTMLDivElement>();

  useEffect(() => {
    walineInstanceRef.current = init({
      ...props,
      el: containerRef.current,
      dark: '.dark',
      emoji: [
        'https://cdn.jsdelivr.net/gh/walinejs/emojis@1.0.0/weibo',
        'https://cdn.jsdelivr.net/gh/walinejs/emojis@1.0.0/alus'
      ],
      requiredMeta: ['nick'],
      pageview: true, // 浏览量统计
    });

    return () => walineInstanceRef.current?.destroy();
  }, []);

  useEffect(() => {
    walineInstanceRef.current?.update(props);
  }, [props]);

  // @ts-ignore
  return <div id="waline" ref={containerRef} />;
};

export default WalineComment;
