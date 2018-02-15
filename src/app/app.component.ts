import { Component, HostListener, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from './shared/auth/auth.service';
import { SwUpdate } from '@angular/service-worker';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    movieSearching: any[];
    isConnected = false;
    color = 'primary';

    constructor(
        private authService: AuthService,
        private router: Router,
        private snackbar: MatSnackBar,
        private swUpdate: SwUpdate
    ) { }

    @HostListener('window:scroll', ['$event']) scrollHandler(event) {
        const number = window.scrollY;
        const el = document.getElementById('return-to-top');
        if (number >= 50) {
            el.className = 'show';

        } else {
            el.className = 'hide';
        }
    }

    scrollTop() {
        window.scrollTo(0, 0);
    }

    searchMovie(term: string) {
        if (term === '') {
            this.router.navigate(['/movies/now-playing']);
        } else {
            this.router.navigate(['/search', { term: term }]);
        }
    }

    onSignOut() {
        this.authService.signOut();
        this.snackbar.open('Already Gone ? We Hope to see you again soon', '', { duration: 5000 });
        this.router.navigate(['/movies/now-playing']);
    }

    ngOnInit() {
        if (this.swUpdate.isEnabled) {
            this.swUpdate.available.subscribe(() => {
                if (confirm('New version available. Load New Version?')) {
                    window.location.reload();
                }
            })
        }

        return this.authService.isLoggedIn().subscribe(
            authStatus => {
                console.log('connected:', authStatus);
                authStatus === true ? this.isConnected = true : this.isConnected = false;
            });
    }
}
