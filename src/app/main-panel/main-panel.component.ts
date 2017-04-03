import { Component, OnInit, Input } from '@angular/core';
import { MenuItem } from 'primeng/primeng';

@Component({
  moduleId: module.id,
  selector: 'main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.css']
})
export class MainPanelComponent implements OnInit {
  @Input() tieneSideMenu: boolean = true;	
  private sidemenu: boolean;	
  private items: MenuItem[];
  constructor() { }

  ngOnInit() {
  	this.sidemenu = true;
  	this.items = [
            {
                label: 'File',
                items: [{
                        label: 'New', 
                        icon: 'fa-plus',
                        items: [
                            { label: 'Project' },
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

}
