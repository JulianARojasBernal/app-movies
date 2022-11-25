 let express = require ('express');

 let app = express();

 app.use(express.static(__dirname+'/dist/app_catalago'));

 app.get('/*', (req, resp) =>{
    resp.sendFile(__dirname+'/dist/app_catalago/index.php');

 });

 app.listen(process.env.PORT || 8080);