package com.hotent.test.controller;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.hotent.base.controller.BaseController;
import com.hotent.test.model.Test;
import com.hotent.test.manager.TestManager;

/**
 *  前端控制器
 *
 * @company 汉鑫科技股份有限公司
 * @author 超级管理员
 * @since 2020-08-05
 */
@RestController
@RequestMapping("/test/v1/")
public class TestController extends BaseController<TestManager, Test> {

}
