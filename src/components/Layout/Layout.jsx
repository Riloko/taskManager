import { Layout, Breadcrumb } from 'antd';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { layout_logo } from './layout.module.scss';
import MenuConfig from './config/menuConfig';

import { renderMenu, createBreadcrupmbs } from './helpers/renderFunctions';

const { Header, Content, Footer, Sider } = Layout;


const LayoutCustom = ({ children }) => {

    const [collapsed, setCollapsed] = useState(false);
    const [breadcrumbs, setBreadcrumbs] = useState([]);
    let history = useHistory();

    useEffect(() => {
      setBreadcrumbs(createBreadcrupmbs(history.location.pathname));
    }, [history]);

    history.listen((location, action) => {
      setBreadcrumbs(createBreadcrupmbs(location.pathname));
    })

    const onCollapse = collapsed => {
        console.log(collapsed);
        setCollapsed(collapsed);
    };

    
    return (
        <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className={layout_logo} />
          {renderMenu(MenuConfig)}
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ padding: '16px 0' }}>
              {breadcrumbs ? breadcrumbs.map(item => item) : null}
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              { children ? children : 'Bill is a cat.' }
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Упорядочиватель задач битрикса и своих дел</Footer>
        </Layout>
      </Layout>
    );
};

export default LayoutCustom;