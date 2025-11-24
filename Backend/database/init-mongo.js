// MongoDB Atlas initialization script
db = db.getSiblingDB('safespace');

// Create collections
db.createCollection('users');
db.createCollection('emergencyalerts');
db.createCollection('safetyresources');
db.createCollection('tokens');
db.createCollection('auditlogs');

// Create indexes for better performance
db.users.createIndex({ "email": 1 }, { unique: true });
db.users.createIndex({ "createdAt": -1 });
db.emergencyalerts.createIndex({ "user": 1, "createdAt": -1 });
db.emergencyalerts.createIndex({ "status": 1 });
db.emergencyalerts.createIndex({ "location": "2dsphere" });

// Insert initial safety resources
db.safetyresources.insertMany([
  {
    title: "Emergency Hotlines - Ethiopia",
    category: "hotlines",
    content: {
      police: "991",
      ambulance: "907",
      fire: "939",
      womenHelp: "+251116677889"
    },
    location: "Ethiopia",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Digital Safety Guide",
    category: "guide",
    content: {
      tips: [
        "Use strong, unique passwords",
        "Enable two-factor authentication",
        "Be cautious with location sharing",
        "Regularly update your apps",
        "Use privacy settings on social media"
      ]
    },
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

print("✅ SafeSpace database initialized successfully!");