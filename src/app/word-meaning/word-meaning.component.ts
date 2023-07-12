import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-word-meaning',
  templateUrl: './word-meaning.component.html',
  styleUrls: ['./word-meaning.component.css']
})
export class WordMeaningComponent {
  word!: string;
  meaning!: string;

  constructor(private http: HttpClient) {}

  fetchMeaning(): void {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${this.word}`;

    this.http.get<any[]>(url).subscribe(data => {
      if (Array.isArray(data) && data.length > 0 && data[0].meanings && data[0].meanings.length > 0) {
        this.meaning = data[0].meanings[0].definitions[0].definition;
      } else {
        this.meaning = 'No definition found for the entered word.';
      }
    }, error => {
      console.error(error);
      if (error.status === 404) {
        this.meaning = 'The entered word does not exist. You might have made a mistake.';
      } else {
        this.meaning = 'An error occurred while fetching the meaning.';
      }
    });
  }

}
