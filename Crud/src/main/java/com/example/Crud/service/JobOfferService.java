package com.example.Crud.service;

import com.example.Crud.entity.JobOffer;
import com.example.Crud.repository.JobOfferRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Observable;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class JobOfferService {

    private final JobOfferRepository jobOfferRepository;

    public JobOffer postJobOffer(JobOffer jobOffer) {
        return jobOfferRepository.save(jobOffer);
    }

    public List<JobOffer> getAllJobOffer() {
        return jobOfferRepository.findAll();
    }
    public Optional<JobOffer> getJobOfferById(Long id) {
        return jobOfferRepository.findById(id);
    }
    public JobOffer updateJobOffer(JobOffer jobOffer) {
        return jobOfferRepository.save(jobOffer);
    }
    public void deleteJobOffer(Long id) {
        jobOfferRepository.deleteById(id);
    }

}
