package com.harvesthub.service;

import com.harvesthub.model.Farm;
import com.harvesthub.model.Field;
import com.harvesthub.repository.FarmRepository;
import com.harvesthub.repository.FieldRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FieldService {

    private final FieldRepository fieldRepository;
    private final FarmRepository farmRepository;

    public FieldService(FieldRepository fieldRepository, FarmRepository farmRepository) {
        this.fieldRepository = fieldRepository;
        this.farmRepository = farmRepository;
    }

    public Field saveField(Field field) {
        // Resolve the nested Farm to its managed version to prevent duplicate insert
        if (field.getFarm() != null && field.getFarm().getFarmId() != null) {
            Farm managedFarm = farmRepository.findById(field.getFarm().getFarmId())
                    .orElseThrow(() -> new RuntimeException("Farm not found: " + field.getFarm().getFarmId()));
            field.setFarm(managedFarm);
        }
        return fieldRepository.save(field);
    }

    public List<Field> getAllFields() {
        return fieldRepository.findAll();
    }

    public Optional<Field> getFieldById(Integer id) {
        return fieldRepository.findById(id);
    }

    public Field updateField(Integer id, Field field) {
        Field existingField = fieldRepository.findById(id).orElseThrow();

        // Resolve Farm by ID to get the managed entity
        if (field.getFarm() != null && field.getFarm().getFarmId() != null) {
            Farm managedFarm = farmRepository.findById(field.getFarm().getFarmId())
                    .orElseThrow(() -> new RuntimeException("Farm not found: " + field.getFarm().getFarmId()));
            existingField.setFarm(managedFarm);
        }

        existingField.setName(field.getName());
        existingField.setLocation(field.getLocation());
        existingField.setArea(field.getArea());

        return fieldRepository.save(existingField);
    }

    public void deleteField(Integer id) {
        fieldRepository.deleteById(id);
    }
}
