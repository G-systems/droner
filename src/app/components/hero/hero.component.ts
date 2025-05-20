import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {
  currentLang: 'he' | 'en' = 'he';
  toggleLabel: string = 'English';

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    this.setLanguage(this.currentLang);
  }

  toggleLanguage() {
    this.currentLang = this.currentLang === 'he' ? 'en' : 'he';
    this.toggleLabel = this.currentLang === 'he' ? 'English' : 'עברית';
    this.setLanguage(this.currentLang);
  }

  setLanguage(lang: 'he' | 'en') {
    const dir = lang === 'he' ? 'rtl' : 'ltr';
    this.renderer.setAttribute(document.documentElement, 'lang', lang);
    this.renderer.setAttribute(document.documentElement, 'dir', dir);
  }
}