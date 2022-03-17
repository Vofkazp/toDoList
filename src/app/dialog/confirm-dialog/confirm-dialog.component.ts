import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ModalDialogComponent} from "../modal-dialog/modal-dialog.component";
import {ListInterface} from "../../service/list-interface";
import {ListService} from "../../service/list.service";

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  title: string | undefined;

  constructor(
    public dialogRef: MatDialogRef<ModalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ListData: ListService
  ) { }

  ngOnInit(): void {
    this.ListData.getItemById(this.data.id).then((response) => {
      this.title = response?.name;
    }).catch((e) => {
      throw e;
    })
  }

  submit() {
    this.ListData.deletelistById(Number(this.data.id)).then(() => {
      this.dialogRef.close();
    }).catch(e=>{
      throw e;
    })
  }
}
