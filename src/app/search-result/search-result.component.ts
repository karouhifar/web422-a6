import { Component, OnInit,OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';
@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit
{

  private queryParams
  private searchSub;
  results: Array<any>;
  searchQuery: any;

  constructor(private mService: MusicDataService, private route: ActivatedRoute) { }

  ngOnInit(): void
  {
    this.queryParams = this.route.queryParamMap.subscribe(params =>
    {
      this.searchQuery = this.route.snapshot.queryParams['q'];
      this.searchSub = this.mService.searchArtists(this.searchQuery).subscribe(data => this.results = data.artists.items.filter((items) =>
      {
        return items.images.length > 0;
      }));
    });
  }

  
  
  ngOnDestroy(): void
  {
    this.searchSub.unsubscribe();
    this.queryParams.unsubscribe();
  }
  

}