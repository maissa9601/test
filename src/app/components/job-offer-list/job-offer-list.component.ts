import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { JobOfferService } from '../../services/job-offer.service';

@Component({
  selector: 'app-job-offer-list',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './job-offer-list.component.html',
  styleUrls: ['./job-offer-list.component.css']
})
export class JobOfferListComponent implements OnInit {
  offers: any[] = [];

  constructor(private jobOfferService: JobOfferService) {}

  ngOnInit() {
    this.getAllJobOffers();
  }

  getAllJobOffers() {
    this.jobOfferService.getAllOffers().subscribe({
      next: (res) => {
        console.log(res);
        this.offers = res;
      },
      error: (err) => console.error('Erreur lors de la récupération des offres', err)
    });
  }

  deleteJobOffer(id: number) {
    this.jobOfferService.deleteJobOffer(id).subscribe({
      next: (res) => {
        console.log('Offre supprimée', res);

        this.getAllJobOffers();
      },
      error: (err) => console.error('Erreur lors de la suppression des offres', err)
    });
  }
}
