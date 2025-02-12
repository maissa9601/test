package com.example.Crud.controller;

import com.example.Crud.entity.JobOffer;
import com.example.Crud.service.JobOfferService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin("*")
public class JobOfferController {

    private final JobOfferService jobOfferService;

    @PostMapping("/offer")
    public JobOffer createJobOffer(@RequestBody JobOffer jobOffer) {
        return jobOfferService.postJobOffer(jobOffer);
    }

    @GetMapping("/offers")
    public List<JobOffer> getAllJobOffer() {
        return jobOfferService.getAllJobOffer();
    }

    @GetMapping("/offers/{id}")
    public ResponseEntity<JobOffer> getJobOfferById(@PathVariable Long id) {
        return jobOfferService.getJobOfferById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/offers/{id}")
    public ResponseEntity<JobOffer> updateJobOffer(@PathVariable Long id, @RequestBody JobOffer jobOffer) {
        Optional<JobOffer> existingJobOfferOpt = jobOfferService.getJobOfferById(id);

        if (existingJobOfferOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        JobOffer existingJobOffer = existingJobOfferOpt.get();
        existingJobOffer.setCompany(jobOffer.getCompany());
        existingJobOffer.setDescription(jobOffer.getDescription());
        existingJobOffer.setTitle(jobOffer.getTitle());
        existingJobOffer.setLocation(jobOffer.getLocation());
        existingJobOffer.setSalary(jobOffer.getSalary());

        JobOffer updatedJobOffer = jobOfferService.updateJobOffer(existingJobOffer);
        return ResponseEntity.ok(updatedJobOffer);
    }

    @DeleteMapping("/offers/{id}")
    public ResponseEntity<JobOffer> deleteJobOffer(@PathVariable Long id) {
        Optional<JobOffer> existingJobOfferOpt = jobOfferService.getJobOfferById(id);
        if (existingJobOfferOpt.isEmpty()) {
            return ResponseEntity.notFound().build();}
        jobOfferService.deleteJobOffer(id);
        return ResponseEntity.ok().build();
        }
    }
