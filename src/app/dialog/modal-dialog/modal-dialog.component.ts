import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ListService} from "../../service/list.service";
import {ListInterface} from "../../service/list-interface";

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.scss']
})
export class ModalDialogComponent implements OnInit {
  title: string;
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ModalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private ListData: ListService
  ) {
  }

  ngOnInit(): void {
    this.createForm();
    this.loadData();
  }

  loadData() {
    if (this.data.id) {
      this.ListData.getItemById(this.data.id).then((response) => {
        this.form.patchValue(response as ListInterface);
      }).catch((e) => {
        throw e;
      })
      this.title = 'Редактировать пункт';
    } else {
      this.title = 'Создать пункт';
    }
  }

  createForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      description: [''],
      visibility: ['true', [Validators.required]]
    });
  }

  submit() {
    if (this.form.valid) {
      if (this.data.id) {
        this.ListData.updateItemById({
          ...this.form.value,
          id: +this.data.id
        }).then(() => {
          this.dialogRef.close();
        }).catch((e) => {
          throw e;
        });
      } else {
        this.ListData.createItem({
          ...this.form.value,
          visibility: 'true'
        }).then(() => {
          this.dialogRef.close();
        }).catch((e) => {
          throw e;
        });
      }
    }
  }

}
