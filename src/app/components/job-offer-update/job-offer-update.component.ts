import {Component, NgModule, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import { JobOfferService } from '../../services/job-offer.service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-job-offer-update',
  templateUrl: './job-offer-update.component.html',
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  styleUrls: ['./job-offer-update.component.css']
})
export class JobOfferUpdateComponent implements OnInit {
  updateOfferForm!: FormGroup;
  id!: number; // L'ID sera défini dans ngOnInit()
  jobOffer: any; // Stocker l'offre d'emploi récupérée
  isSubmitting = false; // Empêcher soumission multiple

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private service: JobOfferService,
    private fb: FormBuilder // Injection de FormBuilder
  ) {}

  ngOnInit() {
    // Récupérer l'ID depuis l'URL
    const idParam = this.activateRoute.snapshot.paramMap.get('id');
    this.id = idParam ? Number(idParam) : NaN;

    if (isNaN(this.id)) {
      console.error("ID invalide !");
      this.router.navigate(['/job-offers']); // Rediriger si ID invalide
      return;
    }

    // Initialisation du formulaire
    this.updateOfferForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      company: ['', Validators.required],
      location: ['', Validators.required],
      salary: [null, [Validators.required, Validators.min(0)]]
    });

    this.getJobOfferById();
  }

  getJobOfferById() {
    this.service.getJobOfferById(this.id).subscribe(
      (res) => {
        if (!res) {
          console.error("Aucune offre trouvée !");
          return;
        }
        this.jobOffer = res;
        console.log("Offre récupérée :", res);
        this.updateOfferForm.patchValue({res});


        this.updateOfferForm.patchValue({
          title: res.title || '',
          description: res.description || '',
          company: res.company || '',
          location: res.location || '',
          salary: res.salary ?? null
        });
      },
      (error) => {
        console.error("Erreur lors de la récupération de l'offre :", error);
      }
    );
  }

  submitForm() {
    if (this.updateOfferForm.invalid || this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;

    this.service.updateJobOffer(this.id, this.updateOfferForm.value).subscribe(
      (res: any) => {
        console.log("Offre mise à jour :", res);
        alert("Offre mise à jour avec succès !");
        this.router.navigate(['/job-offers']);
      },
      (error: any) => {
        console.error("Erreur lors de la mise à jour :", error);
        alert("Une erreur est survenue lors de la mise à jour de l'offre.");
      }
    ).add(() => {
      this.isSubmitting = false;
    })}
  updateJobOffer() {
    this.service.updateJobOffer(this.id, this.updateOfferForm.value).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.error('Error updating job offer:', err);
      }
    );

  }
  deleteOffer() {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette offre ?')) {
      this.service.deleteJobOffer(this.id).subscribe(
        (res) => {
          console.log('Offre supprimée :', res);
          alert('Offre supprimée avec succès !');
          this.router.navigate(['/job-offers']);
        },
        (error) => {
          console.error('Erreur lors de la suppression de l\'offre :', error);
          alert('Une erreur est survenue lors de la suppression de l\'offre.');
        }
      );
    }
  }




}


