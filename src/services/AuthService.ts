import {Ref, ref} from 'vue'
/* eslint-disable */
export default class AuthService {
    private jwt: Ref<string>
    private error:Ref<string>
    
    constructor(){
        this.jwt = ref('');
        this.error = ref('');
    }

    getJwt():Ref<string>{
        return this.jwt
    }

    getError():Ref<string>{
        return this.error
    }


    async login(user:string, pass:string): Promise<boolean>{
        // Se llama al servicio de Token / login que esta en railways.
        console.log("Enter in BASIC login "+user);
        let respLogin = true;
        try{
            const respuestaServiceToken  = await fetch('https://letmepass.up.railway.app/loginNominal', {
                method:'POST', 
                headers:{
                    'Accept': 'application/json',
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    name:user,
                    pass:pass,
                    id_place:0
                })
            });
            
            const respuestaServiceTokenJson = await respuestaServiceToken.json()

            //console.log("Respuesta servicio Token Nominal: "+ {respuestaServiceTokenJson})
            if(respuestaServiceTokenJson.code == '200'){
                console.info("El servicio esta OK: " + respuestaServiceTokenJson.code);
                console.info("Mensaje:"+ respuestaServiceTokenJson.msj)
                console.info("== Se le otorgó un TOKEN ====")
                console.info(respuestaServiceTokenJson.token)
                console.info("=============================")
            }else{
                console.info("Imposible acceder, error: "+ respuestaServiceTokenJson.code);
                console.info("Respuesta: "+ respuestaServiceTokenJson.msj);
                respLogin = false;
       
            }

        }catch(error){
            respLogin = false;
            console.error(error);
        }

        return respLogin;
    }
}