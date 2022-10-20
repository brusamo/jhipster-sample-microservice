import React from 'react';
import { Translate } from 'react-jhipster';

import MenuItem from 'app/shared/layout/menus/menu-item';

const EntitiesMenu = () => {
  return (
    <>
      {/* prettier-ignore */}
      <MenuItem icon="asterisk" to="/d">
        <Translate contentKey="global.menu.entities.d" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/a">
        <Translate contentKey="global.menu.entities.a" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/c">
        <Translate contentKey="global.menu.entities.c" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/b">
        <Translate contentKey="global.menu.entities.b" />
      </MenuItem>
      {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
    </>
  );
};

export default EntitiesMenu;
