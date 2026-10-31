package com.harvesthub.service;

import com.harvesthub.model.Equipment;
import com.harvesthub.model.Field;
import com.harvesthub.model.FieldOperation;
import com.harvesthub.repository.EquipmentRepository;
import com.harvesthub.repository.FieldOperationRepository;
import com.harvesthub.repository.FieldRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FieldOperationService {

    private final FieldOperationRepository fieldOperationRepository;
    private final FieldRepository fieldRepository;
    private final EquipmentRepository equipmentRepository;

    public FieldOperationService(FieldOperationRepository fieldOperationRepository,
                                 FieldRepository fieldRepository,
                                 EquipmentRepository equipmentRepository) {
        this.fieldOperationRepository = fieldOperationRepository;
        this.fieldRepository = fieldRepository;
        this.equipmentRepository = equipmentRepository;
    }

    public FieldOperation saveFieldOperation(FieldOperation fieldOperation) {
        // Resolve the nested Field to its managed version to prevent duplicate insert
        if (fieldOperation.getField() != null && fieldOperation.getField().getFieldId() != null) {
            Field managedField = fieldRepository.findById(fieldOperation.getField().getFieldId())
                    .orElseThrow(() -> new RuntimeException(
                            "Field not found: " + fieldOperation.getField().getFieldId()));
            fieldOperation.setField(managedField);
        }
        // Equipment is optional/nullable
        if (fieldOperation.getEquipment() != null && fieldOperation.getEquipment().getEquipmentId() != null) {
            Equipment managedEquipment = equipmentRepository
                    .findById(fieldOperation.getEquipment().getEquipmentId())
                    .orElseThrow(() -> new RuntimeException(
                            "Equipment not found: " + fieldOperation.getEquipment().getEquipmentId()));
            fieldOperation.setEquipment(managedEquipment);
        }
        return fieldOperationRepository.save(fieldOperation);
    }

    public List<FieldOperation> getAllFieldOperations() {
        return fieldOperationRepository.findAll();
    }

    public Optional<FieldOperation> getFieldOperationById(Integer id) {
        return fieldOperationRepository.findById(id);
    }

    public FieldOperation updateFieldOperation(Integer id, FieldOperation fieldOperation) {
        FieldOperation existingFieldOperation = fieldOperationRepository.findById(id).orElseThrow();

        // Resolve Field by ID to get the managed entity
        if (fieldOperation.getField() != null && fieldOperation.getField().getFieldId() != null) {
            Field managedField = fieldRepository.findById(fieldOperation.getField().getFieldId())
                    .orElseThrow(() -> new RuntimeException(
                            "Field not found: " + fieldOperation.getField().getFieldId()));
            existingFieldOperation.setField(managedField);
        }

        // Equipment is optional/nullable
        if (fieldOperation.getEquipment() != null && fieldOperation.getEquipment().getEquipmentId() != null) {
            Equipment managedEquipment = equipmentRepository
                    .findById(fieldOperation.getEquipment().getEquipmentId())
                    .orElseThrow(() -> new RuntimeException(
                            "Equipment not found: " + fieldOperation.getEquipment().getEquipmentId()));
            existingFieldOperation.setEquipment(managedEquipment);
        } else {
            existingFieldOperation.setEquipment(null);
        }

        existingFieldOperation.setOperationType(fieldOperation.getOperationType());
        existingFieldOperation.setOperationDate(fieldOperation.getOperationDate());
        existingFieldOperation.setCost(fieldOperation.getCost());
        existingFieldOperation.setDescription(fieldOperation.getDescription());

        return fieldOperationRepository.save(existingFieldOperation);
    }

    public void deleteFieldOperation(Integer id) {
        fieldOperationRepository.deleteById(id);
    }
}