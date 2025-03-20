#安装
yarn install
#编译
yarn build
#提交代码
git add .
git commit -m "auto commit"
git push
#部署代码
# $buildServer="http://it.bright-ai.com:8181"
# $headers=@{"Authorization"="Basic YWRtaW46IVEydzNlNHI="}
# Invoke-WebRequest -Uri "$buildServer/job/{appName}/build?token={token}" -Headers $headers
# Write-Output http://it.bright-ai.com