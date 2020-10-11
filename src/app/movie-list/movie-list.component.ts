import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Movie, MovieDbResult} from "../../models/movie";
import {MovieListService} from "./movie-list.service";

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit, OnChanges {

  @Input() filter: string;

  static_list: Movie[] = [];

  list: Movie[] = [];

  constructor(private movieListService: MovieListService) { }

  ngOnInit(): void {
    this.movieListService.loadMovieList(this.filter)
      .subscribe(
        (result: MovieDbResult) => {
          this.static_list = result.results;
          this.list = result.results;
        }
      );
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.list = this.static_list.filter(
      (m: Movie) => { return m.title.includes(this.filter); }
      );
  }

}
