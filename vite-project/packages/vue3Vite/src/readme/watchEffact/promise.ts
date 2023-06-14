interface IFruit {
  id: number;
  name: string;
  imgs: string;
}

const list: { [key: number]: IFruit } = {
  1: { id: 1, name: '苹果', imgs: 'https://xxx.apple.jpg' },
  2: { id: 2, name: '香蕉', imgs: 'https://xxx.banana.jpg' },
};

export const getFruitsById = (id: number, delay: number = 3000): [Promise<IFruit>, () => void] => {
  let _reject: (reason?: any) => void;
  const _promise: Promise<IFruit> = new Promise((resolve, reject) => {
    _reject = reject;
    setTimeout(() => {
      resolve(list[id]);
    }, delay);
  });
  return [
    _promise,
    () =>
      _reject({
        message: 'abort~',
      }),
  ];
};
