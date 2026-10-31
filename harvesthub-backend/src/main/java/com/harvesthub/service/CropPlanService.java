package com.harvesthub.service;

import com.harvesthub.model.CropPlan;
import com.harvesthub.model.Field;
import com.harvesthub.repository.CropPlanRepository;
import com.harvesthub.repository.FieldRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CropPlanService {

    private final CropPlanRepository cropPlanRepository;
    private final FieldRepository fieldRepository;

    public CropPlanService(CropPlanRepository cropPlanRepository, FieldRepository fieldRepository) {
        this.cropPlanRepository = cropPlanRepository;
        this.fieldRepository = fieldRepository;
    }

    public CropPlan saveCropPlan(CropPlan cropPlan) {
        // Resolve the nested Field to its managed version to prevent duplicate insert
        if (cropPlan.getField() != null && cropPlan.getField().getFieldId() != null) {
            Field managedField = fieldRepository.findById(cropPlan.getField().getFieldId())
                    .orElseThrow(() -> new RuntimeException("Field not found: " + cropPlan.getField().getFieldId()));
            cropPlan.setField(managedField);
        }
        return cropPlanRepository.save(cropPlan);
    }

    public List<CropPlan> getAllCropPlans() {
        return cropPlanRepository.findAll();
    }

    public Optional<CropPlan> getCropPlanById(Integer id) {
        return cropPlanRepository.findById(id);
    }

    public CropPlan updateCropPlan(Integer id, CropPlan cropPlan) {
        CropPlan existingCropPlan = cropPlanRepository.findById(id).orElseThrow();

        // Resolve Field by ID to get the managed entity
        if (cropPlan.getField() != null && cropPlan.getField().getFieldId() != null) {
            Field managedField = fieldRepository.findById(cropPlan.getField().getFieldId())
                    .orElseThrow(() -> new RuntimeException("Field not found: " + cropPlan.getField().getFieldId()));
            existingCropPlan.setField(managedField);
        }

        existingCropPlan.setCropName(cropPlan.getCropName());
        existingCropPlan.setSeason(cropPlan.getSeason());
        existingCropPlan.setSowingDate(cropPlan.getSowingDate());
        existingCropPlan.setHarvestDate(cropPlan.getHarvestDate());

        return cropPlanRepository.save(existingCropPlan);
    }

    public void deleteCropPlan(Integer id) {
        cropPlanRepository.deleteById(id);
    }
}
