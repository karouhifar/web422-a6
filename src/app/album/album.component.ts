import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css'],
})
export class AlbumComponent implements OnInit {
  album: any;
  private albumSub;
  private FavouritesSub;
  constructor(
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private mService: MusicDataService
  ) {}

  ngOnInit(): void {
    this.albumSub = this.mService
      .getAlbumById(this.route.snapshot.params['id'])
      .subscribe((dataAlbum) => {
        return (this.album = dataAlbum);
      });
  }

  addToFavourites(trackID) {
    this.mService.addToFavourites(trackID).subscribe(
      (passed) => {
        this.snackBar.open('Adding to Favourites...', 'Done', {
          duration: 1500,
        });
      },
      (err) => {
        this.snackBar.open('ERROR: Unable to add song to Favourites', 'Done', {
          duration: 1500,
        });
      }
    );
  }

  ngOnDestroy() {
    this.albumSub.unsubscribe();
  }
}
