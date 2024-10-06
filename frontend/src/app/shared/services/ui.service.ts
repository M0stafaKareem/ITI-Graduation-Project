import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor() { }

  generateRandomColor (counter: number){
    const colors = ['amber','red', 'blue'];
    return colors[counter % colors.length];
  } 


  generateTailwindClass(color: string, type: string): string{
    // Convert the color name to lowercase to ensure case insensitivity
    const colorName = color.toLowerCase();
  
    // Generate the class based on the type
    let tailwindClass;
    switch (type) {
      case 'bg':
        tailwindClass = color == 'amber' ? `amber-bg` : color === 'red' ? 'red-bg': 'blue-bg' ;
        break;
      case 'text':
        tailwindClass = color == 'amber' ? `amber-text` : color === 'red' ? 'red-text': 'blue-text' ;
        break;
      case 'border':
        tailwindClass = color == 'amber' ? `amber-border` : color === 'red' ? 'red-border': 'blue-border' ;
        break;
      default:
        tailwindClass = '';
        console.warn('Invalid type provided. Use "bg", "text", or "border".');
    }
  
    return tailwindClass;
  }



}
