'use client'

import { useEffect } from 'react';
import { init } from '@waline/client';
import '@waline/client/dist/waline.css';

const WalineComment = () => {
  useEffect(() => {
    init({
      el: '#waline',
      serverURL: 'https://nextjs-contrails-comment-9iz0p5d56-contrails.vercel.app/',
      // 此处可以配置更多配置，参考Waline官方文档...
    });
  }, []);

  return <div id="waline" />;
};

export default WalineComment;
