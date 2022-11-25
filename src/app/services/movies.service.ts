import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Movie } from '../interfaces/movie';


@Injectable({
  providedIn: 'root'
})
export class MoviesService {
    private url = environment.urlEndPoint;
  constructor(
    private httpClient: HttpClient
  ) { }

  getAllMovies = async(): Promise<Movie[]> => {
    return await this.httpClient.get(`${this.url}movies`).toPromise() as Promise<Movie[]>;

  }

  getMovieById = async(id: Number): Promise<Movie> => {
    return await this.httpClient.get(`${this.url}movies/${id}`).toPromise() as Promise<Movie>;

  }

  deleteMovieById = async(id: number | undefined): Promise<Object> => {
    return await this.httpClient.delete(`${this.url}movies/${id}`).toPromise() as Promise<Object>;

  }

  createMovie = async(movie: Movie): Promise<Object | undefined> => {
    return await this.httpClient.post(`${this.url}movies`, movie).toPromise();

  }

  UpdateMovie = async(id: string | number | null, movie: Movie): Promise<Object | undefined> => {
    return await this.httpClient.put(`${this.url}movies/${id}`, movie).toPromise();

  }
}

