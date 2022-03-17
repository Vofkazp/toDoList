import {Component, OnInit} from '@angular/core';
import {ListService} from "./service/list.service";
import {ListInterface} from "./service/list-interface";
import {MatDialog} from "@angular/material/dialog";
import {ModalDialogComponent} from "./dialog/modal-dialog/modal-dialog.component";
import {ConfirmDialogComponent} from "./dialog/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  listData: ListInterface[] | undefined = [];
  listReady: ListInterface[] | undefined = [];
  listDataCount: number | undefined;
  listReadyCount: number | undefined;
  countElement: number | undefined = 0;
  load: boolean = false;

  constructor(
    private listService: ListService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.listData = [];
    this.listReady = [];
    this.listService.getList().then(response => {
      // @ts-ignore
      this.prepareData(response.content);
      this.countElement = response?.TotalElement;
    }).catch(e => {
      // throw e;
      this.load = true;
    })
  }

  prepareData(data: ListInterface[]) {
    for (let item of data) {
      if(item.visibility === 'true') {
        this.listData?.push(item);
      } else {
        this.listReady?.push(item);
      }
    }
    this.listDataCount = this.listData?.length;
    this.listReadyCount = this.listReady?.length;
  }

  addItem() {
    const dialogRef = this.dialog.open(ModalDialogComponent, {
      height: 'auto',
      width: '600px',
      data: {
        action: 'Add',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.loadData();
    });
  }

  editItem(id?: number) {
    const dialogRef = this.dialog.open(ModalDialogComponent, {
      height: 'auto',
      width: '600px',
      data: {
        action: 'Edit',
        id: id
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.loadData();
    });
  }

  deleteItem(id?: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: 'auto',
      width: '600px',
      data: {
        id: id
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.loadData();
    });
  }

  editStatus(item: ListInterface) {
    const status = item.visibility === 'true' ? 'false' : 'true';
    this.listService.updateStatusById(item.id, status).then(res=>{
      this.loadData();
    }).catch(e=>{
      console.log(e);
      throw e;
    });
  }
}
