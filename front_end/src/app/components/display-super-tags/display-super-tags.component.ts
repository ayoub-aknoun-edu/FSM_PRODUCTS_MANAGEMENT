import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SuperTag } from 'src/app/models/SuperTag';
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: 'app-display-super-tags',
  templateUrl: './display-super-tags.component.html',
  styleUrls: ['./display-super-tags.component.css']
})
export class DisplaySuperTagsComponent implements OnInit {

  superTags: SuperTag[] = [];

  constructor(private tagService: TagService, private router: Router) { }

  ngOnInit(): void {
    this.getSuperTags();
  }

  getSuperTags(): void {
    this.tagService.getSuperTags().subscribe(
      (superTags: SuperTag[]) => {
        this.superTags = superTags;
      },
      (error) => {
        console.error('Error fetching SuperTags:', error);
      }
    );
  }

  onSuperTagClick(superTag: SuperTag): void {
    // Navigate to the DisplayTagsComponent with the selected SuperTag name as a parameter
    this.router.navigate(['/display-tags', superTag.name]);
  }

}
