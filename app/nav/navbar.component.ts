import { Component } from '@angular/core';

@Component({
    selector: 'nav-bar',
    templateUrl: './navbar.component.html',
    styles: [`
    #site-mask {        
        background: #212121;
        cursor: pointer;
        height: 100vh;
        opacity: 0.5;
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 10;
        }
    `]
})

export class NavBarComponent {
    maskMode = false;
    
    toggleMask() {
        this.maskMode = !this.maskMode;
        
    }

    collapseNav() {
        this.maskMode = false;

    }
}