import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-status-item',
  templateUrl: './status-item.component.html',
  styleUrls: ['./status-item.component.scss'],
})
export class StatusItemComponent implements OnInit {

  @Input() arrow;
  @Input() centered;
  @Input() color: string;
  @Input() link: string;
  constructor(private router:Router) {
    
  }

  itemClick() 
  {
    if(this.link)
    {
      this.router.navigateByUrl(this.link);
    }
  }

  get useArrow() 
  {
    return this.arrow != null && this.arrow !== false && this.arrow  !== "false";
  }

  get isCentered() 
  {
    return this.centered != null && this.centered !== false && this.centered  !== "false";
  }

  ngOnInit() {}

}
