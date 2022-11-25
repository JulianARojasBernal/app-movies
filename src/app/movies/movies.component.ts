import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Movie } from '../interfaces/movie';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  public movies$: Promise<Movie[]> | undefined;

  constructor(
    private moviesService: MoviesService
    ){}

  ngOnInit(): void {
    this.getMovies();
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
