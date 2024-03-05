//const urlServidor = "http://localhost:3000"
//const urlServidor = ""  // vacio para cuando se despliega el frontend, en el mismo servidor que el backend
const urlServidor = "https://dds-backend.azurewebsites.net"
//const urlServidor = "https://webapi.pymes.net.ar"
//const urlServidor = "https://labsys.frc.utn.edu.ar/dds-express"



const urlResourceArticulos = urlServidor + "/api/articulos";
const urlResourceArticulosFamilias = urlServidor + "/api/articulosfamilias";
const urlResourceArticulosJWT = urlServidor + "/api/jwt/articulos";

export const config = {
    urlServidor,
    urlResourceArticulos,
    urlResourceArticulosFamilias,
    urlResourceArticulosJWT,
}