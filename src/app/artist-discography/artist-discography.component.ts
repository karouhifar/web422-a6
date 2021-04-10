import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';


@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css']
})
  

  
export class ArtistDiscographyComponent implements OnInit
{
  
  albums: Array<any>;
  artist : Array<any>;
  private artistSub;
  private albumsSub;
  
  constructor(private mService: MusicDataService,private route: ActivatedRoute) { }

  ngOnInit(): void
  {
    this.artistSub = this.mService.getArtistById(this.route.snapshot.params['id']).subscribe(dataArtist =>
    {
      return this.artist = dataArtist
    });
    this.albumsSub = this.mService.getAlbumsByArtistId(this.route.snapshot.params['id'])
      .subscribe(dataAlbums => {
        return this.albums = dataAlbums.items.filter((items, index, next) =>
        {
          console.log(dataAlbums.items);
          return index === next.findIndex((t) => (
            t.name === items.name
          ))
         
        });
      });
 
  }

  ngOnDestroy(){
    this.artistSub.unsubscribe();
    this.albumsSub.unsubscribe();
  }

}
