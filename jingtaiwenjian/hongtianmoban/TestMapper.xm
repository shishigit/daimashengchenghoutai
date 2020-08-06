<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.hotent.test.dao.TestDao">

    <!-- 通用查询映射结果 -->
    <resultMap id="BaseResultMap" type="com.hotent.test.model.Test">
        <id column="ID_" property="id"/>
        <result column="NAME_" property="name"/>
        <result column="DES_" property="des"/>
        <result column="TENANT_ID_" property="tenantId"/>
    </resultMap>

    <!-- 通用查询结果列 -->
    <sql id="Base_Column_List">
        ID_, NAME_, DES_, TENANT_ID_
    </sql>

</mapper>
