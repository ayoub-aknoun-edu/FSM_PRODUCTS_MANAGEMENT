import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SuperTag } from 'src/app/models/SuperTag';
import { Tag } from 'src/app/models/Tag';
import { ProductService } from 'src/app/services/product.service';
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: 'app-update-products-tag',
  templateUrl: './update-products-tag.component.html',
  styleUrls: ['./update-products-tag.component.css']
})
export class UpdateProductsTagComponent implements OnInit {

  superTags!: SuperTag[];
  tags!: Tag[];
  selectedSuperTagName: any;
  selectedSuperTag: any
  single_product!: any;
  showTagSelection: boolean = false;


  constructor(
    private productService: ProductService,
    private tagService: TagService,
    private snackBar: MatSnackBar,
    private router: Router,
    public dialogRef: MatDialogRef<UpdateProductsTagComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.single_product = data.product;
    console.log(this.single_product)
  }

  ngOnInit(): void {
    this.loadSuperTags();
    this.loadTags();
  }

  loadSuperTags() {
    this.tagService.getSuperTags().subscribe(superTags => {
      this.superTags = superTags;
    });
  }
  loadTags() {
    this.tagService.getTags().subscribe(tags => {
      this.tags = tags;
    });
  }

  findSuperTagByName(name: string) {
    this.tagService.getSuperTagByName(name).subscribe(
      (res) => {
        this.selectedSuperTag = res
      }
    )
  }

  tagOptions: Tag[] = [];

  updateTagOptions() {
    this.tagOptions = this.selectedSuperTagName
      ? this.tags.filter((tag) => tag.superTag.name === this.selectedSuperTagName)
      : [];
    this.single_product.tag.superTag.name = this.selectedSuperTagName;
    this.single_product.tag.name = ''; // Reset tag name
    this.showTagSelection = true
  }

  // fetch the selected tag
  findTagBySelectedTag(selectedTag: string | undefined, tags: Tag[]): Tag | null {
    if (selectedTag === undefined) {
      return null;
    }
    const foundTag = tags.find(tag => tag.name === selectedTag);
    return foundTag || null;
  }

  selectedtag?: Tag;
  onTagSelectionChange(selectedTag: string): void {
    const foundTag = this.findTagBySelectedTag(selectedTag, this.tags);

    if (foundTag) {
      this.selectedtag = foundTag;
      this.single_product.tag.name = foundTag.name;
    } else {
      console.log('Tag not found for selectedTag:', selectedTag);
    }
  }

  applyChanges() {
    this.productService.updateProduct(this.single_product).subscribe(() => {
      this.snackBar.open('Product\'s Tag Updated successfully', 'Close', {
        duration: 2000,
      });
      window.location.reload();
    }, error => {
      this.snackBar.open('Error Updating Tag', 'Close', {
        duration: 2000, // Duration in milliseconds
      })
    });
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

}
