package com.harvesthub.dto;

import java.math.BigDecimal;

public class FieldRequest {

    private Integer farmId;
    private String name;
    private String location;
    private BigDecimal area;

    public FieldRequest() {}

    public Integer getFarmId() { return farmId; }
    public void setFarmId(Integer farmId) { this.farmId = farmId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public BigDecimal getArea() { return area; }
    public void setArea(BigDecimal area) { this.area = area; }
}
