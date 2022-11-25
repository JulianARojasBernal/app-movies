import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../interfaces/movie';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  public movie$: Promise<Movie> | undefined;
  public movies$: Promise<Movie[]> | undefined;
  constructor(
    private moviesService: MoviesService,
    private activatedRouted: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getMovie();
  }

  getMovie = async() =>{
    let routeParamId: string | number | null = this.activatedRouted.snapshot.paramMap.get("id");
    if (routeParamId) {
      routeParamId = parseInt(routeParamId);
      this.movie$ = this.moviesService.getMovieById(routeParamId);
    } 
  }
  deleteMovie = (id: number | undefined ) => {
    if (confirm('¡Estas seguro de eliminar esta película?')) {
      this.moviesService.deleteMovieById(id).then(res => {
        alert('Eliminado');
      }).catch(err => {
        alert('Ocurrió un error');
        console.log(err);
      }). finally(() => this.getMovies() )
    }
  }

  getMovies = () =>{
    this.movies$=this.moviesService.getAllMovies();
    console.log(this.movies$);
  }
}
