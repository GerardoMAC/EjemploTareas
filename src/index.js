const app = require('./app');


app.listen(app.get('port'), () =>{
    console.log("Server is true", app.get("port"));
    
});
