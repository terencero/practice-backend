import { list } from '@keystone-next/keystone/schema';
import { text, password, relationship } from '@keystone-next/fields';

export const User = list({
  // access:
  // ui:
  fields: {
    name: text({ isRequired: true }),
    email: text({ isUnique: true, isRequired: true }),
    password: password(),
    // TODO: add roles, carts, and orders
  },
});
