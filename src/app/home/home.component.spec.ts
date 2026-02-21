import { ComponentFixture, TestBed } from '@angular/core/testing';
import HomeComponent from './home.component';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';
import { provideZonelessChangeDetection } from '@angular/core';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        provideRouter([]),
        provideZonelessChangeDetection()
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('On Device Blog Translation with Gemma');
  });

  it('should display the description', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('p')?.textContent).toContain('Run TranslateGemma directly in your browser to translate technical blog posts without sending data to a server. Private, lower latency, zero cost, on-device translation powered by Hugging Face Transformers.js, Angular, and Web Worker.');
  });

  it('should have a navigation link to translate-blog', () => {
    const link = fixture.debugElement.query(By.css('a'));
    expect(link).toBeTruthy();
    expect(link.attributes['routerLink']).toBe('/translate-blog');
  });
});
