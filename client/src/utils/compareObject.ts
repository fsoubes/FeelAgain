export const compareObject = (updated: any, initial: any) => {
  return Object.keys(updated)
    .filter((item: string) => {
      return (
        JSON.stringify((initial as any)[item]) !==
        JSON.stringify((updated as any)[item])
      );
    })
    .reduce((obj, key) => {
      (obj as any)[key] = (updated as any)[key];
      return obj;
    }, {});
};
