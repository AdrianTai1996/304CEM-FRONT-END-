import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  showSignInForm = true;
  shibePics;
  // showSignUpForm = false;
  constructor(private apiServ: ApiService, public router: Router, private storage: Storage,
              public toastController: ToastController, public loadingController: LoadingController) { }

  async ngOnInit() {
  }

  goToRegister(input) {
    this.showSignInForm = false;
    input.value = null;
  }

  goToLogin(username, email) {
    username = null;
    email = null;
    this.showSignInForm = true;
  }

  async register(username, email, password) {
    if (username.value === '' || username.value == null) {
      this.apiServ.showToast('Please fill in your name', 'warning');
    } else if (email.value === '' || email.value == null) {
      this.apiServ.showToast('Email cannot be blank', 'warning');
    } else if (password.value === '' || password.value == null) {
      this.apiServ.showToast('Please fill in your password', 'warning');
    } else {
      this.presentLoading();
      const res: any = await this.apiServ.register(username.value, email.value, password.value);
      if (res && res.success) {
        this.apiServ.showToast(res.message, 'success');
        this.showSignInForm = true;
      } else {
        this.apiServ.showToast(res.message, 'danger');
      }

    }
  }

  async login(email, password) {
    if (email.value === '' || email.value == null) {
      this.apiServ.showToast('Please fill in your email', 'warning');
    } else if (password.value === '' || password.value == null) {
      this.apiServ.showToast('Please fill in your password', 'warning');
    } else {
      this.presentLoading();
      const res: any = await this.apiServ.login(email.value, password.value);
      if (res && res.success) {
        this.apiServ.showToast(res.message, 'success');
        this.storage.set('CryptoApp', {email: res.data.email, id: res.data.id, name: res.data.name});
        this.router.navigate(['/home']);
      } else {
        this.apiServ.showToast(res.message, 'danger');
      }
    }
  }

  async presentToast(messages, colors) {
    const toast = await this.toastController.create({
      message: messages,
      duration: 2000,
      color: colors,
      position: 'top'
    });
    toast.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
      duration: 1000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

}
