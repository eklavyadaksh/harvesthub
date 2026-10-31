package com.harvesthub.dto;

public class CropPlanRequest {

    private Integer fieldId;
    private String cropName;
    private String season;
    private String sowingDate;
    private String harvestDate;

    public CropPlanRequest() {}

    public Integer getFieldId() { return fieldId; }
    public void setFieldId(Integer fieldId) { this.fieldId = fieldId; }

    public String getCropName() { return cropName; }
    public void setCropName(String cropName) { this.cropName = cropName; }

    public String getSeason() { return season; }
    public void setSeason(String season) { this.season = season; }

    public String getSowingDate() { return sowingDate; }
    public void setSowingDate(String sowingDate) { this.sowingDate = sowingDate; }

    public String getHarvestDate() { return harvestDate; }
    public void setHarvestDate(String harvestDate) { this.harvestDate = harvestDate; }
}
