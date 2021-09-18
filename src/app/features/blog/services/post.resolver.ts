import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { forkJoin } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Post } from 'src/app/core/model/post';
import { PostService } from 'src/app/core/services/post.service';

@Injectable({
  providedIn: 'root',
})
export class PostResolver implements Resolve<Post> {
  constructor(private http: HttpClient, private postService: PostService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const postContent$ = this.http.get(
      `assets/blog/${route.params['slug']}.md`,
      {
        responseType: 'text',
      }
    );

    const postMetadata$ = this.postService
      .getPostMetadata$(route.params['slug'])
      .pipe(take(1));

    return forkJoin([postContent$, postMetadata$]).pipe(
      map((result) => ({
        content: result[0],
        metadata: result[1],
      }))
    );
  }
}
