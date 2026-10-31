package com.harvesthub.service;

import com.harvesthub.model.Equipment;
import com.harvesthub.repository.EquipmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EquipmentService {

    private final EquipmentRepository equipmentRepository;

    public EquipmentService(EquipmentRepository equipmentRepository) {
        this.equipmentRepository = equipmentRepository;
    }

    public Equipment saveEquipment(Equipment equipment) {
        return equipmentRepository.save(equipment);
    }

    public List<Equipment> getAllEquipment() {
        return equipmentRepository.findAll();
    }

    public Optional<Equipment> getEquipmentById(Integer id) {
        return equipmentRepository.findById(id);
    }

    public Equipment updateEquipment(Integer id, Equipment equipment) {
        Equipment existingEquipment =
                equipmentRepository.findById(id).orElseThrow();

        existingEquipment.setName(equipment.getName());
        existingEquipment.setType(equipment.getType());
        existingEquipment.setPurchaseDate(equipment.getPurchaseDate());
        existingEquipment.setStatus(equipment.getStatus());

        return equipmentRepository.save(existingEquipment);
    }

    public void deleteEquipment(Integer id) {
        equipmentRepository.deleteById(id);
    }

}
