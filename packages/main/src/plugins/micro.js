import microApp from '@micro-zoe/micro-app';

microApp.start({
  plugins: {
    modules: {
      'microChild': [
        {
          loader(code) {
            if (process.env.NODE_ENV === 'development') {
              // 这里 /basename/ 需要和子应用vite.config.js中base的配置保持一致
              code = code.replace(/(from|import)(\s*['"])(\/microChild\/)/g, (all) => {
                return all.replace('/microChild/', 'http://localhost:6001/microChild/');
              });
            }

            return code;
          },
        },
      ],
    },
  },
});
