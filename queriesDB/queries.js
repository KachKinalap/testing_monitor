const mysql = require('mysql')
const queryTemplates = require('./declarationsQueries')
const uuid = require('uuid');


const connConfig = mysql.createConnection({
    host:"localhost",
    user:"root",
    database:"letuchki",
    password:""
})

exports.loginQuery =  (request, response) => {
    const creds = request.body;
    const initialPath = __dirname.substr(0,__dirname.length - 10);
    console.log("initialPath:\t"+initialPath)
    console.log('\n\nstarted login process\n\n');
    const formattedCreds = [creds.surname, creds.name, Number(creds.group)];

    connConfig.query(queryTemplates.findUser, formattedCreds, (err, result) => {
        if (err) {
            console.log('resultOFQuery:', err);
            response.json(JSON.stringify("errorFindingUser"));
        } else {
            //если такого пользователя вдруг нет
            if(!result.length){
                //если пароль был указан, значит, хотел получить доступ к админу, нового пользователя не создаём, а этого выкидываем, т.к. данные не верны
                if(creds.password){
                    console.log("admin is wrong");
                    response.json(JSON.stringify("adminIsWrong"));
                }
                //здесь создаём нового пользователя, т.к. его нет и права админа он не запрашивает, то есть опасности не представляет
                else{
                    const inputMass = [uuid.v4(), Number(creds.group), creds.surname, creds.name, 0, ""];
                    console.log(inputMass)
                    connConfig.query(queryTemplates.createUser, inputMass, (err, result) => {
                        if(err){
                            console.log("errorCreatingUser\n", err)
                            response.json(JSON.stringify("errorCreatingUser"));
                        }
                        else{
                            console.log("userIsCreated")
                            response.redirect("/pages/profile");
                            //response.sendFile(initialPath + "/pages/client.html");
                        }
                    })
                }
            }
            else{
                if("password" in creds){
                    if(result[0].isAdmin && creds.password === result[0].password){
                        console.log("adminIsRight")
                        response.redirect("/pages/special");
                    }
                    else{
                        console.log("adminIsWrong")
                        response.json(JSON.stringify("adminIsWrong"));
                    }
                }
                else{
                    console.log("userHaveFound")
                    response.redirect("/pages/profile");
                    //response.sendFile(initialPath + "/pages/client.html");
                }
            }
        }
    });
}

exports.surveyProcessing = (request, response) => {
    const formattedSurvey = [uuid.v4(), request.body.title, Number(request.body.count)]
    connConfig.query(queryTemplates.pasteSurvey, formattedSurvey, (err, result) => {
        if(err) {
            console.log(err);
        }
        else {
            console.log(result);
        }
    });
}

exports.surveysGetting = (request, response) => {
    connConfig.query(queryTemplates.getSurveys, (err, result) => {
        if(err) {
            console.log(err);
        }
        else {
            const arrayToSend = [];
            for(let i = 0; i < result.length; ++i){
                arrayToSend.push({id:result[i].uniqueId, surveyTitle:result[i].surveyTitle, questionsCount:result[i].questionsCount})
            }
            console.log(result[0]);
            response.json(arrayToSend);
        }
    });
}
