import { HttpClient } from '@angular/common/http';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

interface CourseItem {
  id: number | string;
  title: string;
  description: string;
  category: string;
  author: string;
  duration: string;
  level: string;
  imageUrl: string;
  rating: number;
  students: number;
}

interface ApiCourse {
  id?: number | string;
  title?: string;
  name?: string;
  description?: string;
  summary?: string;
  category?: string;
  author?: string;
  instructor?: string;
  duration?: string;
  workload?: string;
  level?: string;
  imageUrl?: string;
  thumbnail?: string;
  rating?: number;
  students?: number;
  enrolledStudents?: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  #http = inject(HttpClient);

  protected readonly title = 'Bob Learning Hub';
  protected readonly isLoading = signal(true);
  protected readonly errorMessage = signal('');
  protected readonly selectedCategory = signal('All');
  protected readonly courses = signal<CourseItem[]>([]);
  protected readonly featuredCourse = computed(() => this.courses()[0] ?? null);
  protected readonly categories = computed(() => {
    const dynamicCategories = this.courses().map((course) => course.category);
    return ['All', ...new Set(dynamicCategories)];
  });

  protected readonly filteredCourses = computed(() => {
    const activeCategory = this.selectedCategory();
    const items = this.courses();

    if (activeCategory === 'All') {
      return items;
    }

    return items.filter((course) => course.category === activeCategory);
  });

  constructor() {
    this.loadCourses();
  }

  protected selectCategory(category: string): void {
    this.selectedCategory.set(category);
  }

  protected trackByCourseId(_: number, course: CourseItem): number | string {
    return course.id;
  }

  protected retry(): void {
    this.loadCourses();
  }

  private loadCourses(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.#http
      .get<ApiCourse[]>('https://bff-bob-a-thon-env.eba-kipvpqnj.us-east-1.elasticbeanstalk.com/api/contents')
      .subscribe({
        next: (response) => {
          const courses = response.map((course, index) => this.mapCourse(course, index));
          this.courses.set(courses);
          this.isLoading.set(false);
        },
        error: () => {
          this.errorMessage.set('Não foi possível carregar os cursos agora. Tente novamente em alguns instantes.');
          this.isLoading.set(false);
        }
      });
  }

  private mapCourse(course: ApiCourse, index: number): CourseItem {
    return {
      id: course.id ?? index + 1,
      title: course.title ?? course.name ?? `Curso ${index + 1}`,
      description:
        course.description ??
        course.summary ??
        'Conteúdo imersivo com foco prático, materiais atualizados e trilha guiada para acelerar seu aprendizado.',
      category: course.category ?? this.getCategory(index),
      author: course.author ?? course.instructor ?? this.getAuthor(index),
      duration: course.duration ?? course.workload ?? this.getDuration(index),
      level: course.level ?? this.getLevel(index),
      imageUrl: course.imageUrl ?? course.thumbnail ?? this.getImage(index),
      rating: course.rating ?? this.getRating(index),
      students: course.students ?? course.enrolledStudents ?? this.getStudents(index)
    };
  }

  private getCategory(index: number): string {
    const categories = ['Frontend', 'Backend', 'AI', 'Cloud', 'UX'];
    return categories[index % categories.length];
  }

  private getAuthor(index: number): string {
    const authors = ['Equipe Bob', 'Especialista Angular', 'Mentor Java', 'Arquiteto Cloud', 'Product Designer'];
    return authors[index % authors.length];
  }

  private getDuration(index: number): string {
    const durations = ['4h 30min', '6h 10min', '3h 45min', '8h 00min', '5h 20min'];
    return durations[index % durations.length];
  }

  private getLevel(index: number): string {
    const levels = ['Iniciante', 'Intermediário', 'Avançado'];
    return levels[index % levels.length];
  }

  private getImage(index: number): string {
    const images = [
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80'
    ];
    return images[index % images.length];
  }

  private getRating(index: number): number {
    const ratings = [4.9, 4.8, 4.7, 4.95, 4.85];
    return ratings[index % ratings.length];
  }

  private getStudents(index: number): number {
    const students = [1280, 940, 1570, 720, 1110];
    return students[index % students.length];
  }
}
