import { Component, HostListener, inject, OnInit } from '@angular/core';
import { PostService } from '../../Services/post.service';
import { PostComponent } from '../post/post.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, PostComponent],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css',
})
export class PostListComponent implements OnInit {
  postService = inject(PostService);

  posts: any[] = [];
  loading: boolean = false;
  page: number = 1;
  limit: number = 10;
  errorMessage: string = '';

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts() {
    this.loading = true;
    this.postService.getPosts(this.page, this.limit).subscribe({
      next: (posts) => {
        if (posts && posts.length > 0) {
          this.posts = [...this.posts, ...posts];
          this.page++;
          this.errorMessage = '';
        }
      },
      error: (error) => {
        this.handleError(error);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  private handleError(error: any): void {
    console.log('Error fetching posts', error);
    this.errorMessage =
      'Something went wrong while fetching posts. Please try again later!';
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (
      window.innerHeight + window.scrollY >= document.body.scrollHeight &&
      !this.loading
    ) {
      this.loadPosts();
    }
  }
}
