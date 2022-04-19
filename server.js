const express = require("express");
const customQueries = require("./queriesDB/queries")
const app = express();

//app.use(express.static(__dirname + "pages"));

const pagesRouter = express.Router();

app.get("/", (request, response)=>{
    response.sendFile(__dirname + "/pages/login.html");
});

const jsonParser = express.json();
//логин
app.post("/", jsonParser, customQueries.loginQuery);
//получаем админскую панель
pagesRouter.get("/special", function(request, response){
    response.sendFile(__dirname + "/pages/admin.html");
});
//получаем панель юзера
pagesRouter.get("/profile", function(request, response){
    response.sendFile(__dirname + "/pages/client.html");
});
//получаем ответы от юзера
app.post("/answers", jsonParser, customQueries.answersProcessing);
//даём ответы админу
app.get("/answers", jsonParser, customQueries.answersGetting);
//очищаем табличку для админа
app.get("/cleananswers", customQueries.cleanAnswers);
//создание опроса
app.post("/survey", jsonParser, customQueries.surveyProcessing);
//получение опроса студентами
app.get("/surveys",jsonParser, customQueries.surveysGetting);

app.use("/pages", pagesRouter);


app.listen(3000);



