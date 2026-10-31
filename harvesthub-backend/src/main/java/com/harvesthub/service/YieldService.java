package com.harvesthub.service;

import com.harvesthub.model.Field;
import com.harvesthub.model.Yield;
import com.harvesthub.repository.FieldRepository;
import com.harvesthub.repository.YieldRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class YieldService {

    private final YieldRepository yieldRepository;
    private final FieldRepository fieldRepository;

    public YieldService(YieldRepository yieldRepository, FieldRepository fieldRepository) {
        this.yieldRepository = yieldRepository;
        this.fieldRepository = fieldRepository;
    }

    public Yield saveYield(Yield yield) {
        // Resolve the nested Field to its managed version to prevent duplicate insert
        if (yield.getField() != null && yield.getField().getFieldId() != null) {
            Field managedField = fieldRepository.findById(yield.getField().getFieldId())
                    .orElseThrow(() -> new RuntimeException("Field not found: " + yield.getField().getFieldId()));
            yield.setField(managedField);
        }
        return yieldRepository.save(yield);
    }

    public List<Yield> getAllYields() {
        return yieldRepository.findAll();
    }

    public Optional<Yield> getYieldById(Integer id) {
        return yieldRepository.findById(id);
    }

    public Yield updateYield(Integer id, Yield yield) {
        Yield existingYield = yieldRepository.findById(id).orElseThrow();

        // Resolve Field by ID to get the managed entity
        if (yield.getField() != null && yield.getField().getFieldId() != null) {
            Field managedField = fieldRepository.findById(yield.getField().getFieldId())
                    .orElseThrow(() -> new RuntimeException("Field not found: " + yield.getField().getFieldId()));
            existingYield.setField(managedField);
        }

        existingYield.setCropName(yield.getCropName());
        existingYield.setQuantity(yield.getQuantity());
        existingYield.setUnit(yield.getUnit());
        existingYield.setSellingPrice(yield.getSellingPrice());
        existingYield.setRevenue(yield.getRevenue());

        return yieldRepository.save(existingYield);
    }

    public void deleteYield(Integer id) {
        yieldRepository.deleteById(id);
    }
}