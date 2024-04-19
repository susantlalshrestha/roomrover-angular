import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="flex justify-center items-center p-4">
      <form
        class="w-9/12 h-16 backdrop-blur-xl bg-white/30 shadow-md rounded-full flex divide-x text-sm"
        (ngSubmit)="submitForm()"
      >
        <input
          type="text"
          id="search"
          name="search"
          class="flex-1 grow text-center form-input rounded-l-full"
          placeholder="Search"
          [(ngModel)]="searchQuery"
        />
        <input
          type="number"
          id="minPrice"
          name="minPrice"
          class="text-center form-input"
          placeholder="Minimum Price"
          [(ngModel)]="minPrice"
        />
        <input
          type="number"
          id="maxPrice"
          name="maxPrice"
          class="form-input text-center"
          placeholder="Maximum Price"
          [(ngModel)]="maxPrice"
        />
        <button class="flex-1 shrink text-center rounded-r-full" type="submit">
          Filter
        </button>
      </form>
    </div>
  `,
  styles: ``,
})
export class SearchBarComponent {
  @Output() filterChange = new EventEmitter<{
    searchQuery: string;
    minPrice: number;
    maxPrice: number;
  }>();

  searchQuery: string = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;

  submitForm() {
    this.filterChange.emit({
      searchQuery: this.searchQuery,
      minPrice: this.minPrice || 0,
      maxPrice: this.maxPrice || 0,
    });
  }
}
