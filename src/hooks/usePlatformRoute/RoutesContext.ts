import { createContext } from 'react';

import { RouteDefinition } from '../../types';

const RoutesContext = createContext<RouteDefinition[]>([]);

export default RoutesContext;
