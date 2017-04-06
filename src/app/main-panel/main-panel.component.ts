import { Component, OnInit, Input } from '@angular/core';
import { MenuItem } from 'primeng/primeng';
import { LoaderService } from '../common/api';
@Component({
  moduleId: module.id,
  selector: 'main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.css']
})
export class MainPanelComponent implements OnInit {
  @Input() tieneSideMenu: boolean = false;	
  private sidemenu: boolean;	
  private items: MenuItem[];
  private usuario: string = "P. Sergio Alvarado G.";
  objLoaderStatus: boolean;
  
  constructor(private loaderService: LoaderService) { 
    this.objLoaderStatus = true;
  }

  ngOnInit() {
    this.loaderService.loaderStatus.subscribe((val: boolean) => {
      console.log('activar spinner');
            this.objLoaderStatus = val;
    });

  	this.sidemenu = this.tieneSideMenu;
  	this.items = [
            {
                label: 'File',
                items: [{
                        label: 'New', 
                        icon: 'fa-plus',
                        items: [
                            { label: 'Project', routerLink: ['/main/setting-applications'] },
                            { label: 'Other' },
                        ]
                    },
                    { label: 'Open' },
                    { label: 'Quit' }
                ]
            },
            {
                label: 'Edit',
                icon: 'fa-edit',
                items: [
                    { label: 'Undo', icon: 'fa-mail-forward' },
                    { label: 'Redo', icon: 'fa-mail-reply' }
                ]
            }
        ];
  }

  logout(event) {
    alert('salir');
  }

}
