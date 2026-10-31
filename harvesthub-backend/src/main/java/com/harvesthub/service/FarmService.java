package com.harvesthub.service;
import com.harvesthub.model.Farm;
import com.harvesthub.repository.FarmRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class FarmService {
    private final FarmRepository farmRepository;
    public FarmService(FarmRepository farmRepository) {
        this.farmRepository = farmRepository;
    }
    public Farm saveFarm(Farm farm) {
        return farmRepository.save(farm);
    }
    public List<Farm> getAllFarms() {
        return farmRepository.findAll();
    }
    public Optional<Farm> getFarmById(Integer id) {
        return farmRepository.findById(id);
    }
    public Farm updateFarm(Integer id, Farm farm) {
        Farm existingFarm = farmRepository.findById(id).orElseThrow();

        existingFarm.setName(farm.getName());
        existingFarm.setLocation(farm.getLocation());
        existingFarm.setArea(farm.getArea());

        return farmRepository.save(existingFarm);
    }
    public void deleteFarm(Integer id) {
        farmRepository.deleteById(id);
    }

}
