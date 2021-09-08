import { Menu, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';


const createBreadcrupmbs = route => {
    const regex = /\/[a-zA-Z_]*/gm;
    const routePathParts = route.match(regex);

    let currentPath = '';
    let result = [];
    if (routePathParts) {
      for (let i = 0; i < routePathParts.length; i++) {
        currentPath += routePathParts[i];
        result.push(
          <Breadcrumb.Item key={i}>
            {i !== routePathParts.length - 1 ? <Link to={currentPath}>{routePathParts[i].replace('/', '')}</Link> : routePathParts[i].replace('/', '')}
          </Breadcrumb.Item>
        )
      }
    }
    return result;
};

const renderMenu = MenuConfig => {
    return (
        <Menu theme="dark" defaultSelectedKeys={[MenuConfig.find(({ link }) => link === window.location.pathname) ? MenuConfig.find(({ link }) => link === window.location.pathname).key : MenuConfig[0].key]} mode="inline">
            {
                MenuConfig.map(({ Icon, label, link, key }) => {
                    return (
                        <Menu.Item key={key} icon={<Icon />}>
                            <Link to={link}>{label}</Link>
                        </Menu.Item>
                    )
                })
            }
        </Menu>
    )
};




export {
    createBreadcrupmbs,
    renderMenu
}
