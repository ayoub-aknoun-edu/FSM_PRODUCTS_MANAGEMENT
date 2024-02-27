import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Tag } from 'src/app/models/Tag';
import { HistoryService } from 'src/app/services/history.service';
import { TagService } from 'src/app/services/tag.service';
import { DisplayTagsHistoryComponent } from '../display-tags-history/display-tags-history.component';
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-display-tags',
  templateUrl: './display-tags.component.html',
  styleUrls: ['./display-tags.component.css']
})
export class DisplayTagsComponent implements OnInit {
  tags: Tag[] = [];

  constructor(
    private route: ActivatedRoute,
    private tagService: TagService,
    private router: Router,
    private dialog: MatDialog,
    private historyService: HistoryService,
    public ks:KeycloakService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const superTagName = params['superTagName'];
      if (superTagName) {
        this.getTagsBySuperTag(superTagName);
      }
    });
  }

  getTagsBySuperTag(superTagName: string): void {
    this.tagService.getTagsBySuperTag({
      name: superTagName,
      id: 0
    }).subscribe(
      (tags: Tag[]) => {
        this.tags = tags;
      },
      (error) => {
        console.error(`Error fetching tags for SuperTag ${superTagName}:`, error);
      }
    );
  }

  displayHistory(tag: Tag): void {
    this.historyService.getHistoryByTag(tag.name).subscribe(
      (historyList) => {

      },
      (error) => {
        console.error('Error fetching history:', error);
      }
    );
  }

  onTagCardClick(tag: Tag): void {
    const supertagName = tag.superTag.name;
    const tagName = tag.name;
    this.router.navigate(['/products', supertagName, tagName]);
  }

  displayTagHistory(tagName: String) {
    this.historyService.getHistoryByTag(tagName).subscribe(
      (history) => {
        const popup = this.dialog.open(DisplayTagsHistoryComponent, {
          enterAnimationDuration: '500ms',
          exitAnimationDuration: '500ms',
          width: '70%',
          height: '70%',
          data: { history }
        });

        popup.afterClosed().subscribe(res => {
        });
      },
      error => {
        console.error('Error fetching history:', error);
      }


    )
  }

}
