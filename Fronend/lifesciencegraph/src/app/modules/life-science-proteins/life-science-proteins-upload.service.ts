// file-upload.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LifeScienceProteinFileUploadService {
  private accessionNumbersSubject = new BehaviorSubject<string[]>([]);
  accessionNumbers$ = this.accessionNumbersSubject.asObservable();

  uploadFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      const csvData: string = reader.result as string;
      const lines: string[] = csvData.split('\n');
      const accessionNumbers: string[] = lines.map(line => line.trim());
      this.accessionNumbersSubject.next(accessionNumbers);
    };
    reader.readAsText(file);
  }
}
