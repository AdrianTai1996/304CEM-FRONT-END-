import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  cryptoList;
  currentTab = 'all';
  constructor(public router: Router, public storage: Storage, public apiServ: ApiService) {}

  async ngOnInit() {
    this.cryptoList = await this.apiServ.getCryptos();
  }

  async searchTabs(val) {
    this.router.navigate(['/list'], {queryParams: {value: val}});
  }

  ionViewDidEnter() {
    this.currentTab = 'all';
    this.ngOnInit();
  }

  async doRefresh(event) {
    this.cryptoList = [];
    if (this.currentTab === 'favourites') {
      const storage = await this.storage.get('CryptoApp');
      const result: any = await this.apiServ.getFavourites(storage.id);
      console.log(result);

      const joinResults = result.data.join();
      this.cryptoList = await this.apiServ.getCryptoDetails(joinResults);
    } else {
      this.ngOnInit();
    }

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  async segmentChanged(event) {
    this.currentTab = event.detail.value;
    this.cryptoList = [];
    if (this.currentTab === 'favourites') {
      const storage = await this.storage.get('CryptoApp');
      const result: any = await this.apiServ.getFavourites(storage.id);
      console.log(result);
      if (result.success && result.data.length > 0) {
        const joinResults = result.data.join();
        this.cryptoList = await this.apiServ.getCryptoDetails(joinResults);
      } else {
        this.cryptoList = [];
      }
    } else {
      this.ngOnInit();
    }
  }

  gotoList(id) {
    this.router.navigateByUrl('/list/' + id);
  }

  logout() {
    this.router.navigate(['/signin']);
    this.storage.remove('CryptoApp');
    this.apiServ.showToast('Logged Out', 'danger');
  }
}
