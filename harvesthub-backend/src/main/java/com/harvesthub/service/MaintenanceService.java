package com.harvesthub.service;

import com.harvesthub.model.Equipment;
import com.harvesthub.model.Maintenance;
import com.harvesthub.repository.EquipmentRepository;
import com.harvesthub.repository.MaintenanceRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MaintenanceService {

    private final MaintenanceRepository maintenanceRepository;
    private final EquipmentRepository equipmentRepository;

    public MaintenanceService(MaintenanceRepository maintenanceRepository,
                              EquipmentRepository equipmentRepository) {
        this.maintenanceRepository = maintenanceRepository;
        this.equipmentRepository = equipmentRepository;
    }

    public Maintenance saveMaintenance(Maintenance maintenance) {
        // Resolve the nested Equipment to its managed version to prevent duplicate insert
        if (maintenance.getEquipment() != null && maintenance.getEquipment().getEquipmentId() != null) {
            Equipment managedEquipment = equipmentRepository
                    .findById(maintenance.getEquipment().getEquipmentId())
                    .orElseThrow(() -> new RuntimeException(
                            "Equipment not found: " + maintenance.getEquipment().getEquipmentId()));
            maintenance.setEquipment(managedEquipment);
        }
        return maintenanceRepository.save(maintenance);
    }

    public List<Maintenance> getAllMaintenances() {
        return maintenanceRepository.findAll();
    }

    public Optional<Maintenance> getMaintenanceById(Integer id) {
        return maintenanceRepository.findById(id);
    }

    public Maintenance updateMaintenance(Integer id, Maintenance maintenance) {
        Maintenance existingMaintenance = maintenanceRepository.findById(id).orElseThrow();

        // Resolve Equipment by ID to get the managed entity
        if (maintenance.getEquipment() != null && maintenance.getEquipment().getEquipmentId() != null) {
            Equipment managedEquipment = equipmentRepository
                    .findById(maintenance.getEquipment().getEquipmentId())
                    .orElseThrow(() -> new RuntimeException(
                            "Equipment not found: " + maintenance.getEquipment().getEquipmentId()));
            existingMaintenance.setEquipment(managedEquipment);
        }

        existingMaintenance.setMaintenanceDate(maintenance.getMaintenanceDate());
        existingMaintenance.setNextDate(maintenance.getNextDate());
        existingMaintenance.setCost(maintenance.getCost());
        existingMaintenance.setDescription(maintenance.getDescription());

        return maintenanceRepository.save(existingMaintenance);
    }

    public void deleteMaintenance(Integer id) {
        maintenanceRepository.deleteById(id);
    }
}
