declare module 'fuse.js' {
  interface FuseOptions<T> {
    isCaseSensitive?: boolean;
    includeScore?: boolean;
    includeMatches?: boolean;
    minMatchCharLength?: number;
    shouldSort?: boolean;
    findAllMatches?: boolean;
    keys?: string[];
    threshold?: number;
    location?: number;
    distance?: number;
    useExtendedSearch?: boolean;
    getFn?: (obj: T, path: string) => any;
    sortFn?: (a: { score: number }, b: { score: number }) => number;
    ignoreLocation?: boolean;
    ignoreFieldNorm?: boolean;
    fieldNormWeight?: number;
  }

  interface FuseResult<T> {
    item: T;
    refIndex: number;
    score?: number;
    matches?: any[];
  }

  class Fuse<T> {
    constructor(list: T[], options?: FuseOptions<T>);
    search(pattern: string): FuseResult<T>[];
  }

  export = Fuse;
}
