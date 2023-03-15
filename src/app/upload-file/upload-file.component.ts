import { Component, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css'],
})
export class UploadFileComponent {
  images: any[] = [];
  selectedFiles: any = [];
  @Output() select = new EventEmitter();

  onFileUpload(data: any) {
    this.selectedFiles = data.target.files;
    for (let index = 0; index < this.selectedFiles.length; index++) {
      let reader = new FileReader();
      reader.readAsDataURL(this.selectedFiles[index]);
      reader.onload = () => {
        this.images.push(reader.result);
      };
    }
    this.select.emit(this.selectedFiles);
  }

  onRemove(file: any) {
    this.images = this.images.filter((item) => item != file);
    this.select.emit(this.images);
  }
}
