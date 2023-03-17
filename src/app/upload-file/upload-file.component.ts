import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { FileType } from '../enums/fileType';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css'],
})
export class UploadFileComponent {
  @Input() files: any[] = [];
  selectedFiles: any = [];
  @Input() fileType: FileType;
  @Output() select = new EventEmitter();

  onFileUpload(data: any) {
    this.selectedFiles = Array.from(data.target.files);
    if (this.fileType === FileType.AllImages) {
      for (let item of this.selectedFiles) {
        let reader = new FileReader();
        reader.readAsDataURL(item);
        reader.onload = () => {
          this.files.push(reader.result);
        };
      }
    } else {
      for (let item of this.selectedFiles) {
        this.files.push(item.name);
      }
    }
    this.select.emit(this.selectedFiles);
  }

  onRemove(file: any) {
    let index: any;
    for (let i = 0; i < this.files.length; i++) {
      if (file === this.files[i]) {
        index = i;
        break;
      }
    }
    debugger
    this.files.splice(index,1);
    this.selectedFiles.splice(index,1);
    this.select.emit(this.selectedFiles);
  }
}
