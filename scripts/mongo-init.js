// MongoDB initialisation — creates a logical DB per microservice with a
// dedicated user. Run automatically by the official mongo image on first boot.

const databases = [
  'auth_db',
  'user_db',
  'cleaner_db',
  'booking_db',
  'payment_db',
  'notif_db',
  'admin_db',
  'config_db',
  'support_db',
  'chat_db',
  'review_db',
  'promo_db',
  'loyalty_db',
  'analytics_db',
];

const rootUser = process.env.MONGO_INITDB_ROOT_USERNAME || 'cleanup';
const rootPass = process.env.MONGO_INITDB_ROOT_PASSWORD || 'cleanup';
const appUser  = 'cleanup_app';
const appPass  = 'cleanup_app';

const admin = db.getSiblingDB('admin');
admin.auth(rootUser, rootPass);

databases.forEach((name) => {
  const target = db.getSiblingDB(name);
  target.createUser({
    user: appUser,
    pwd:  appPass,
    roles: [{ role: 'readWrite', db: name }],
  });
  print(`Created user for ${name}`);
});
