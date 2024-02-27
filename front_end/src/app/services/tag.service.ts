import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SuperTag } from '../models/SuperTag';
import { Tag } from '../models/Tag';
import {environment} from "../../environment";

@Injectable({
  providedIn: 'root'
})
export class TagService {
  API_URL =environment.apiUrl;
  superTags: SuperTag[] = [];
  tags: Tag[] = [];

  constructor(private http: HttpClient) { }

  // SuperTags

  // Get All SuperTags
  getSuperTags(): Observable<SuperTag[]> {
    let url = `${this.API_URL}/PRODUCT-SERVICE/stag/superTags`;
    return this.http.get<SuperTag[]>(url);
  }


  // Add SuperTag
  addSuperTag(newSuperTag: SuperTag): Observable<SuperTag> {
    let url = `${this.API_URL}/PRODUCT-SERVICE/product/addSuperTag`;
    return this.http.post<SuperTag>(url, newSuperTag)
  }

  // Get All Tags
  getTags(): Observable<Tag[]> {
    //return this.http.get<Tag[]>(`${this.apiUrl}/tags`)
    let url = `${this.API_URL}/PRODUCT-SERVICE/stag/tags`;
    return this.http.get<Tag[]>(url);
  }


  // Add Tag
  addTag(newTag: Tag): Observable<Tag> {
    let url = `${this.API_URL}/PRODUCT-SERVICE/product/addTag`;
    return this.http.post<Tag>(url, newTag)
  }


  compareSuperTag(tag1: SuperTag, tag2: SuperTag): boolean {
    return tag1 && tag2 ? tag1.id === tag2.id : tag1 === tag2;
  }

  getTagsBySuperTag(superTag: SuperTag): Observable<Tag[]> {
    const name: string = superTag?.name;
    let url = `${this.API_URL}/PRODUCT-SERVICE/stag/tagsBySuperTag/` + name;
    return this.http.get<Tag[]>(url);
  }


}
