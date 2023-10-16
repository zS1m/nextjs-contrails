'use client'

import { useEffect } from 'react';
import { init } from '@waline/client';
import '@waline/client/dist/waline.css';

const WalineComment = () => {
  useEffect(() => {
    init({
      el: '#waline',
      dark: '.dark',
      serverURL: 'https://waline.contrails.space/',
      emoji: [
        'https://cdn.jsdelivr.net/gh/walinejs/emojis@1.0.0/weibo',
        'https://cdn.jsdelivr.net/gh/walinejs/emojis@1.0.0/alus'
      ],
      requiredMeta: ['nick']
      // 此处可以配置更多配置，参考Waline官方文档...
    });
  }, []);

  return <div id="waline" />;
};

export default WalineComment;
