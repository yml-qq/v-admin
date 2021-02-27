// eslint-disable-next-line no-unused-vars
require("path");
// eslint-disable-next-line no-unused-vars
module.exports = {
  // 在项目中已存在 process.env.NODE_ENV 默认为开发环境，
  // 在开发环境中可新建 .env.development 文件，此文件只在开发环境下执行，在这里面可以自定义环境变量。同样在生产环境下 执行 .env,production
  // 项目部署的基础路径，开发环境的路径为 /
  publicPath: process.env.NODE_ENV ==="production" ? "" : "/",
  // 输出文件目录，开发环境下输出文件夹为 devdist
  outputDir: process.env.NODE_ENV === "production" ? "dist" : "devdist",
  lintOnSave: false,
  // 使用带有浏览器内编译器的完整构建版本
  // 查阅 https://cn.vuejs.org/v2/guide/installation.html#运行时-编译器-vs-只包含运行时
  // runtimeCompiler: false,
  // babel-loader 默认会跳过 node_modules 依赖。
  // 通过这个选项可以显式转译一个依赖。
  // transpileDependencies: [
  /* string or regex */
  // ],
  chainWebpack: config => {},
  // 配置解析的路径别名
  // configureWebpack: config => {
  //  config.resolve = {
  //   extensions:[".js", ".json", ".vue"],
  //   alias: {
  // 	  "@": path.resolve(__dirname, "./src"),
  // 	  "public": path.resolve(__dirname, "./public"),
  // 	  "components": path.resolve(__dirname, "./src/components")
  //   }
  //  }
  // },

  // 是否为生产环境构建生成 source map？
  productionSourceMap: false,
  // 调整内部的 webpack 配置。
  // 查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli/webpack.md
  // CSS 相关选项
  css: {
    // 启用 CSS modules
    // requireModuleExtension: false,
    // 是否使用css分离插件
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      scss: { prependData: `@import "./src/styles/main.scss";` }
    },
    // 启用 css modules for all css / pre-processor files.
    modules: false
  },
  // 在生产环境下为 Babel 和 TypeScript 使用 `thread-loader`
  // 在多核机器下会默认开启。
  parallel: require("os").cpus().length > 1,
  // PWA 插件的选项。
  // 查阅 https://github.com/vuejs/vue-cli/tree/dev/packages/@vue/cli-plugin-pwa
  pwa: {},
  // 配置 webpack-dev-server 行为。
  devServer: {
    open: false,    //编辑完是否打开网页
    host: "0.0.0.0",    //指定试用地址，默认localhost,0.0.0.0代表可以被外界访问
    port: 8080,   //访问端口
    https: false,   //编译失败时刷新页面
    hot: true,    //开启热加载
    hotOnly: false,
    // proxy: null,  //设置代理
    disableHostCheck: true,
    proxy: {
      "/api": {
        target: "http://yml.com",
        pathRewrite: {      // 去掉 路径中的  /api  的这一截
          "^/api": ""
        }
      }
    },
    overlay: {    //全屏模式下是否显示脚本错误
      warning: true,
      errors: true
    },
    before: app => {}
  },
  // 三方插件的选项
  pluginOptions: {
    // ...
  }
};
