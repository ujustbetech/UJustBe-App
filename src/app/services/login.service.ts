import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Constants } from '../Utils/Constants';
import { Urls } from '../Utils/urls';
import { changePassword } from '../../app/models/ChangePasswordInfo'
import { ForgotPassword } from '../../app/models/ForgotPasswordInfo'
import { LoginInfo } from '../../app/models/login_info'
import { catchError, map } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
// import { log } from 'console';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public http: HttpClient,
    private alertCtrl: AlertController,

    ) {
    console.log('Hello LoginProvider Provider')
    
  }
  


  LogIn(LoginUser: LoginInfo) {

    this.alertCtrl.create({
      message: Urls.baseUrl + Urls.port + Constants.loginApi + "Befor Login",
      
    }).then(alertChange => alertChange.present())
    
    ////
    console.log('loginUser', JSON.stringify(LoginUser))
    console.log(Urls.baseUrl + Urls.port + Constants.loginApi + " +++ base URL")
    // this.presentAlert();
    return this.http
      .post(Urls.baseUrl + Urls.port + Constants.loginApi, LoginUser, {observe: 'response'})
      
      .pipe(map((res: any) => {
        ////
        console.log('loin', res)
        console.log('res', res)
        console.log('in_provider_login.ts', res)
        this.alertCtrl.create({
          message: Urls.baseUrl + Urls.port + Constants.loginApi + "after Login",
          
        }).then(alertChange => alertChange.present())

        return { status: res.status, json: res.body ,
        
        }

        
      }))
      .pipe(catchError((error) => {
        console.log('inside catch', error)
        return throwError(new Error(error.status))
      }))

      
  }

    
  


  forgotPasswordApi(forgotpassword: ForgotPassword) {
    ////
    console.log('loginUser', forgotpassword)
    return this.http
      .post(Urls.baseUrl + Urls.port + Constants.forgotApi, forgotpassword, {observe: 'response'})
      .pipe(map((res: any) => {
        ////
        console.log('res', res)
        console.log('in_provider_login.ts', res)
        return { status: res.status, json: res.body }
      }))
      .pipe(catchError((error) => {
        console.log('inside catch', error)
        return throwError(new Error(error.status))
      }))
  }

  /**
   * call the change password api
   * @param changepassword object containing new passwor and userId
   * returns success/failure msg
   */
  changePasswordApi(changePassword: changePassword) {
    // console.log("loginUser", changePassword)
    // return this.http.post(Urls.baseUrl + Urls.port + Constants.changePasswordApi, changePassword).map(res => {

    //   ////
    //   console.log("res", res);
    //   console.log("in_provider_login.ts", res);
    //   return { "status": res.status, "json": res }
    // }).catch((error) => {
    //
    //   console.log("inside catch", error);
    //   return throwError(new Error(error.status));
    // });
    return this.http
      .post(
        Urls.baseUrl + Urls.port + Constants.changePasswordApi,
        changePassword,
        {observe: 'response'}
      )
      .pipe(map((res: any) => {
        ////

        console.log('res', res)
        console.log('in_provider_login change password.ts', res)

        return { status: res.status, json: res.body }
      }))
      .pipe(catchError((error) => {
        console.log('inside catch', error)
        if (error.status === 500) {
          ////
          return throwError(new Error(error.status))
        } else if (error.status === 400) {
          ////
          return throwError(new Error(error.status))
        } else if (error.status === 404) {
          ////
          return throwError(new Error(error.status))
          //return { "status": error.status, "json": error.json() };
        } else if (error.status === 406) {
          ////
          return throwError(new Error(error.status))
        } else if (error.status === 401) {
          ////
          return throwError(new Error(error.status))
        } else {
          return throwError(new Error(Constants.someErrorOccurred))
        }
      }))
  }}
