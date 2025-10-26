"use client";

import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export default function SubscriptionForm(props) {
  const { closeInput, formData, handleChangeInput, handleResetForm } = props;
  const { handleAddSub } = useAuth();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    await handleAddSub(formData);

    handleResetForm();
    closeInput();
  };

  const handleClose = () => {
    handleResetForm();
    closeInput();
  };

  return (
    <section>
      <div className="modal-overlay" onClick={handleClose}></div>

      <div className="modal">
        <h2>Add a New Subscription</h2>

        <form onSubmit={handleFormSubmit}>
          <label>
            <span>Subscription Name</span>
            <input
              value={formData.name}
              onChange={handleChangeInput}
              type="text"
              name="name"
              placeholder="e.g. Netflix, Spotify, AWS Hosting"
              required
            />
          </label>

          <label>
            <span>Category</span>

            <select
              name="category"
              value={formData.category}
              onChange={handleChangeInput}
            >
              {[
                "Entertainment",
                "Music",
                "Software",
                "Web Services",
                "Health & Fitness",
                "Other",
              ].map((cat, catIndex) => {
                return <option key={catIndex}>{cat}</option>;
              })}
            </select>
          </label>

          <label>
            <span>Cost</span>
            <input
              value={formData.cost}
              onChange={handleChangeInput}
              type="number"
              name="cost"
              step="0.01"
              placeholder="e.g. 12.00"
              required
            />
          </label>

          <label>
            <span>Currency</span>
            <select
              name="currency"
              value={formData.currency}
              onChange={handleChangeInput}
            >
              {["USD", "EUR", "TL", "AUD", "NZD", "Other"].map(
                (curr, currIndex) => {
                  return <option key={currIndex}>{curr}</option>;
                }
              )}
            </select>
          </label>

          <label>
            <span>Billing Frequency</span>
            <select
              name="billingFrequency"
              value={formData.billingFrequency}
              onChange={handleChangeInput}
            >
              {["Montly", "Yearly", "Quarterly", "One-Time"].map(
                (bil, bilIndex) => {
                  return <option key={bilIndex}>{bil}</option>;
                }
              )}
            </select>
          </label>

          <label>
            <span>Payment Method</span>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChangeInput}
            >
              {[
                "Credit Card",
                "Debit Card",
                "PayPal",
                "Bank Transfer",
                "Other",
              ].map((pay, payIndex) => {
                return <option key={payIndex}>{pay}</option>;
              })}
            </select>
          </label>

          <label>
            <span>Subscription Start Date</span>
            <input
              value={formData.startDate}
              onChange={handleChangeInput}
              type="date"
              name="startDate"
              required
            />
          </label>

          <label>
            <span>Status</span>
            <select
              name="status"
              value={formData.status}
              onChange={handleChangeInput}
            >
              {["Active", "Paused", "Canceled"].map((status, statusIndex) => {
                return <option key={statusIndex}>{status}</option>;
              })}
            </select>
          </label>

          <label className="fat-column">
            <span>Notes</span>
            <textarea
              value={formData.notes}
              onChange={handleChangeInput}
              name="notes"
              placeholder="e.g. Shared Family, Includes Cloud Storage"
            ></textarea>
          </label>

          <div className="fat-column form-submit-btns">
            <button className="form-button" onClick={handleClose}>
              Cancel
            </button>
            <button className="form-button " type="submit">
              Add Subscription
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
