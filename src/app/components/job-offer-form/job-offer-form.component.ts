import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { JobOfferService } from '../../services/job-offer.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-job-offer-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  providers: [JobOfferService],
  templateUrl: './job-offer-form.component.html',
  styleUrls: ['./job-offer-form.component.css']
})
export class JobOfferFormComponent implements OnInit {
  postOfferForm!: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private jobOfferService: JobOfferService, private fb: FormBuilder) {}

  ngOnInit() {
    this.postOfferForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      company: ['', Validators.required],
      location: ['', Validators.required],
      salary: [null, [Validators.required, Validators.min(0)]]
    });
  }

  submitForm() {
    if (this.postOfferForm.valid) {
      this.jobOfferService.createOffer(this.postOfferForm.value).subscribe({
        next: () => {
          this.successMessage = 'Offre créée avec succès !';
          this.errorMessage = '';
          this.postOfferForm.reset();
        },
        error: (err) => {
          this.errorMessage = 'Erreur lors de la création de l\'offre.';
          this.successMessage = '';
          console.error(err);
        }
      });
    } else {
      this.errorMessage = 'Veuillez remplir tous les champs correctement.';
      this.successMessage = '';
    }
  }
}
