import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { provideRouter } from '@angular/router';
import { Location } from '@angular/common';
import { routes } from './app.routes';
import HomeComponent from './home/home.component';
import { Component } from '@angular/core';

@Component({ template: '' })
class DummyTranslationComponent {}

describe('App Routes', () => {
  let router: Router;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([
          { path: '', redirectTo: 'home', pathMatch: 'full' },
          { path: 'home', component: HomeComponent },
          { path: 'translate-blog', component: DummyTranslationComponent },
          { path: '**', redirectTo: 'home' }
        ])
      ]
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  it('should redirect "/" to "/home"', async () => {
    await router.navigateByUrl('/');
    expect(location.path()).toBe('/home');
  });

  it('should navigate to "/home"', async () => {
    await router.navigateByUrl('/home');
    expect(location.path()).toBe('/home');
  });

  it('should navigate to "/translate-blog"', async () => {
    await router.navigateByUrl('/translate-blog');
    expect(location.path()).toBe('/translate-blog');
  });

  it('should redirect unknown routes to "/home"', async () => {
    await router.navigateByUrl('/unknown-route');
    expect(location.path()).toBe('/home');
  });
});
