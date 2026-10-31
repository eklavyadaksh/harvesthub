package com.harvesthub.controller;

import com.harvesthub.model.CropPlan;
import com.harvesthub.service.CropPlanService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/crop-plans")
public class CropPlanController {

    private final CropPlanService cropPlanService;

    public CropPlanController(CropPlanService cropPlanService) {
        this.cropPlanService = cropPlanService;
    }

    @PostMapping
    public CropPlan createCropPlan(@RequestBody CropPlan cropPlan) {
        return cropPlanService.saveCropPlan(cropPlan);
    }

    @GetMapping
    public List<CropPlan> getAllCropPlans() {
        return cropPlanService.getAllCropPlans();
    }

    @GetMapping("/{id}")
    public CropPlan getCropPlanById(@PathVariable Integer id) {
        return cropPlanService.getCropPlanById(id).orElseThrow();
    }

    @PutMapping("/{id}")
    public CropPlan updateCropPlan(
            @PathVariable Integer id,
            @RequestBody CropPlan cropPlan) {

        return cropPlanService.updateCropPlan(id, cropPlan);
    }

    @DeleteMapping("/{id}")
    public void deleteCropPlan(@PathVariable Integer id) {
        cropPlanService.deleteCropPlan(id);
    }

}
