import { Component } from '@angular/core';
import { ReleaseForm } from 'src/app/models/ReleaseForm';
import { ReleaseFormService } from 'src/app/services/release-form.service';

@Component({
  selector: 'app-display-release-forms',
  templateUrl: './display-release-forms.component.html',
  styleUrls: ['./display-release-forms.component.css']
})
export class DisplayReleaseFormsComponent {
  releaseForms!: ReleaseForm[];

  constructor(private releaseFormService: ReleaseFormService) {
    this.loadReleaseForms()
  }

  loadReleaseForms() {
    this.releaseFormService.getAllReleaseForms().subscribe(
      (res) => {
        this.releaseForms = res;
      }
    )
  }

}
