import { Component,OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenaiService } from '../../services/openai.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormControl, ReactiveFormsModule} from '@angular/forms'

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  providers: [OpenaiService],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent implements OnInit  {

  imagenGenerada: any;
  inputCtrl = new FormControl('', {nonNullable: true});
  image = '';
  http = inject(HttpClient);

  constructor(
    private openaiService: OpenaiService
  ){}

  ngOnInit(): void {
    // this.openaiService.generarImagen().subscribe((data) => {
    //   this.imagenGenerada = data;
    // });
  }

  generateImg(){
    const prompt = this.inputCtrl.value;
    this.http.post('https://api.openai.com/v1/images/generations', {
      "model": "dall-e-3",
      "prompt": prompt,
      "n": 1,
      "size": "1024x1024"
    }, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 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"
      }
    })
    .subscribe((res: any) => {
      //console.log(res);
      this.image = res.data[0].url;
      console.log(this.image);
    })
  }
}
