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
    for (let i = 0; i < images.length; i++) {
      formData.append("files", images[i]);
    }
    formData.append('productId', String(productId));
    return this.http.post(`${this.baseUrl}/uplaodFile`, formData);
  }
}
