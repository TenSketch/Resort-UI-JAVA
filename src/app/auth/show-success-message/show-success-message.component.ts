// import { Component } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';

// @Component({
//   selector: 'app-show-success-message',
//   templateUrl: './show-success-message.component.html',
//   styleUrls: ['./show-success-message.component.scss']
// })
// export class ShowSuccessMessageComponent {
//   email: string;
//   form: any;

//   constructor(private route: ActivatedRoute) { }
//   ngOnInit(): void {
//     this.route.queryParams.subscribe(params => {
//       // this.email = params['id'];
//       this.email = this.form.value.email;

//       //console.log("this.id==",this.email)
//     });
//   }
// }


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show-success-message',
  templateUrl: './show-success-message.component.html',
  styleUrls: ['./show-success-message.component.scss']
})
export class ShowSuccessMessageComponent implements OnInit {
  email: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
    });
  }
}
