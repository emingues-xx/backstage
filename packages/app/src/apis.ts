import {
  ScmIntegrationsApi,
  scmIntegrationsApiRef,
  // ScmAuth,
} from '@backstage/integration-react';
import {
  AnyApiFactory,
  configApiRef,
  createApiFactory,
} from '@backstage/core-plugin-api';
import { fakeIdentityApiFactory } from './auth-bypass';

export const apis: AnyApiFactory[] = [
  createApiFactory({
    api: scmIntegrationsApiRef,
    deps: { configApi: configApiRef },
    factory: ({ configApi }) => ScmIntegrationsApi.fromConfig(configApi),
  }),
  // ScmAuth.createDefaultApiFactory(),
  fakeIdentityApiFactory,
];
