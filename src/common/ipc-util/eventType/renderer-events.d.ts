declare namespace IpcEvents {
  // 由 Renderer 发出的ipc通信
  interface Renderer {
    /** 最小化窗口 */
    "min-window": {
      skipTaskBar?: boolean; // 是否隐藏任务栏
    };

    /** 退出应用 */
    "exit-app": undefined;

    /** 刷新插件 */
    "refresh-plugins": undefined;

    "open-url": string;

    "sync-current-music": IMusic.IMusicItem;
    "sync-current-playing-state": import("@/renderer/core/track-player/enum").PlayerState;
    "sync-current-repeat-mode": import("@/renderer/core/track-player/enum").RepeatMode;
  }
}

/** 需要回执 */
declare namespace IpcInvoke {
  type IAppConfig = import("@/common/app-config/type").IAppConfig;
  type IAppConfigKeyPath = import("@/common/app-config/type").IAppConfigKeyPath;
  type IAppConfigKeyPathValue =
    import("@/common/app-config/type").IAppConfigKeyPathValue;

  interface Renderer {
    "get-all-plugins": () => IPlugin.IPluginDelegate[];
    "call-plugin-method": <
      T extends keyof IPlugin.IPluginInstanceMethods
    >(arg: {
      // 通过hash或者platform查找插件
      hash?: string;
      platform?: string;
      // 方法
      method: T;
      // 参数
      args: Parameters<IPlugin.IPluginInstanceMethods[T]>;
    }) => ReturnType<IPlugin.IPluginInstanceMethods[T]>;
    /** 同步设置 */
    "sync-app-config": () => IAppConfig;
    "set-app-config": (appConfig: IAppConfig) => boolean;
    "set-app-config-path": <Key extends IAppConfigKeyPath>(arg: {
      keyPath: Key;
      value: IAppConfigKeyPathValue<Key>;
    }) => boolean;
    "install-plugin-remote": (url: string) => void;
    "install-plugin-local": (url: string) => void;
    "uninstall-plugin": (pluginhash: string) => void;
    "show-open-dialog": (
      options: Electron.OpenDialogOptions
    ) => Electron.OpenDialogReturnValue;
    'check-update': () => ICommon.IUpdateInfo;
    /** 本地文件 */
    'sync-local-file': () => void;
    'add-watch-dir': (dirs: string[]) => void;
    'remove-watch-dir': (dirs: string[]) => void;
  }
}
