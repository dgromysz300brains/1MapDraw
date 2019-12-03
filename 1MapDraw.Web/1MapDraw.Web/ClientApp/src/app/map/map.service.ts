import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { MapPath } from "./map.paths.model";

@Injectable({
  providedIn: 'root',
})
export class MapService {

  private baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public getPaths(): Observable<MapPath[]> {
    return this.http
      .get<MapPath[]>(this.baseUrl + 'api/Map/Path');
  }

  public savePath(path: MapPath): Observable<any> {
    return this.http
      .put(this.baseUrl + "api/Map/Path", path);
  }
}
