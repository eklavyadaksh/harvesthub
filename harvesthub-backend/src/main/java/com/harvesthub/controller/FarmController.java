package com.harvesthub.controller;

import com.harvesthub.model.Farm;
import com.harvesthub.service.FarmService;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;
import java.util.List;

@RestController
@RequestMapping("/api/farms")
public class FarmController {

    private final FarmService farmService;

    public FarmController(FarmService farmService) {
        this.farmService = farmService;
    }

    @GetMapping
    public List<Farm> getAllFarms() {
        return farmService.getAllFarms();
    }

    @GetMapping("/{id}")
    public Optional<Farm> getFarmById(@PathVariable Integer id) {
        return farmService.getFarmById(id);
    }

    @PostMapping
    public Farm createFarm(@RequestBody Farm farm) {
        return farmService.saveFarm(farm);
    }
    @PutMapping("/{id}")
    public Farm updateFarm(@PathVariable Integer id, @RequestBody Farm farm) {
        return farmService.updateFarm(id, farm);
    }

    @DeleteMapping("/{id}")
    public void deleteFarm(@PathVariable Integer id) {
        farmService.deleteFarm(id);
    }
}
