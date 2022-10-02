import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProductService } from '../../product.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {
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

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }

  constructor(private router: Router,
    private _productService: ProductService) {
    this.urlLastValue = this.url.substr(this.url.lastIndexOf('/') + 1);
  }

  ngOnInit(): void {
    let params = { productId: this.urlLastValue };
    this._productService.getProductById(params).subscribe((res: any) => {
      this.row = res.data[0];
    })

  }
  changeProductStatus(status, disApproveReasion) {
    let obj: any;
    if (status == 1) {
      obj = {
        productId: this.urlLastValue,
        productStatus: 1,
        productApprovement: 1,
      };
    }
    else {
      obj = {
        productId: this.urlLastValue,
        productApprovement: 2,
        disApproveReasion
      };
    }
    this._productService.changeProductStatus(obj).subscribe((res) => {
      console.log(res);
      if (res['status'] === 200) {
        this.toastMixin.fire({
          animation: true,
          title: res['message']
        });
      }
    })
  }
  

}
