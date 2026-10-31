package com.harvesthub.controller;

import com.harvesthub.model.Yield;
import com.harvesthub.service.YieldService;

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
@RequestMapping("/api/yields")
public class YieldController {

    private final YieldService yieldService;

    public YieldController(YieldService yieldService) {
        this.yieldService = yieldService;
    }

    @PostMapping
    public Yield createYield(@RequestBody Yield yield) {
        return yieldService.saveYield(yield);
    }

    @GetMapping
    public List<Yield> getAllYields() {
        return yieldService.getAllYields();
    }

    @GetMapping("/{id}")
    public Yield getYieldById(@PathVariable Integer id) {
        return yieldService.getYieldById(id).orElseThrow();
    }

    @PutMapping("/{id}")
    public Yield updateYield(
            @PathVariable Integer id,
            @RequestBody Yield yield) {

        return yieldService.updateYield(id, yield);
    }

    @DeleteMapping("/{id}")
    public void deleteYield(@PathVariable Integer id) {
        yieldService.deleteYield(id);
    }

}
