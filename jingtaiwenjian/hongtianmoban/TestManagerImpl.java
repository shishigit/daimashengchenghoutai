package com.hotent.test.manager.impl;

import com.hotent.test.model.Test;
import com.hotent.test.dao.TestDao;
import com.hotent.test.manager.TestManager;
import com.hotent.base.manager.impl.BaseManagerImpl;
import org.springframework.stereotype.Service;

/**
 *  服务实现类
 *
 * @company 汉鑫科技股份有限公司
 * @author 超级管理员
 * @since 2020-08-05
 */
@Service
public class TestManagerImpl extends BaseManagerImpl<TestDao, Test> implements TestManager {

}
