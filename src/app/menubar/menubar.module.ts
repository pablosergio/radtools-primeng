import { NgModule, Component, ElementRef, AfterViewInit, OnDestroy, Input, Output, Renderer, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/primeng';
import { MenuItem } from 'primeng/primeng';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'p-menubarSub',
    template: `
        <ul [ngClass]="{'ui-menubar-root-list ui-helper-clearfix':root, 'ui-widget-content ui-corner-all ui-helper-clearfix ui-menu-child ui-shadow':!root}" class="ui-menu-list"
            (click)="listClick($event)">
            <template ngFor let-child [ngForOf]="(root ? item : item.items)">
                <li #item [ngClass]="{'ui-menuitem ui-widget ui-corner-all':true,'ui-menu-parent':child.items,'ui-menuitem-active':item==activeItem}"
                    (mouseenter)="onItemMouseEnter($event,item,child)" (mouseleave)="onItemMouseLeave($event,item)">
                    <a #link [href]="child.url||'#'" class="ui-menuitem-link ui-corner-all" [attr.target]="child.target"
                        [ngClass]="{'ui-state-disabled':child.disabled}" (click)="itemClick($event, child)">
                        <span class="ui-menuitem-icon fa fa-fw" *ngIf="child.icon" [ngClass]="child.icon"></span>
                        <span class="ui-menuitem-text">{{child.label}}</span>
                        <span class="ui-submenu-icon fa fa-fw" *ngIf="child.items" [ngClass]="{'fa-caret-down':root,'fa-caret-right':!root}"></span>
                    </a>
                    <p-menubarSub class="ui-submenu" [item]="child" *ngIf="child.items"></p-menubarSub>
                </li>
            </template>
        </ul>
    `,
    providers: [DomHandler]
})
export class MenubarSub {

    @Input() item: MenuItem;
    
    @Input() root: boolean;
   
    constructor(public domHandler: DomHandler, public router: Router) {}
    
    activeItem: any;
    
    onItemMouseEnter(event, item, menuitem: MenuItem) {
        if(menuitem.disabled) {
            return;
        }
        
        this.activeItem = item;
        let nextElement =  item.children[0].nextElementSibling;
        if(nextElement) {
            let sublist = nextElement.children[0];
            sublist.style.zIndex = ++DomHandler.zindex;
            
            if(this.root) {
                sublist.style.top = this.domHandler.getOuterHeight(item.children[0]) + 'px';
                sublist.style.left = '0px'
            }
            else {
                sublist.style.top = '0px';
                sublist.style.left = this.domHandler.getOuterWidth(item.children[0]) + 'px';
            }
        }
    }
    
    onItemMouseLeave(event, link) {
        this.activeItem = null;
    }
    
    itemClick(event, item: MenuItem) {
        if(item.disabled) {
            event.preventDefault();
            return;
        }
        
        if(!item.url||item.routerLink) {
            event.preventDefault();
        }
        
        if(item.command) {
            if(!item.eventEmitter) {
                item.eventEmitter = new EventEmitter();
                item.eventEmitter.subscribe(item.command);
            }
            
            item.eventEmitter.emit({
                originalEvent: event,
                item: item
            });
        }

        if(item.routerLink) {
            this.router.navigate(item.routerLink);
        }
        
        this.activeItem = null;
    }
        
    listClick(event) {
        this.activeItem = null;
    }


}

@Component({
    selector: 'p-menubar',
    template: `
        <div [ngClass]="{'ui-menubar ui-menu ui-widget ui-widget-content ui-corner-all ui-helper-clearfix':true}" 
            [class]="styleClass" [ngStyle]="style">
            <a class="btn ui-menu btn-logo"><img src="../../images/radlogo-light.png" style="margin-right: 10px;"/></a>
            <p-menubarSub [item]="model" root="root"></p-menubarSub>
            <a class="btn ui-menu btn-salir" (click)="logout($event)"><i class="fa fa-power-off icon-btn"></i>Salir</a>
            <a class="btn ui-menu btn-user"><i class="fa fa-user-circle icon-user"></i>{{user}}</a>
        </div>
    `,
    providers: [DomHandler]
})
export class Menubar implements OnDestroy {

    @Input() model: MenuItem[];

    @Input() style: any;

    @Input() styleClass: string;

    @Input() user: string;

    @Output() onLogout = new EventEmitter<boolean>();
            
    constructor(public el: ElementRef, public domHandler: DomHandler, public renderer: Renderer) {}
    
    unsubscribe(item: any) {
        if(item.eventEmitter) {
            item.eventEmitter.unsubscribe();
        }
        
        if(item.items) {
            for(let childItem of item.items) {
                this.unsubscribe(childItem);
            }
        }
    }
        
    ngOnDestroy() {        
        if(this.model) {
            for(let item of this.model) {
                this.unsubscribe(item);
            }
        }
    }


    logout(event){
    	this.onLogout.emit(true);
    }

}

@NgModule({
    imports: [CommonModule],
    exports: [Menubar],
    declarations: [Menubar,MenubarSub]
})
export class MenubarModule { }