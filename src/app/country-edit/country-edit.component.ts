import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Country } from '../country';
import { environment } from '../../environments/environment.development';


@Component({
  selector: 'app-country-edit',
  imports: [MatFormFieldModule,MatInputModule,ReactiveFormsModule,RouterLink],
  templateUrl: './country-edit.component.html',
  styleUrl: './country-edit.component.scss'
})
export class CountryEditComponent implements OnInit{
  public country: Country | undefined;
  form!: FormGroup;
  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute){
  
    }

    ngOnInit(): void {
      
      this.form = new FormGroup({
        name: new FormControl(``,Validators.required),
        iso2: new FormControl(``,Validators.required),
        iso3: new FormControl(``,Validators.required)
      });
      this.populateData();
    
    }

    populateData() {
    let id = this.activatedRoute.snapshot.paramMap.get("id");
    this.http.get<Country>(`${environment.baseUrl}api/Countries/${id}`).subscribe({
    next:result => {
      this.country = result;
      this.form.patchValue(this.country);
    },
    error:error => console.error(error)
      });
    }
  
    onSubmit() {
      
    }

}
