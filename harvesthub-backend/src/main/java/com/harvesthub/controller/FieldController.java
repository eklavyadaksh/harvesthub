package com.harvesthub.controller;
import com.harvesthub.model.Field;
import com.harvesthub.service.FieldService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import java.util.List;

@RestController
@RequestMapping("/api/fields")
public class FieldController {
    private final FieldService fieldService;
    public FieldController(FieldService fieldService) {
        this.fieldService = fieldService;
    }
    @PostMapping
    public Field createField(@RequestBody Field field) {
        return fieldService.saveField(field);
    }
    @GetMapping
    public List<Field> getAllFields() {
        return fieldService.getAllFields();
    }
    @GetMapping("/{id}")
    public Field getFieldById(@PathVariable Integer id) {
        return fieldService.getFieldById(id).orElseThrow();
    }
    @PutMapping("/{id}")
    public Field updateField(@PathVariable Integer id, @RequestBody Field field) {
        return fieldService.updateField(id, field);
    }
    @DeleteMapping("/{id}")
    public void deleteField(@PathVariable Integer id) {
        fieldService.deleteField(id);
    }

}
