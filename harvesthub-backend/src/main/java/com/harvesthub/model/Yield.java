package com.harvesthub.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import java.math.BigDecimal;

@Entity
@Table(name = "yield")
public class Yield {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer yieldId;

    @ManyToOne
    @JoinColumn(name = "field_id", nullable = false)
    private Field field;

    private String cropName;

    private BigDecimal quantity;

    private String unit;

    private BigDecimal sellingPrice;

    private BigDecimal revenue;

    public Yield() {

    }

    public Yield(Field field, String cropName,
                 BigDecimal quantity, String unit,
                 BigDecimal sellingPrice, BigDecimal revenue) {

        this.field = field;
        this.cropName = cropName;
        this.quantity = quantity;
        this.unit = unit;
        this.sellingPrice = sellingPrice;
        this.revenue = revenue;
    }

    public Integer getYieldId() {
        return yieldId;
    }

    public void setYieldId(Integer yieldId) {
        this.yieldId = yieldId;
    }

    public Field getField() {
        return field;
    }

    public void setField(Field field) {
        this.field = field;
    }

    public String getCropName() {
        return cropName;
    }

    public void setCropName(String cropName) {
        this.cropName = cropName;
    }

    public BigDecimal getQuantity() {
        return quantity;
    }

    public void setQuantity(BigDecimal quantity) {
        this.quantity = quantity;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public BigDecimal getSellingPrice() {
        return sellingPrice;
    }

    public void setSellingPrice(BigDecimal sellingPrice) {
        this.sellingPrice = sellingPrice;
    }

    public BigDecimal getRevenue() {
        return revenue;
    }

    public void setRevenue(BigDecimal revenue) {
        this.revenue = revenue;
    }
}
