import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  loading = false;
  result: any = [];
  isFav = false;
  favouriteId;
  details;

  constructor(private actRoute: ActivatedRoute, private apiServ: ApiService,
              private storage: Storage) { }

  async ngOnInit() {
    this.loading = true;

    const id = await this.actRoute.snapshot.params.id;
    const storage = await this.storage.get('CryptoApp');

    this.result = await this.apiServ.getCryptoDetails(id);
    const check: any = await this.apiServ.checkFavourite(id, storage.id);
    this.isFav = check.success && check.data.length > 0;
    if (this.isFav) {
    this.favouriteId = check.data[0].id;
   }
    this.loading = false;
  }

  async addRemoveFav(id) {
    const storage = await this.storage.get('CryptoApp');
    if (this.isFav) {
      const result: any = await this.apiServ.removeFavourites(this.favouriteId);
      console.log(result);
      if (result.success) {
        this.apiServ.showToast(result.message, 'success');
        this.isFav = false;
      } else {
        this.apiServ.showToast(result.message, 'danger');
      }
    } else {
      const result: any = await this.apiServ.addFavourites(id, storage.id);
      if (result.success) {
        this.apiServ.showToast(result.message, 'success');
        this.favouriteId = result.data[0].id;
        this.isFav = true;
      } else {
        this.apiServ.showToast(result.message, 'danger');
      }
    }
  }

}
