# 删除长时间没更新的分支
新建个.sh文件

```bash
#!/bin/bash
git checkout master

beforeDay=150 # 天数修改

tarBranch=$(git branch -r )
for branch in $tarBranch
do
 echo $branch
 lastDate=$(git show -s --format=%ci origin/$branch)
 convertDate=$(echo $lastDate | cut -d' ' -f 1)
 Todate=$(date -d "$convertDate" +'%s')
 current=$(date +'%s')
 day=$(( ( $current - $Todate )/60/60/24 ))
 echo "last commit on $branch branch was $day days ago"
 if [ "$day" -gt $beforeDay ]; then  
    git push origin :$branch
    echo "delete the old branch $branch"
 fi
done

git checkout develop
#deleted merged branches on developer branch
tarBranch=$(git branch -r)
for branch in $tarBranch
do
 echo $branch
 lastDate=$(git show -s --format=%ci origin/$branch)
 convertDate=$(echo $lastDate | cut -d' ' -f 1)
 Todate=$(date -d "$convertDate" +'%s')
 current=$(date +'%s')
 day=$(( ( $current - $Todate )/60/60/24 ))
 echo "last commit on $branch branch was $day days ago"
 if [ "$day" -gt $beforeDay ]; then
    git push origin :$branch
    echo "delete the old branch $branch"
 fi
done  
```

