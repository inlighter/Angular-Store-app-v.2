import { Component } from '@angular/core'

@Component({
  template: `
    <h1 class="errorMessage">404'd</h1>
    <p>You have reached the very last page of the Internet</p>
  `,
  styles: [`
    .errorMessage { 
      margin-top:150px; 
      font-size: 170px;
      text-align: center; 
    }
    p {
      text-align: center;
      font-size: 24px;
    }
    `]
})
export class Error404Component{
  

}
