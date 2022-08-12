
# 问卷调查网站

## 开发技术栈

- **构建工具**：[Vite](https://cn.vitejs.dev/)
- **js框架**：[Vue](https://cn.vuejs.org/)
- **状态管理**：[Pinia](https://pinia.web3doc.top/)
- **路由**：[Vue Router](https://router.vuejs.org/zh/)
- **UI库**：[Element Plus](https://element-plus.gitee.io/zh-CN/)
- **网络请求**：[Axios](https://www.axios-http.cn/)
- **代码托管**：[Coding](https://coding.net/)
- **网站部署上线**：[Webify](https://webify.cloudbase.net/)

## 功能

- 用户登录，查看填写记录
- 用户提交问卷
- 管理员上传问卷

## 注意事项

- 构建打包时注意base=>网站部署
- vite插件@vitejs/plugin-legacy 打包成旧浏览器兼容
- 路由要懒加载=>速度(按需载入)
