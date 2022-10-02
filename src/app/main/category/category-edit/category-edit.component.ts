import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CategoryService } from '../category.service'

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss']
})
export class CategoryEditComponent implements OnInit {
  title: any;
  urlLastValue: any;
  row: any;
  public url = this.router.url;
  toastMixin = Swal.mixin({
    toast: true,
    icon: 'success',
    title: 'General Title',
    animation: false,
    position: 'top-right',
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: true
  });
  constructor(private CategoryService: CategoryService, private router: Router) {
    this.urlLastValue = this.url.substr(this.url.lastIndexOf('/') + 1);
  }

  ngOnInit(): void {
    const data = { id: this.urlLastValue };
    this.CategoryService.getSingleCategory(data).subscribe((res) => {
      this.row = res['data'];
      this.title = res['data'].title
    })
  }
  editcategory(form, id) {
    if (form.valid) {
      let data = { id: id, title: this.title }
      this.CategoryService.updateCategory(data).subscribe((response) => {
        if (response['status'] == 200) {
          this.toastMixin.fire({
            animation: true,
            title: response['message']
          });
          const navigationExtras: NavigationExtras = {
            state: {
              countryCode: this.row.countryCode
            }
          };
          this.router.navigate(['category'], navigationExtras);
        }
      }, (err) => {
        this.toastMixin.fire({
          title: err,
          icon: 'error'
        });
      })
    }
    else {
      return false;
    }
  }

}
