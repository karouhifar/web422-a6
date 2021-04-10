import { Component, OnInit,OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  favourites: Array<any>;
  id: any;
  private favouritesSub;
  private removeSub;

  constructor(private mService: MusicDataService,private route: ActivatedRoute,private snackBar : MatSnackBar) { }
  removeFromFavourites(id) {
    this.removeSub = this.mService.removeFromFavourites(id).subscribe(dataFavourites => this.favourites = dataFavourites.tracks);
    if (this.removeSub)
    {
      this.snackBar.open("Removing to Favourites...", "Done", { duration: 1500 });
    }
  }
  
  ngOnInit(): void
  {
    this.favouritesSub = this.mService.getFavourites().subscribe(dataFavourites =>
    {
      return this.favourites = dataFavourites.tracks
    });
    
    }


  ngOnDestroy(){
    this.favouritesSub.unsubscribe();
  }

}
