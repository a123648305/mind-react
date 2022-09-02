export declare const themeLists: [
  "classic",
  "classic-compact",
  "fresh-blue",
  "fresh-blue-compat",
  "fresh-green",
  "fresh-green-compat",
  "fresh-pink",
  "fresh-pink-compat",
  "fresh-purple",
  "fresh-purple-compat",
  "fresh-red",
  "fresh-red-compat",
  "fresh-soil",
  "fresh-soil-compat",
  "snow",
  "snow-compact",
  "tianpan",
  "tianpan-compact",
  "fish",
  "wire"
];
export declare const templateLists: [
  "default",
  "tianpan",
  "structure",
  "filetree",
  "right",
  "fish-bone"
];

/**
 * Theme:主题颜色
 * Template:预设模板
 */
export type OptionsType = {
  theme?: typeof themeLists[number];
  template?: typeof templateLists[number];
};
