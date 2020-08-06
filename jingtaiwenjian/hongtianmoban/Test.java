package com.hotent.test.model;

import com.baomidou.mybatisplus.annotation.IdType;
import com.hotent.base.entity.BaseModel;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableField;
import java.io.Serializable;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

/**
 * @company 汉鑫科技股份有限公司
 */
@ApiModel(value="Test对象", description="")
public class Test extends BaseModel<Test> {

    private static final long serialVersionUID = 1L;

    @TableId(value = "ID_", type = IdType.ASSIGN_ID)
    private String id;

    @TableField("NAME_")
    private String name;

    @TableField("DES_")
    private String des;

    @TableField("TENANT_ID_")
    private String tenantId;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    public String getDes() {
        return des;
    }

    public void setDes(String des) {
        this.des = des;
    }
    public String getTenantId() {
        return tenantId;
    }

    public void setTenantId(String tenantId) {
        this.tenantId = tenantId;
    }

    @Override
    protected Serializable pkVal() {
        return this.id;
    }

    @Override
    public String toString() {
        return "Test{" +
            "id=" + id +
            ", name=" + name +
            ", des=" + des +
            ", tenantId=" + tenantId +
        "}";
    }
}
