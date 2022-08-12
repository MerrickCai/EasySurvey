
# 问卷调查网站

网址：[https://survey-2gjmv1kn3ae2d26e-1258864451.ap-shanghai.app.tcloudbase.com/](https://survey-2gjmv1kn3ae2d26e-1258864451.ap-shanghai.app.tcloudbase.com/)

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

- 克隆：`git clone git@e.coding.net:merrick-frontend/survey/survey.git -b main`
- 克隆完要 `npm install`
- 关联远程：`git remote add origin git@e.coding.net:merrick-frontend/survey/survey.git`
- 推送：`git push -u origin main`
- 构建打包时注意base=>网站部署
- vite插件@vitejs/plugin-legacy 打包成旧浏览器兼容
- 路由要懒加载=>速度(按需载入)