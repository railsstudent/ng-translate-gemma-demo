import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a fixed top position and full width', () => {
    const headerElement: HTMLElement = fixture.nativeElement.querySelector('header');
    expect(headerElement.classList.contains('fixed')).toBeTrue();
    expect(headerElement.classList.contains('top-0')).toBeTrue();
    expect(headerElement.classList.contains('w-full')).toBeTrue();
    expect(headerElement.classList.contains('z-50')).toBeTrue();
  });

  it('should have background and border styling', () => {
    const headerElement: HTMLElement = fixture.nativeElement.querySelector('header');
    expect(headerElement.classList.contains('bg-blue-800')).toBeTrue();
    expect(headerElement.classList.contains('border-b')).toBeTrue();
  });

  it('should display the logo and title linking to the root', () => {
    const brandLink: HTMLAnchorElement = fixture.nativeElement.querySelector('a[routerLink="/"]');
    expect(brandLink).toBeTruthy();

    const logo = brandLink.querySelector('img');
    expect(logo).toBeTruthy();
    expect(logo?.getAttribute('ngsrc')).toBe('favicon.ico');

    const title = brandLink.querySelector('h1');
    expect(title?.textContent).toContain('TranslateGemma');
  });

  it('should display the Translate navigation link', () => {
    const navLink: HTMLAnchorElement = fixture.nativeElement.querySelector('a[routerLink="/translate-blog"]');
    expect(navLink).toBeTruthy();
    expect(navLink.textContent).toContain('Translate');

    const icon = navLink.querySelector('ng-icon[name="bootstrapTranslate"]');
    expect(icon).toBeTruthy();
  });

  it('should toggle the mobile menu state', () => {
    expect(component.isMenuOpen()).toBeFalse();
    component.toggleMenu();
    expect(component.isMenuOpen()).toBeTrue();
    component.toggleMenu();
    expect(component.isMenuOpen()).toBeFalse();
  });

  it('should display the hamburger menu button on mobile', () => {
    const hamburgerBtn = fixture.nativeElement.querySelector('button[aria-label="Toggle Menu"]');
    expect(hamburgerBtn).toBeTruthy();
    expect(hamburgerBtn.classList.contains('md:hidden')).toBeTrue();
  });

  it('should show the mobile menu when isMenuOpen is true', () => {
    component.isMenuOpen.set(true);
    fixture.detectChanges();
    
    const mobileMenu = fixture.nativeElement.querySelector('.mobile-menu');
    expect(mobileMenu).toBeTruthy();
    
    const mobileNavLink = mobileMenu.querySelector('a[routerLink="/translate-blog"]');
    expect(mobileNavLink).toBeTruthy();
  });
});
