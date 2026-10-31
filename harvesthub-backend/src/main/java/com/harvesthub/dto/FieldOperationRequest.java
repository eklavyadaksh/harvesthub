package com.harvesthub.dto;

import java.math.BigDecimal;

public class FieldOperationRequest {

    private Integer fieldId;
    private Integer equipmentId;   // nullable
    private String operationType;
    private String operationDate;
    private BigDecimal cost;
    private String description;

    public FieldOperationRequest() {}

    public Integer getFieldId() { return fieldId; }
    public void setFieldId(Integer fieldId) { this.fieldId = fieldId; }

    public Integer getEquipmentId() { return equipmentId; }
    public void setEquipmentId(Integer equipmentId) { this.equipmentId = equipmentId; }

    public String getOperationType() { return operationType; }
    public void setOperationType(String operationType) { this.operationType = operationType; }

    public String getOperationDate() { return operationDate; }
    public void setOperationDate(String operationDate) { this.operationDate = operationDate; }

    public BigDecimal getCost() { return cost; }
    public void setCost(BigDecimal cost) { this.cost = cost; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
