
# 个人项目

[[toc]]


## web

### 工作台 

<font size=3 >
<a data-fancybox="box"  href="https://static.kongdf.com/box/box.png" rel="external nofollow" >图片预览</a><a data-fancybox="box"  href="https://static.kongdf.com/box/box1.png"></a>
<a data-fancybox="gallery"  href="https://static.kongdf.com/box/box2.png"></a>
<a data-fancybox="box"  href="https://static.kongdf.com/box/box3.png"></a></font>

项目链接:[https://box.kongdf.com](https://box.kongdf.com)

项目描述：集成了登录注册系统、导航功能、笔记功能、日历功能、Word/Excel 文件预览功能、音视频转换功能、图片压缩功能，以及一些资源的收录和公众号自动回复设置等功能。

<details> 
    <summary>项目技术栈</summary>

    * 前端:vite+vue3,使用provide/inject代替pinia。
    * 后端:koa2+云MySQL+prisma(ORM)。
    * 自动部署:coding+jenkins。
    * 导航功能：收录自己常用导航页,添加分组功能。
    * 笔记功能：使用vditor进行markdown语法编辑器与预览,所见即所得。
    * 日历功能：接入百度日历api,方便自己管理日程安排，提醒重要事件。
    * Word/Excel文件预览功能：代替wps,并为图片增加prew事件,方便自己查看。
    * 音视频转换功能：使用WebRTC进行录像录屏,使用ffmpeg.wasm支持不同格式的音视频文件转换。
    * 图片压缩功能：初版使用Canvas进行压缩,后使用lrz进行压缩。
    * 资源收录：收录一些常用软件/教程等。
    * 公众号回复设置:接入公众号,设置公众号的回复内容等。

</details>

## 小程序

###  weLove  

<font size=3 >
<a data-fancybox="welove"  href="https://static.kongdf.com/welove/1.jpg" rel="external nofollow" >图片预览</a><a data-fancybox="welove"  href="https://static.kongdf.com/welove/2.jpg"></a>
<a data-fancybox="welove"  href="https://static.kongdf.com/welove/3.jpg"></a></font>

项目描述：一款恋爱小程序,包含了难以抉择功能、天气查询、存款备忘录、饭店点评、账号备忘录等实用功能;

<details> 
    <summary>项目技术栈</summary>

    * 前端:Taro+原生+nut Ui。
    * 后端:Express+云MySQL+prisma(ORM)。
    * 难以抉择：大转盘,初版使用Canvas实现,后使用lucky-canvas。
    * 天气查询：接入和风天气api,根据定位获取当前天气,以及常用地区天气查询。
    * 饭店点评：小程序自带map组件+markers绘制地图,通过定位/名称查询当前饭店后进行点评,图床使用七牛云进行上传/查看;
    * 账号备忘录：管理各种账号和密码信息,避免遗忘或泄露。

</details>

## Tauri 

### FormatConversion 

项目链接:[https://github.com/kongdf/tauri-FormatConversion](https://github.com/kongdf/tauri-FormatConversion)

项目描述：一款 Tauri+ffmpeg 的 PC 端音视频格式转换工具;
 
### JDfund  

项目链接:[https://github.com/kongdf/JDfund](https://github.com/kongdf/JDfund)

项目描述：京东积存金价实时悬浮窗(支持Mac/Windows)  
