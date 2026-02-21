import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { By } from '@angular/platform-browser';
import { provideZonelessChangeDetection } from '@angular/core';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the current year', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain(new Date().getFullYear().toString());
  });

  it('should display the author name', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Connie Leung');
  });

  it('should display the tech stack', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Angular');
    expect(compiled.textContent).toContain('Transformers.js');
  });

  it('should have a github link with correct attributes', () => {
    const link = fixture.debugElement.query(By.css('a[href*="github.com"]'));
    expect(link).toBeTruthy();
    expect(link.attributes['target']).toBe('_blank');
    expect(link.attributes['rel']).toContain('noopener');
    expect(link.nativeElement.textContent).toContain('ng-translate-gemma-demo');
  });
});
