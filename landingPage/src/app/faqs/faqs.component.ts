import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faqs',
  standalone: true,
  imports: [CommonModule],  // Include this if using Angular directives in your HTML
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.css']  // Corrected from styleUrl to styleUrls
})
export class FaqsComponent implements AfterViewInit {

  constructor(private elRef: ElementRef) {}

  ngAfterViewInit(): void {
    const faqItems: NodeListOf<HTMLElement> = this.elRef.nativeElement.querySelectorAll('.faq-item h3, .faq-item .faq-toggle');

    faqItems.forEach((faqItem: HTMLElement) => {
      faqItem.addEventListener('click', () => {
        const parentElement = faqItem.parentElement;
        if (parentElement) {
          parentElement.classList.toggle('faq-active');
        }
      });
    });
  }
}