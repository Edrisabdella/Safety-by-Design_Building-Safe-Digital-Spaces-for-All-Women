import mongoose from 'mongoose';

const emergencyAlertSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['immediate-danger', 'suspicious-activity', 'check-in', 'safe-arrival'],
    required: true
  },
  severity: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  location: {
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    },
    address: String,
    accuracy: Number
  },
  message: {
    type: String,
    maxlength: 500
  },
  media: [{
    url: String,
    type: {
      type: String,
      enum: ['image', 'video', 'audio']
    },
    publicId: String
  }],
  status: {
    type: String,
    enum: ['active', 'resolved', 'cancelled', 'escalated'],
    default: 'active'
  },
  responders: [{
    contact: {
      name: String,
      phone: String
    },
    notifiedAt: Date,
    respondedAt: Date,
    response: String
  }],
  escalation: {
    toAuthority: {
      type: Boolean,
      default: false
    },
    authorityNotifiedAt: Date,
    caseNumber: String
  },
  resolvedAt: Date,
  resolvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Indexes
emergencyAlertSchema.index({ user: 1, createdAt: -1 });
emergencyAlertSchema.index({ status: 1 });
emergencyAlertSchema.index({ createdAt: -1 });
emergencyAlertSchema.index({ 'location': '2dsphere' });

// Method to mark as resolved
emergencyAlertSchema.methods.markAsResolved = function(resolvedBy) {
  this.status = 'resolved';
  this.resolvedAt = new Date();
  this.resolvedBy = resolvedBy;
  return this.save();
};

// Static method to get active alerts in area
emergencyAlertSchema.statics.findActiveInArea = function(lat, lng, radius) {
  return this.find({
    status: 'active',
    location: {
      $geoWithin: {
        $centerSphere: [[lng, lat], radius / 6378.1] // radius in km
      }
    }
  });
};

const EmergencyAlert = mongoose.model('EmergencyAlert', emergencyAlertSchema);
export default EmergencyAlert;