import { Injectable } from '@angular/core';
import { Appointment } from '../shared/Appointment';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})

export class AppointmentService {
  bookingListRef: AngularFireList<any>;
  bookingRef: AngularFireObject<any>;
  private dbPath = '/appointment'
  constructor(private db: AngularFireDatabase) {
    this.bookingListRef = db.list(this.dbPath)
  }
  // Create
  createBooking(apt: Appointment) {
    return this.bookingListRef.push(apt);
  }
  // Get Single
  getBooking(id: string) {
    this.bookingRef = this.db.object('/appointment/' + id);
    return this.bookingRef;
  }
  // Get List
  getBookingList() {
    this.bookingListRef = this.db.list('/appointment');
    return this.bookingListRef;
  }
  // Update
  updateBooking(id: any, apt: Appointment) {
    this.bookingRef = this.db.object('/appointment/' + id);
    return this.bookingRef.update({
      id: id,
      name: apt.name,
      email: apt.email,
      mobile: apt.mobile,
    });
  }
  // Delete
  deleteBooking(id: string) {
    this.bookingRef = this.db.object('/appointment/' + id);
    this.bookingRef.remove();
  }
}