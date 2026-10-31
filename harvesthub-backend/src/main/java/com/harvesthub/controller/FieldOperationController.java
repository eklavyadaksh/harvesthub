package com.harvesthub.controller;

import com.harvesthub.model.FieldOperation;
import com.harvesthub.service.FieldOperationService;

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
@RequestMapping("/api/field-operations")
public class FieldOperationController {

    private final FieldOperationService fieldOperationService;

    public FieldOperationController(FieldOperationService fieldOperationService) {
        this.fieldOperationService = fieldOperationService;
    }

    @PostMapping
    public FieldOperation createFieldOperation(@RequestBody FieldOperation fieldOperation) {
        return fieldOperationService.saveFieldOperation(fieldOperation);
    }

    @GetMapping
    public List<FieldOperation> getAllFieldOperations() {
        return fieldOperationService.getAllFieldOperations();
    }

    @GetMapping("/{id}")
    public FieldOperation getFieldOperationById(@PathVariable Integer id) {
        return fieldOperationService.getFieldOperationById(id).orElseThrow();
    }

    @PutMapping("/{id}")
    public FieldOperation updateFieldOperation(
            @PathVariable Integer id,
            @RequestBody FieldOperation fieldOperation) {

        return fieldOperationService.updateFieldOperation(id, fieldOperation);
    }

    @DeleteMapping("/{id}")
    public void deleteFieldOperation(@PathVariable Integer id) {
        fieldOperationService.deleteFieldOperation(id);
    }

}