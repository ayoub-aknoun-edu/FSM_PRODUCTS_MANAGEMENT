import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SuperTag } from '../models/SuperTag';
import { Tag } from '../models/Tag';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private apiUrl = 'http://localhost:3000';
  superTags: SuperTag[] = [];
  tags: Tag[] = [];

  constructor(private http: HttpClient) { }

  // SuperTags

  // Get All SuperTags
  getSuperTags(): Observable<SuperTag[]> {
    let url = `http://localhost:8888/PRODUCT-SERVICE/stag/superTags`;
    return this.http.get<SuperTag[]>(url);
  }

  // Get Super Tag by Name
  getSuperTagByName(supertagName: string): Observable<SuperTag> {
    return this.http.get<SuperTag>(`${this.apiUrl}/superTags?name=${supertagName}`)
  }

  // Add SuperTag
  addSuperTag(newSuperTag: SuperTag): Observable<SuperTag> {
    let url = `http://localhost:8888/PRODUCT-SERVICE/product/addSuperTag`;
    return this.http.post<SuperTag>(url, newSuperTag)
  }

  // Delete SuperTag
  deleteSuperTag(superTagName: string): Observable<SuperTag> {
    return this.http.delete<SuperTag>(`${this.apiUrl}/superTags/${superTagName}`)
  }

  // Tags

  // Get All Tags
  getTags(): Observable<Tag[]> {
    //return this.http.get<Tag[]>(`${this.apiUrl}/tags`)
    return this.http.get<Tag[]>('http://localhost:8888/PRODUCT-SERVICE/stag/tags');
  }

  // Get Tag by ID
  getTagById(tagId: number): Observable<Tag> {
    const url = `${this.apiUrl}/tags/${tagId}`;
    return this.http.get<Tag>(url);
  }

  // Get Tag by Name
  getTagByName(tagName: string): Observable<Tag> {
    return this.http.get<Tag>(`${this.apiUrl}/tags?name=${tagName}`)
  }

  // Add Tag
  addTag(newTag: Tag): Observable<Tag> {
    let url = `http://localhost:8888/PRODUCT-SERVICE/product/addTag`;
    return this.http.post<Tag>(url, newTag)
  }

  updateTagTotalQuantity(tagId: number, newQuantity: number): Observable<Tag> {
    const url = `${this.apiUrl}/tags/${tagId}`;
    return this.http.patch<Tag>(url, { total_quantity: newQuantity });
  }


  compareSuperTag(tag1: SuperTag, tag2: SuperTag): boolean {
    return tag1 && tag2 ? tag1.id === tag2.id : tag1 === tag2;
  }

  getSimilarTags(superTag: SuperTag, tags: Tag[]): Tag[] {
    return tags.filter(tag => this.compareSuperTag(tag.superTag, superTag));
  }

  getTagsBySuperTag(superTag: SuperTag): Observable<Tag[]> {
    const name: string = superTag?.name;
    return this.http.get<Tag[]>('http://localhost:8888/PRODUCT-SERVICE/stag/tagsBySuperTag/' + name);
  }




}
