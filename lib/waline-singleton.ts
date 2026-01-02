import type { WalineInstance, WalineInitOptions } from '@waline/client';

import { init } from '@waline/client';

let instance: WalineInstance | null = null;
let currentPath: string | null = null;

export function initWalineOnce(
  options: WalineInitOptions & { path: string }
) {
  // 如果已经初始化在同一个 path 上，直接复用
  if (instance && currentPath === options.path) {
    return instance;
  }

  // path 变了，销毁旧实例
  if (instance) {
    instance.destroy();
    instance = null;
  }

  instance = init(options);
  currentPath = options.path;

  return instance;
}

export function destroyWaline() {
  instance?.destroy();
  instance = null;
  currentPath = null;
}
