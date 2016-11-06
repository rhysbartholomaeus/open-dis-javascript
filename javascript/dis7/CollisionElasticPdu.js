/**
 * Information about elastic collisions in a DIS exercise shall be communicated using a Collision-Elastic PDU. Section 7.2.4. COMPLETE
 *
 * Copyright (c) 2008-2015, MOVES Institute, Naval Postgraduate School. All rights reserved.
 * This work is licensed under the BSD open source license, available at https://www.movesinstitute.org/licenses/bsd.html
 *
 * @author DMcG
 */
// On the client side, support for a  namespace.
if (typeof dis7 === "undefined")
 dis7 = {};


// Support for node.js style modules. Ignored if used in a client context.
// See http://howtonode.org/creating-custom-modules
if (typeof exports === "undefined")
 exports = {};


dis7.CollisionElasticPdu = function()
{
   /** The version of the protocol. 5=DIS-1995, 6=DIS-1998, 7=DIS-2009. */
   this.protocolVersion = 7;

   /** Exercise ID */
   this.exerciseID = 0;

   /** Type of pdu, unique for each PDU class */
   this.pduType = 66;

   /** value that refers to the protocol family, eg SimulationManagement, et */
   this.protocolFamily = 1;

   /** Timestamp value */
   this.timestamp = 0;

   /** Length, in bytes, of the PDU */
   this.length = 0;

   /** PDU Status Record. Described in 6.2.67. This field is not present in earlier DIS versions  */
   this.pduStatus = 0;

   /** zero-filled array of padding */
   this.padding = 0;

   /** This field shall identify the entity that is issuing the PDU and shall be represented by an Entity Identifier record (see 6.2.28) */
   this.issuingEntityID = new dis7.EntityID(); 

   /** This field shall identify the entity that has collided with the issuing entity. This field shall be a valid identifier of an entity or server capable of responding to the receipt of this Collision-Elastic PDU. This field shall be represented by an Entity Identifier record (see 6.2.28). */
   this.collidingEntityID = new dis7.EntityID(); 

   /** This field shall contain an identification generated by the issuing simulation application to associate related collision events. This field shall be represented by an Event Identifier record (see 6.2.34). */
   this.collisionEventID = new dis7.EventIdentifier(); 

   /** some padding */
   this.pad = 0;

   /** This field shall contain the velocity at the time the collision is detected at the point the collision is detected. The velocity shall be represented in world coordinates. This field shall be represented by the Linear Velocity Vector record [see 6.2.95 item c)] */
   this.contactVelocity = new dis7.Vector3Float(); 

   /** This field shall contain the mass of the issuing entity and shall be represented by a 32-bit floating point number representing kilograms */
   this.mass = 0;

   /** This field shall specify the location of the collision with respect to the entity with which the issuing entity collided. This field shall be represented by an Entity Coordinate Vector record [see 6.2.95 item a)]. */
   this.locationOfImpact = new dis7.Vector3Float(); 

   /** These six records represent the six independent components of a positive semi-definite matrix formed by pre-multiplying and post-multiplying the tensor of inertia, by the anti-symmetric matrix generated by the moment arm, and shall be represented by 32-bit floating point numbers (see 5.3.4.4) */
   this.collisionIntermediateResultXX = 0;

   /** tensor values */
   this.collisionIntermediateResultXY = 0;

   /** tensor values */
   this.collisionIntermediateResultXZ = 0;

   /** tensor values */
   this.collisionIntermediateResultYY = 0;

   /** tensor values */
   this.collisionIntermediateResultYZ = 0;

   /** tensor values */
   this.collisionIntermediateResultZZ = 0;

   /** This record shall represent the normal vector to the surface at the point of collision detection. The surface normal shall be represented in world coordinates. This field shall be represented by an Entity Coordinate Vector record [see 6.2.95 item a)]. */
   this.unitSurfaceNormal = new dis7.Vector3Float(); 

   /** This field shall represent the degree to which energy is conserved in a collision and shall be represented by a 32-bit floating point number. In addition, it represents a free parameter by which simulation application developers may “tune” their collision interactions. */
   this.coefficientOfRestitution = 0;

  dis7.CollisionElasticPdu.prototype.initFromBinary = function(inputStream)
  {
       this.protocolVersion = inputStream.readUByte();
       this.exerciseID = inputStream.readUByte();
       this.pduType = inputStream.readUByte();
       this.protocolFamily = inputStream.readUByte();
       this.timestamp = inputStream.readUInt();
       this.length = inputStream.readUShort();
       this.pduStatus = inputStream.readUByte();
       this.padding = inputStream.readUByte();
       this.issuingEntityID.initFromBinary(inputStream);
       this.collidingEntityID.initFromBinary(inputStream);
       this.collisionEventID.initFromBinary(inputStream);
       this.pad = inputStream.readShort();
       this.contactVelocity.initFromBinary(inputStream);
       this.mass = inputStream.readFloat32();
       this.locationOfImpact.initFromBinary(inputStream);
       this.collisionIntermediateResultXX = inputStream.readFloat32();
       this.collisionIntermediateResultXY = inputStream.readFloat32();
       this.collisionIntermediateResultXZ = inputStream.readFloat32();
       this.collisionIntermediateResultYY = inputStream.readFloat32();
       this.collisionIntermediateResultYZ = inputStream.readFloat32();
       this.collisionIntermediateResultZZ = inputStream.readFloat32();
       this.unitSurfaceNormal.initFromBinary(inputStream);
       this.coefficientOfRestitution = inputStream.readFloat32();
  };

  dis7.CollisionElasticPdu.prototype.encodeToBinary = function(outputStream)
  {
       outputStream.writeUByte(this.protocolVersion);
       outputStream.writeUByte(this.exerciseID);
       outputStream.writeUByte(this.pduType);
       outputStream.writeUByte(this.protocolFamily);
       outputStream.writeUInt(this.timestamp);
       outputStream.writeUShort(this.length);
       outputStream.writeUByte(this.pduStatus);
       outputStream.writeUByte(this.padding);
       this.issuingEntityID.encodeToBinary(outputStream);
       this.collidingEntityID.encodeToBinary(outputStream);
       this.collisionEventID.encodeToBinary(outputStream);
       outputStream.writeShort(this.pad);
       this.contactVelocity.encodeToBinary(outputStream);
       outputStream.writeFloat32(this.mass);
       this.locationOfImpact.encodeToBinary(outputStream);
       outputStream.writeFloat32(this.collisionIntermediateResultXX);
       outputStream.writeFloat32(this.collisionIntermediateResultXY);
       outputStream.writeFloat32(this.collisionIntermediateResultXZ);
       outputStream.writeFloat32(this.collisionIntermediateResultYY);
       outputStream.writeFloat32(this.collisionIntermediateResultYZ);
       outputStream.writeFloat32(this.collisionIntermediateResultZZ);
       this.unitSurfaceNormal.encodeToBinary(outputStream);
       outputStream.writeFloat32(this.coefficientOfRestitution);
  };
}; // end of class

 // node.js module support
exports.CollisionElasticPdu = dis7.CollisionElasticPdu;

// End of CollisionElasticPdu class
