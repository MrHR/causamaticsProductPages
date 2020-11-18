## Start application

 1. In terminal/cmd navigate to project directory.
 2. Exec. "dotnet restore"
 3. Exec. "dotnet watch run"

## Commands for Publishing the application

dotnet publish --configuration Release --runtime win-x86 --self-contained
-> goto published app folder
-> right click "publish" folder 
-> click "Deploy to web app"
-> Deploy to causametics app service(causameticsEmotionPages)