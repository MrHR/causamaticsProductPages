# Readme

## create application
1. In Terminal:
````
dotnet new pirahna.mvc
````
## Start application

 1. In terminal/cmd navigate to project directory.
 2. Exec. these commands:
 ````
 dotnet restore
 dotnet watch run
 ````

## Commands for Publishing the application

dotnet publish --configuration Release --runtime win-x86 --self-contained
 1. goto published app folder
 2. right click "publish" folder 
 3. click "Deploy to web app"
 4. Deploy to causametics app service(causameticsEmotionPages)