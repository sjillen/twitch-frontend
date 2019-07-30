import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MessagesComponent } from './components/messages/messages.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
class MockRouter {
  public navigate() {}
}

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, MessagesComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [{ provide: Router, useClass: MockRouter }],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Twitch Viewers Tracker'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Twitch Viewers Tracker');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('a').textContent).toContain(
      'Twitch Viewer Tracker'
    );
  });
});
