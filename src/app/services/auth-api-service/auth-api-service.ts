import { AuthenticationService } from '../authentication/authentication.service';
//import { NotificationService } from '../notification/notification.service';
import { ApiService } from '../api/api.service';

export abstract class AuthApiService
{

    //constructor(public api:ApiService, public auth:AuthenticationService, public notification:NotificationService)
    constructor(public api:ApiService, public auth:AuthenticationService)
    {
    }

    getHeaders() 
    {
        let headers = {};
        headers["Api-Token"] = this.auth.apiToken;
        if(this.auth.tokenFcm != null)
        {
        //headers["FCM-Token"] = this.auth.tokenFcm; //this.notification.token;
        }

        return headers;
    }

    get(endpoint: string, params?: any)
    {
        return this.api.get(endpoint, params, this.getHeaders());
    }

    post(endpoint: string, body: any) 
    {
        return this.api.post(endpoint, body, this.getHeaders());
    }
}