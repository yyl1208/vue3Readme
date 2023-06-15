const map = {
  // "//localhost:7700/": "//wujie-micro.github.io/demo-main-react/",
  '//localhost:6001/': '//',
};

export default function hostMap(host) {
  if (process.env.NODE_ENV === 'production') return map[host];
  return host;
}
