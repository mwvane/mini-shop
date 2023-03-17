import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(private http: HttpClient) {}

  baseUrl: string = 'https://localhost:7129/api/File';

  uploadProductImages(productId: number, images: any) {
    debugger;
    let formData = new FormData();
    for (let image of images) {
      formData.append("files", image);
    }
    formData.append('productId', String(productId));
    return this.http.post(`${this.baseUrl}/uploadProductImage`, formData);
  }

  uploadProductDocuments(productId: number, documents:any){
    let formData = new FormData();
    for (let document of documents) {
      formData.append("files", document);
    }
    formData.append('productId', String(productId))
    return this.http.post(`${this.baseUrl}/uploadProductDocument`, formData)
  }
}
