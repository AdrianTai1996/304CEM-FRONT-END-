import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private toastCtrl: ToastController) { }

  async getCryptos() {
    const result = await this.http.get(environment.REST_API + '/getCrypto/').toPromise();
    return result;
  }

  async checkFavourite(cryptoNames, userIds) {
    const body = {userId: userIds, cryptoName: cryptoNames};
    const result = await this.http.post(environment.REST_API + '/checkFav/', body).toPromise();
    return result;
  }

  async getFavourites(userId) {
    const result = await this.http.get(environment.REST_API + '/favourites/' + userId).toPromise();
    return result;
  }

  async addFavourites(cryptoNames, userIds) {
    const body = {userId: userIds, cryptoName: cryptoNames};
    const result = await this.http.post(environment.REST_API + '/addFav', body).toPromise();
    return result;
  }

  async removeFavourites(cryptoId) {
    const result = await this.http.delete(environment.REST_API + '/removeFav/' + cryptoId).toPromise();
    return result;
  }

  async getCryptoDetails(cryptoList) {
    const result = await this.http.get(environment.REST_API + '/cryptoDetails/' + cryptoList).toPromise();
    return result;
  }

  async login(userEmail, passwords) {
    const body = {email: userEmail, password: passwords};
    const result = await this.http.post(environment.REST_API + '/login', body).toPromise();
    return result;
  }

  async register(userName, userEmail, userPassword) {
    const body = {name: userName, email: userEmail, password: userPassword};
    const result = await this.http.post(environment.REST_API + '/register', body).toPromise();
    return result;
  }

  async showToast(msg, colors) {
    const result = await this.toastCtrl.create({
      message: msg,
      position: 'top',
      duration: 2000,
      color: colors
    });
    return await result.present();
  }
}
