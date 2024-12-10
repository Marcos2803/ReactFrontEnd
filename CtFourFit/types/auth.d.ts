declare namespace Auth{
    //UserService
    type User = {
        id?: string;
        primeiroNome?: string;
        sobreNome?: string;
        celular?: string;
        email?: string;
        password?: string;
        confirmPassword?: string;
        [key: string]: any;
       
    };

} 

