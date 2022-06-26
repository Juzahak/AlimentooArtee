import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    customer: {
      type: String,
      required: true,
      maxlength: 60,
    },
    address: {
      type: String,
      required: true,
      maxlength: 200,
    },

  
    producto: {
      type: [],
      default: undefined,  
    },
    quantidade: {
      type: [],
      default: undefined,  
    },

    extra1: {
      type: [],
      default: undefined,
    },
    extra2: {
      type: [],
      default: undefined,
    },
  
    
  
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: Number,
      default: 0,
    },
    troco: {
      type: Number,
      default: 0,
    },
    method: {
      type: Number,
      required:true
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
