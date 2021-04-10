import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css'],
})
export class NewReleasesComponent implements OnInit {
  private releasesSub;
  releases: Array<any>;
  imageData = {
    slide_1:
      'https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&dpr=4&h=400&w=400',
    slide_2:
      'https://images.pexels.com/photos/1876279/pexels-photo-1876279.jpeg?auto=compress&cs=tinysrgb&dpr=4&h=400&w=400',
    slide_3:
      'https://images.pexels.com/photos/89909/pexels-photo-89909.jpeg?auto=compress&cs=tinysrgb&dpr=4&h=400&w=400',
  };
  images = [
    this.imageData.slide_1,
    this.imageData.slide_2,
    this.imageData.slide_3,
  ];
  constructor(private mService: MusicDataService, config: NgbCarouselConfig) {
    config.interval = 4000;
    config.keyboard = true;
    config.pauseOnHover = true;
  }

  ngOnInit(): void {
    this.releasesSub = this.mService.getNewReleases().subscribe((data) => {
      return (this.releases = data.albums.items);
    });
  }

  ngOnDestroy() {
    this.releasesSub.unsubscribe();
  }
}
