# 记一次coding代码提交时推送github
我在coding上有一个项目想要同步推送到github上,正好coding有持续集成,那就搞起来;

## 获取github的token
登录GitHub 

        ⬇️

 `settings/profile` 
 
        ⬇️
 
  `Developer settings`

        ⬇️

新建token (记得勾选`repo`) ;


## 设置coding持续集成脚本

直接新建一个空的就可以,然后覆盖

```Groovy
pipeline {
 agent any
 stages {
   stage('检出') {
     steps {
       checkout([
         $class: 'GitSCM',
         branches: [[name: env.GIT_BUILD_REF]],
         userRemoteConfigs: [[url: env.GIT_REPO_URL, credentialsId: env.CREDENTIALS_ID]]
       ])
     }
   }
   stage('推送部署') {
     steps {
       echo '正在推送文件...'
       sh 'git fetch $FETCH'
       sh 'git push -f $FETCH HEAD:master'
       echo '已完成推送.'
     }
   }
 }
}
```
然后设置环境变量 

key : `FETCH` 

value : `https://用户名:token@github.com/用户名/仓库名.git`

> 注意一下分支名称, git分支默认mian,coding 默认分支上master;

搞定~