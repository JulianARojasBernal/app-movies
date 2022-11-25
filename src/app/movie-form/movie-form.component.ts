import { Component, OnInit} from '@angular/core'
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MoviesService } from '../services/movies.service';
import { Movie } from '../interfaces/movie';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent implements OnInit {
  public movieForm: FormGroup;
  public movie: Movie | undefined;
  public isEditing: boolean = false;
  private routParamId: string | number | null = 0;

  constructor(
    private formBuilder: FormBuilder,
    private moviesService: MoviesService, 
    private router: Router,
    private activateRoute: ActivatedRoute,


  ) { 
    this.movieForm = this.formBuilder.group({
      title: [''],
      year: [''],
      cover: [''],
      synopsis: [''],
    });
  }

  ngOnInit(): void {
    this.getMovie();
  }
 
  onSubmit = (form: FormGroup) => {
    console.log(form.value);
    if (form.valid){
      const call = (this.isEditing) 
      ? this.moviesService.UpdateMovie(this.routParamId, form.value)
      : this.moviesService.createMovie(form.value);
      call.then(res =>{
        console.log(res);
        alert('Se agrego la pelicula con exito');
        this.router.navigateByUrl('/movies');
      }).catch(err => {
        alert('Ocurrió un error');
        console.log(err);
      })
    }
  }

  getMovie = () => {
    this.routParamId = this.activateRoute.snapshot!.paramMap.get('id');
    if (this.routParamId) {
      this.routParamId = parseInt(this.routParamId);
      if (this.routParamId === 0) {
        this.isEditing = false;
        return;
      }
      this.isEditing = true;
      this.moviesService.getMovieById(this.routParamId).then(res => {
        this.movieForm.setValue({
          title: res.title,
          year: res.year,
          synopsis: res.synopsis,
          cover: res.cover
        });
        console.log(res);
      }).catch(err => {
        alert('Ocurrio un error');
        console.log(err);
      });
    }
  }

  

}

