import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class PreviewsService {
  
  getPreview(file: File): Promise<{ name: string, src?: string }> {
    if (!file.type.startsWith('image/')) {
      return Promise.resolve({ name: file.name });
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve({ name: file.name, src: event.target?.result as string });
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  }

  getPreviews(files: File[]): Promise<{ name: string, src?: string }[]> {
    return Promise.all(files.map(file => this.getPreview(file)));
  }

}
