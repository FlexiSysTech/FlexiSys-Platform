const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

const permissions = [
  ['users', 'read', 'users.read', 'View users'],
  ['users', 'create', 'users.create', 'Create users'],
  ['users', 'update', 'users.update', 'Update users'],
  ['users', 'delete', 'users.delete', 'Delete users'],

  ['roles', 'read', 'roles.read', 'View roles'],
  ['roles', 'create', 'roles.create', 'Create roles'],
  ['roles', 'update', 'roles.update', 'Update roles'],
  ['roles', 'delete', 'roles.delete', 'Delete roles'],

  ['permissions', 'read', 'permissions.read', 'View permissions'],
  ['permissions', 'create', 'permissions.create', 'Create permissions'],
  ['permissions', 'update', 'permissions.update', 'Update permissions'],
  ['permissions', 'delete', 'permissions.delete', 'Delete permissions'],

  ['organization', 'read', 'organization.read', 'View organization'],
  ['organization', 'create', 'organization.create', 'Create organization'],
  ['organization', 'update', 'organization.update', 'Update organization'],
  ['organization', 'delete', 'organization.delete', 'Delete organization'],

  ['employees', 'read', 'employees.read', 'View employees'],
  ['employees', 'create', 'employees.create', 'Create employees'],
  ['employees', 'update', 'employees.update', 'Update employees'],
  ['employees', 'delete', 'employees.delete', 'Delete employees'],
];

async function main() {
  for (const [module, action, code, description] of permissions) {
    await prisma.permission.upsert({
      where: { code },
      update: {
        module,
        action,
        description,
      },
      create: {
        module,
        action,
        code,
        description,
      },
    });
  }

  const superAdminRole = await prisma.role.upsert({
    where: { code: 'SUPER_ADMIN' },
    update: {
      name: 'Super Administrator',
      description: 'Full system access',
      isSystem: true,
    },
    create: {
      name: 'Super Administrator',
      code: 'SUPER_ADMIN',
      description: 'Full system access',
      isSystem: true,
    },
  });

  const allPermissions = await prisma.permission.findMany({
    select: {
      id: true,
    },
  });

  await prisma.rolePermission.deleteMany({
    where: {
      roleId: superAdminRole.id,
    },
  });

  await prisma.rolePermission.createMany({
    data: allPermissions.map((permission) => ({
      roleId: superAdminRole.id,
      permissionId: permission.id,
    })),
    skipDuplicates: true,
  });

  const password = await bcrypt.hash('123456', 10);

  const adminUser = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {
      email: 'admin@flexisys.com',
      fullName: 'System Administrator',
      password,
      status: 'ACTIVE',
      passwordChangedAt: new Date(),
    },
    create: {
      username: 'admin',
      email: 'admin@flexisys.com',
      fullName: 'System Administrator',
      password,
      status: 'ACTIVE',
      passwordChangedAt: new Date(),
    },
  });

  await prisma.userRole.upsert({
    where: {
      userId_roleId: {
        userId: adminUser.id,
        roleId: superAdminRole.id,
      },
    },
    update: {},
    create: {
      userId: adminUser.id,
      roleId: superAdminRole.id,
    },
  });

  console.log('Seed completed successfully');
  console.log('Admin username: admin');
  console.log('Admin password: 123456');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
