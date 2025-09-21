import { createApiFactory, createApiRef } from '@backstage/core-plugin-api';
import { IdentityApi, identityApiRef } from '@backstage/plugin-auth-react';

// API de identidade fake que sempre retorna um usuário guest
const fakeIdentityApi: IdentityApi = {
  getBackstageIdentity: async () => ({
    type: 'user',
    userEntityRef: 'user:default/guest',
    ownershipEntityRefs: [],
  }),
  getCredentials: async () => ({ token: 'guest-token' }),
  getProfileInfo: async () => ({
    email: 'guest@example.com',
    displayName: 'Guest User',
  }),
  signOut: async () => {},
};

// Factory para criar a API de identidade fake
export const fakeIdentityApiFactory = createApiFactory({
  api: identityApiRef,
  deps: {},
  factory: () => fakeIdentityApi,
});
