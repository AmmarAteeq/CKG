// file-upload.component.ts
import { Component } from '@angular/core';
import { LifeScienceProteinFileUploadService } from './life-science-proteins-upload.service';

@Component({
  selector: 'app-life-science-protein',
  templateUrl: './life-science-proteins.component.html',
  styleUrls: ['./life-science-proteins.component.scss']
})
export class LifeScienceProteinFileUploadComponent {
  constructor(private fileUploadService: LifeScienceProteinFileUploadService) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.fileUploadService.uploadFile(file);
  }
}
