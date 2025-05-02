# The Agora

The Agora is a single-page web applicaiton built in Angular 19.2.4 that aggregates news articles obtained from NewsAPI. Users can view the top headlines or news by topic or keyword. Additionally, users can drag story cards to *To Be Read* and *Reading* boards to save them for later. When an article has been read, the card can be dragged to the *Read* board, which will remove it from page.  

## To Run

To run the Agora locally, there are a few steps you must follow:

First, go [here](http://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) and follow the instructions for cloing the respository.

Next, you will need to obtain an API key from NewsAPI. Go [here](https://newsapi.org/) and click on the 'Get API Key' button. You will be prompted to register and given an access key. Note: you can sign up for a development account, which is free and allows 100 queries per hour. 

Once you have the key, you will need to add that key to the `news.service.ts` file located at `src\app\services\news.service.ts`.  Simply scroll down until you find the private `apiKey` variable and replace it's value with the key you received from NewsAPI. Don't forget to save the file with the new value.

Finally, you will need to install the dependencies on which the app relies; this is a sizeable folder, and so isn't uploaded to the github repository. To install the dependencies, navigate The Agora's directory in a terminal and run:

```
npm install
```

With the key in place, to start a local development server, open your terminal of choice and run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

Note: If you are using Windows Powershell, Angular commands like `ng` will not work by default, due to Powershell's execution policy. To enable the execution of these commands, go [here](https://www.angularjswiki.com/angular/run-angular-commands-in-powershell/) and follow the instructions.






